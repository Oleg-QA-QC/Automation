import SignInPage from "../pageobjects/signInPage";

describe("The user should receive the error message if he login with wrong credentials", () => {
  before(async () => {
    await browser.reloadSession();
    await browser.maximizeWindow();
    await SignInPage.open();
  });
  after(async () => {
    await browser.closeWindow();
  });
  it("The user should receive error message", async () => {
    await SignInPage.notLogin();
    await expect(SignInPage.error).toHaveText("Incorrect email or password");

    await browser.pause(1000);
    await browser.saveScreenshot("./Screenshots/TC02/01.png");
  });
});