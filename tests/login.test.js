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
  });

  afterAll(async () => {
    await browser.close();
  });

  it("should display the login form", async () => {
    await page.goto("https://kekkei9.github.io/pharma-track-fe/#/login");
    await page.waitForSelector(
      "#root > div.LoginPage.tw-flex.tw-flex-col.tw-items-center > div > div.login-action-container.tw-flex.tw-flex-col.tw-items-center > div.LoginFormContainer > div > form > div.submit-container > div > div > div > div > div > button"
    );
    const pageTitle = await page.$eval(
      "#root > div.LoginPage.tw-flex.tw-flex-col.tw-items-center > div > div.login-action-container.tw-flex.tw-flex-col.tw-items-center > div.LoginFormContainer > div > form > div.submit-container > div > div > div > div > div > button > span",
      (e) => e.innerHTML
    );
    expect(pageTitle).toMatch("Đăng nhập");
  }, 10000);

  it("should allow the user to log in", async () => {
    await page.goto("https://kekkei9.github.io/pharma-track-fe/#/login");
    await page.waitForSelector(
      "#root > div.LoginPage.tw-flex.tw-flex-col.tw-items-center > div > div.login-action-container.tw-flex.tw-flex-col.tw-items-center > div.LoginFormContainer > div > form > div:nth-child(1) > div > div > div.ant-col.ant-form-item-control.css-dev-only-do-not-override-3rel02 > div.ant-form-item-control-input > div > input"
    );
    await page.type(
      "#root > div.LoginPage.tw-flex.tw-flex-col.tw-items-center > div > div.login-action-container.tw-flex.tw-flex-col.tw-items-center > div.LoginFormContainer > div > form > div:nth-child(1) > div > div > div.ant-col.ant-form-item-control.css-dev-only-do-not-override-3rel02 > div.ant-form-item-control-input > div > input",
      "kekkei16102002@gmail.com"
    );
    await page.type(
      "#root > div.LoginPage.tw-flex.tw-flex-col.tw-items-center > div > div.login-action-container.tw-flex.tw-flex-col.tw-items-center > div.LoginFormContainer > div > form > div:nth-child(2) > div > div > div.ant-col.ant-form-item-control.css-dev-only-do-not-override-3rel02 > div.ant-form-item-control-input > div > span > input",
      "kekkei1610"
    );
    await page.click(
      "#root > div.LoginPage.tw-flex.tw-flex-col.tw-items-center > div > div.login-action-container.tw-flex.tw-flex-col.tw-items-center > div.LoginFormContainer > div > form > div.submit-container > div > div > div > div > div > button"
    );
    await page.waitForSelector(
      "#root > div.HomePage.tw-flex.tw-flex-col.tw-items-center > div.HomePageMain.tw-block.tw-mt-7.aos-init.aos-animate > div.tw-flex.tw-items-center.tw-mx-auto.tw-max-w-5xl > div > div.tw-font-bold.tw-text-6xl.tw-text-blue-600"
    );
    const pageTitle = await page.$eval(
      "#root > div.HomePage.tw-flex.tw-flex-col.tw-items-center > div.HomePageMain.tw-block.tw-mt-7.aos-init.aos-animate > div.tw-flex.tw-items-center.tw-mx-auto.tw-max-w-5xl > div > div.tw-font-bold.tw-text-6xl.tw-text-blue-600",
      (e) => e.innerHTML
    );
    expect(pageTitle).toMatch("Pharma Track");
  }, 30000);
});
