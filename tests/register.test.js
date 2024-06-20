// __tests__/login.test.js

const launch = require("puppeteer").launch;

describe("Login", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await launch({
      headless: true,
      slowMo: 100,
      devtools: true,
    });
    page = await browser.newPage();
  }, 10000);

  afterAll(async () => {
    await browser.close();
  });

  const continueButtonSpanSelector =
    "#root > div.SignUpPage.tw-flex.tw-flex-col.tw-items-center > div.LoginFormContainer > div > form > div.submit-container > div > div > div > div > div > button > span";

  it("should display the register form", async () => {
    await page.goto("http://localhost:3000/pharma-track-fe#/signup");
    await page.waitForSelector(continueButtonSpanSelector);
    const pageTitle = await page.$eval(
      continueButtonSpanSelector,
      (e) => e.innerHTML
    );
    expect(pageTitle).toMatch("Tiếp tục");
  }, 30000);

  const usernameInputSelector =
    "#root > div.SignUpPage.tw-flex.tw-flex-col.tw-items-center > div.LoginFormContainer > div > form > div:nth-child(1) > div > div > div.ant-col.ant-form-item-control > div.ant-form-item-control-input > div > input";

  const accountTitleSelector =
    "#root > div.RolePage.tw-flex.tw-flex-col.tw-items-center > div:nth-child(1) > div.RoleHeader > div.header2";

  it("should allow the user to log in", async () => {
    await page.goto("http://localhost:3000/pharma-track-fe#/signup");
    await page.waitForSelector(usernameInputSelector);
    await page.type(usernameInputSelector, "test");

    await page.type(
      "#root > div.SignUpPage.tw-flex.tw-flex-col.tw-items-center > div.LoginFormContainer > div > form > div:nth-child(2) > div > div > div.ant-col.ant-form-item-control > div.ant-form-item-control-input > div > input",
      "test@gmail.com"
    );

    await page.type(
      "#root > div.SignUpPage.tw-flex.tw-flex-col.tw-items-center > div.LoginFormContainer > div > form > div:nth-child(3) > div > div > div.ant-col.ant-form-item-control > div.ant-form-item-control-input > div > span > input",
      "test1234"
    );
    await page.type(
      "#root > div.SignUpPage.tw-flex.tw-flex-col.tw-items-center > div.LoginFormContainer > div > form > div:nth-child(4) > div > div > div.ant-col.ant-form-item-control > div.ant-form-item-control-input > div > span > input",
      "test1234"
    );

    await page.click(
      "#root > div.SignUpPage.tw-flex.tw-flex-col.tw-items-center > div.LoginFormContainer > div > form > div.submit-container > div > div > div > div > div > button"
    );
    await page.waitForSelector(accountTitleSelector);
    const pageTitle = await page.$eval(
      accountTitleSelector,
      (e) => e.innerHTML
    );
    expect(pageTitle).toMatch(" TÀI KHOẢN");
  }, 40000);
});
