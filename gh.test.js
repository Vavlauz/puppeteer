let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual("GitHub: Where the world builds software · GitHub");
  }, 1000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 7000);

  test("The page contains Sign in button", async () => {
    await page.goto("https://github.com/team");
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Sign up for free");
  }, 30000);
});

test("The page title Yandex", async () => {
  await page.goto("https://yandex.ru/");
  const main = await page.title();
  expect(main).toEqual("Яндекс");
}, 5000);

test("The page title Gismeteo", async () => {
  await page.goto("https://gismeteo.ru/");
  const main2 = await page.title();
  expect(main2).toEqual(
    "GISMETEO: Погода в России, прогноз погоды на сегодня, завтра, 3 дня, выходные, неделю, 10 дней, месяц."
  );
}, 5000);

test("The page title Netology/blog", async () => {
  await page.goto("https://netology.ru/blog/");
  const main3 = await page.title();
  expect(main3).toEqual("Медиа Нетологии: об образовании в диджитале");
}, 30000);

test("The page title Netology/new-courses", async () => {
  await page.goto("https://netology.ru/new-courses");
  const button =
    ".src-shared-components-core-Heading--heading--Ma_qv.src-shared-components-ProgramCard--title--LHXHo";
  await page.waitForSelector(button, {
    visible: true,
  });
  const actual = await page.$eval(button, (link) => link.textContent);
  expect(actual).toContain("Нутрициолог");
}, 30000);
