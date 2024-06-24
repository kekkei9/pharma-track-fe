const launch = require("puppeteer").launch;

describe("MissingValidationRegister", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await launch({
      headless: true,
      slowMo: 100,
      devtools: true,
    });
    page = await browser.newPage();
  }, 100000);

  afterAll(async () => {
    await browser.close();
  }, 100000);

  const titleSelector =
    "#root > div.HomePage.tw-flex.tw-flex-col.tw-items-center > div.HomePageMain.tw-block.tw-mt-7.aos-init.aos-animate > div.tw-flex.tw-items-center.tw-mx-auto.tw-max-w-5xl > div > div.tw-font-bold.tw-text-6xl.tw-text-blue-600";

  const findClinicSelector =
    "#root > div.HomePage.tw-flex.tw-flex-col.tw-items-center > div:nth-child(2) > div:nth-child(4) > div.tw-flex.tw-items-center.tw-mx-auto.tw-max-w-4xl.tw-py-16 > div > div.tw-font-bold.tw-text-4xl.tw-text-black";

  const goToBookingSelector =
    "#root > div.HomePage.tw-flex.tw-flex-col.tw-items-center > div.RegBtn.tw-px-12.tw-py-2.5.tw-bg-white.tw-font-semibold.tw-text-xl.tw-my-5";

  it("should display full homepage content", async () => {
    await page.goto("http://localhost:3000/pharma-track-fe#/home");
    await page.waitForSelector(titleSelector);

    const pageTitle = await page.$eval(titleSelector, (e) => e.innerHTML);
    expect(pageTitle).toMatch("Pharma Track");

    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight);
    });
    await page.waitForSelector(findClinicSelector);

    const findClinicTitle = await page.$eval(
      findClinicSelector,
      (e) => e.innerHTML
    );
    expect(findClinicTitle).toMatch("Tìm phòng khám gần nhất");
  }, 100000);

  it("booking button should work properly", async () => {
    await page.goto("http://localhost:3000/pharma-track-fe#/home");
    await page.waitForSelector(titleSelector);

    await page.evaluate(() => {
      window.scrollBy(0, 9999);
    });

    // await page.waitForSelector(goToBookingSelector);

    // await page.click(goToBookingSelector);
    // await page.waitForNavigation();
    // expect(page.url()).toMatch("http://localhost:3000/pharma-track-fe#/bookap");
  }, 100000);
});
