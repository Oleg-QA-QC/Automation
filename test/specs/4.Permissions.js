import SignInPage from "../pageobjects/signInPage";
import UserMenu from "../pageobjects/userMenu";
import Permission from "../pageobjects/permission";
import Dashboard from "../pageobjects/dashboard";

describe("The user can set permission for other accounts regarding access to the Audit Trail functionality", async () => {
  beforeEach(async () => {
    await browser.pause(3000);
  });
  before(async () => {
    await browser.reloadSession();
    await browser.maximizeWindow();
    await SignInPage.open();
    await SignInPage.login();
  });
  after(async () => {
    await UserMenu.userMenuBar("Logout");
    await SignInPage.loginBtn.waitForClickable({ timeout: 30000 });
    await SignInPage.login();
    await UserMenu.userMenuBar("My Team");
    await Permission.getNeededUser("Test User");
    await Permission.listOfSubPermissions(
      "Products",
      "Can Access Feature Logs"
    );
    await Permission.listOfSubPermissions(
      "Applications",
      "Can Access Feature Logs"
    );
    await Permission.listOfSubPermissions(
      "Product Tracking",
      "Can Access Feature Logs"
    );
    await Permission.listOfSubPermissions(
      "Distributor Collaboration Tool",
      "Can Access Feature Logs"
    );
    await Permission.listOfSubPermissions(
      "Change Control Projects",
      "Can Access Feature Logs"
    );
    await Permission.listOfPermissions("Products");
    await Permission.listOfPermissions("Applications");
    await Permission.listOfPermissions("Product Tracking");
    await Permission.listOfPermissions("Distributor Collaboration Tool");
    await Permission.listOfPermissions("Change Control Projects");
    await browser.pause(1000);
    await Permission.updateBtn.click();
    await browser.pause(1000);
    await browser.closeWindow();
  });
  it("Select 'My Team' which is located under the User Name at the top right corner", async () => {
    await UserMenu.userMenuBar("My Team");
  });
  it("On an existing account select “Edit”", async () => {
    await Permission.getNeededUser("Test User");
  });
  it("Click on the toggle btn opposite “Products, Applications, Product Tracking, DCT, CCP, Standards”. Should be in “on” position / Click on the toggle btn opposite “Can access Feature Logs”. Should be in “on” position", async () => {
    await Permission.listOfPermissionsAndSubPermissions(
      "Products",
      "Can Access Feature Logs"
    );
    await Permission.listOfPermissionsAndSubPermissions(
      "Applications",
      "Can Access Feature Logs"
    );
    await Permission.listOfPermissionsAndSubPermissions(
      "Product Tracking",
      "Can Access Feature Logs"
    );
    await Permission.listOfPermissionsAndSubPermissions(
      "Distributor Collaboration Tool",
      "Can Access Feature Logs"
    );
    await Permission.listOfPermissionsAndSubPermissions(
      "Change Control Projects",
      "Can Access Feature Logs"
    );
    await browser.pause(1000);
    await Permission.updateBtn.click()
  });
  it("Log out from the main account and log in with the sub-account from the steps above", async () => {
    await UserMenu.userMenuBar("Logout");
    await SignInPage.loginBtn.waitForClickable({ timeout: 10000 });
    await SignInPage.login2();
    await expect(UserMenu.userBar).toHaveText("Test User");
  });
  it("Click on the “Products” feature from the main bar", async () => {
    await Dashboard.clickOnTheFeature("Products");
    await browser.pause(1000);
    const productExportLogs = await $("//span[contains(text(),'Export Logs')]/..");
    await expect(productExportLogs).toBeClickable();
  });
  it("Click on the “Applications” feature from the main bar", async () => {
    await Dashboard.clickOnTheFeature("Applications");
    await browser.pause(1000);
    const applicationExportLogs = await $(
      "//span[contains(text(),'Export Logs')]/.."
    );
    await expect(applicationExportLogs).toBeClickable();
  });
  it("Click on the “Tracking” feature from the main bar", async () => {
    await Dashboard.clickOnTheFeature("Tracking");
    await browser.pause(1000);
    const trackingExportLogs = await $("//span[contains(text(),'Export Logs')]/..");
    await expect(trackingExportLogs).toBeClickable();
  });
  it("Click on the “DCT” feature from the main bar", async () => {
    await Dashboard.clickOnTheFeature("DCT");
    await browser.pause(1000);
    const dctExportLogs = await $("//span[contains(text(),'Export Logs')]/..");
    await expect(dctExportLogs).toBeClickable();
  });
  it("Click on the “CCP” feature from the main bar", async () => {
    await Dashboard.clickOnTheFeature("CCP");
    await browser.pause(1000);
    const ccpExportLogs = await $("//span[contains(text(),'Export Logs')]/..");
    await expect(ccpExportLogs).toBeClickable();
  });
});
