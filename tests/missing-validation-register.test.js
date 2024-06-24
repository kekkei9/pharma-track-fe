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

  const emailInputSelector =
    "#root > div.SignUpPage.tw-flex.tw-flex-col.tw-items-center > div.LoginFormContainer > div > form > div:nth-child(2) > div > div > div.ant-col.ant-form-item-control > div.ant-form-item-control-input > div > input";
  const passwordInputSelector =
    "#root > div.SignUpPage.tw-flex.tw-flex-col.tw-items-center > div.LoginFormContainer > div > form > div:nth-child(3) > div > div > div.ant-col.ant-form-item-control > div.ant-form-item-control-input > div > span > input";

  const errorSelector =
    "#root > div.SignUpPage.tw-flex.tw-flex-col.tw-items-center > div.LoginFormContainer > div > form > div:nth-child(2) > div > div > div.ant-col.ant-form-item-control > div:nth-child(2) > div > div";

  it("should display missing email error", async () => {
    await page.goto("http://localhost:3000/pharma-track-fe#/signup");
    await page.waitForSelector(emailInputSelector);

    await page.click(emailInputSelector);

    await page.click(passwordInputSelector);

    await page.waitForSelector(errorSelector);
    const pageTitle = await page.$eval(errorSelector, (e) => e.innerHTML);
    expect(pageTitle).toMatch("Email đăng nhập không được bỏ trống");
  }, 100000);
});
