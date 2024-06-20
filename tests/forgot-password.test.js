const launch = require("puppeteer").launch;

describe("ForgotPassword", () => {
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

  let forgotPasswordNavigateSelector =
    "#root > div.LoginPage.tw-flex.tw-flex-col.tw-items-center > div > div.login-action-container.tw-flex.tw-flex-col.tw-items-center > div.LoginFormContainer > div > form > div.tw-text-red-500.tw-mt-3.tw-ml-3.tw-self-start.forgot-password";

  let emailInputSelector =
    "#root > div.LoginPage.tw-flex.tw-flex-col.tw-items-center > div > form > div.field-container > div > div > div.ant-col.ant-form-item-control > div.ant-form-item-control-input > div > input";

  it("should display forgot password button", async () => {
    await page.goto("http://localhost:3000/pharma-track-fe#/login");
    await page.waitForSelector(forgotPasswordNavigateSelector);
    const pageTitle = await page.$eval(
      forgotPasswordNavigateSelector,
      (e) => e.innerHTML
    );
    expect(pageTitle).toMatch("Quên mật khẩu");
  }, 30000);

  it("should allow the user to log in", async () => {
    await page.goto("http://localhost:3000/pharma-track-fe#/login");
    await page.waitForSelector(forgotPasswordNavigateSelector);
    await page.click(forgotPasswordNavigateSelector);

    await page.type(emailInputSelector, "test@gmail.com");

    await page.click(
      "#root > div.LoginPage.tw-flex.tw-flex-col.tw-items-center > div > form > div.submit-container > div > div > div > div > div > button"
    );
  }, 60000);
});
