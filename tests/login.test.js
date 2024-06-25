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
  }, 100000);

  afterAll(async () => {
    await browser.close();
  }, 100000);

  const testAccounts = [
    {
      email: "test@gmail.com",
      password: "test1234",
    },
    {
      email: "test2@gmail.com",
      password: "test1234",
    },
    {
      email: "test3@gmail.com",
      password: "test1234",
    },
    {
      email: "test4@gmail.com",
      password: "test1234",
    },
    {
      email: "test5@gmail.com",
      password: "test1234",
    },
  ];

  it("should display the login form", async () => {
    await page.goto("http://localhost:3000/pharma-track-fe#/login");
    await page.waitForSelector(
      "#root > div.LoginPage.tw-flex.tw-flex-col.tw-items-center > div > div.login-action-container.tw-flex.tw-flex-col.tw-items-center > div.LoginFormContainer > div > form > div.submit-container > div > div > div > div > div > button"
    );
    const pageTitle = await page.$eval(
      "#root > div.LoginPage.tw-flex.tw-flex-col.tw-items-center > div > div.login-action-container.tw-flex.tw-flex-col.tw-items-center > div.LoginFormContainer > div > form > div.submit-container > div > div > div > div > div > button > span",
      (e) => e.innerHTML
    );
    expect(pageTitle).toMatch("Đăng nhập");
  }, 30000);

  testAccounts.forEach(({ email, password }, index) => {
    it(`should allow the user to log in ${index}`, async () => {
      await page.goto("http://localhost:3000/pharma-track-fe#/login");
      await page.waitForSelector(
        "#root > div.LoginPage.tw-flex.tw-flex-col.tw-items-center > div > div.login-action-container.tw-flex.tw-flex-col.tw-items-center > div.LoginFormContainer > div > form > div:nth-child(1) > div > div > div.ant-col.ant-form-item-control > div.ant-form-item-control-input > div > input"
      );
      await page.type(
        "#root > div.LoginPage.tw-flex.tw-flex-col.tw-items-center > div > div.login-action-container.tw-flex.tw-flex-col.tw-items-center > div.LoginFormContainer > div > form > div:nth-child(1) > div > div > div.ant-col.ant-form-item-control > div.ant-form-item-control-input > div > input",
        email
      );
      await page.type(
        "#root > div.LoginPage.tw-flex.tw-flex-col.tw-items-center > div > div.login-action-container.tw-flex.tw-flex-col.tw-items-center > div.LoginFormContainer > div > form > div:nth-child(2) > div > div > div.ant-col.ant-form-item-control > div.ant-form-item-control-input > div > span > input",
        password
      );
      await page.click(
        "#root > div.LoginPage.tw-flex.tw-flex-col.tw-items-center > div > div.login-action-container.tw-flex.tw-flex-col.tw-items-center > div.LoginFormContainer > div > form > div.submit-container > div > div > div > div > div > button"
      );
      // await page.waitForSelector(
      //   "#root > div.HomePage.tw-flex.tw-flex-col.tw-items-center > div.HomePageMain.tw-block.tw-mt-7.aos-init.aos-animate > div.tw-flex.tw-items-center.tw-mx-auto.tw-max-w-5xl > div > div.tw-font-bold.tw-text-6xl.tw-text-blue-600"
      // );
      // const pageTitle = await page.$eval(
      //   "#root > div.HomePage.tw-flex.tw-flex-col.tw-items-center > div.HomePageMain.tw-block.tw-mt-7.aos-init.aos-animate > div.tw-flex.tw-items-center.tw-mx-auto.tw-max-w-5xl > div > div.tw-font-bold.tw-text-6xl.tw-text-blue-600",
      //   (e) => e.innerHTML
      // );
      // expect(pageTitle).toMatch("Pharma Track");
    }, 60000);
  });
});
