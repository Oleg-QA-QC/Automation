import SignInPage from "../pageobjects/signInPage";

describe("The user is able to log in into his account with correct credntials", () => {
  before(async () => {
    await browser.reloadSession();
    await browser.maximizeWindow();
    await SignInPage.open();
  });
  after(async () => {
    await browser.closeWindow();
  });
  it("The user is able to log in into his account with correct credentials", async () => {
    await SignInPage.login();
    await expect(browser).toHaveUrl("https://trial.regdesk.co/dashboard");
    
    await browser.pause(1000);
    await browser.saveScreenshot("./Screenshots/TC01/01.png");
  });
});
