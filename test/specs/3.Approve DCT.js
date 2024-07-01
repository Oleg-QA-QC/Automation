import SignInPage from "../pageobjects/signInPage";
import UserMenu from "../pageobjects/userMenu";
import Dashboard from "../pageobjects/dashboard";
import DCT from "../pageobjects/dct";
import Products from "../pageobjects/products";

let checklistName = "Checklist" + Math.floor(Math.random() * 1000);

describe("The User is able to approve requirements of a checklist through electronic signature (optional)", () => {
  beforeEach(async () => {
    await browser.pause(3000);
  });
  before(async () => {
    await browser.reloadSession();
    await browser.maximizeWindow();
    await SignInPage.open();
    await SignInPage.login();
    await browser.pause(2000);
    await UserMenu.userMenuBar("Profile");
    await UserMenu.systemSettingsTab.waitForClickable({ timeout: 10000 });
    await UserMenu.systemSettingsTab.click();
    await browser.pause(1000);
    await UserMenu.swithchOnESignatureOptional();
    await Dashboard.logo.click();
    await Dashboard.clickOnTheFeature("Products");
    await Products.mainProductBtns("Add Product");
    await browser.pause(1000);
    await Products.addProduct("Thermometer");
    await browser.refresh();
    await Products.addSKU("Thermometer", "SKU for Thermometer", "Brazil");
    await browser.pause(1000);
    await Dashboard.clickOnTheFeature("DCT");
    await browser.pause(1000);
    await DCT.mainDCTBtns("Create Checklist");
    await DCT.createChecklistForSubmission(
      "Thermometer",
      "SKU for Thermometer",
      "Brazil",
      checklistName
    );
    await Dashboard.logo.click();
  });
  after(async () => {
    await browser.back();
    await browser.refresh();
    await DCT.removeSearchedChecklist(checklistName);
    await Dashboard.clickOnTheFeature("Products");
    await Products.deleteProduct("Thermometer");
    await browser.closeWindow();
  });
  it("From the navigation bar select the “DCT” module", async () => {
    await Dashboard.clickOnTheFeature("DCT");
  });
  it("Open an existing checklist from the preconditions/select “Approve”", async () => {
    await DCT.openSearchedChecklist(checklistName);
    await browser.pause(1000);

    await browser.saveScreenshot("./Screenshots/TC03/01.png");

    await DCT.approveRequirementMark.waitForClickable({timeout: 10000});
    await DCT.approveRequirementMark.click();
  });
  it("Sign requirment without e-Signature/The requirement should be approved", async () => {
    await DCT.approveWithoutSignature();
  });
  it("The tracking should be in the approved status", async () => {
    const status = $(
      "//tbody[@class='ant-table-tbody']/tr[1]//span[@class='statusText___HTsKM']"
    );
    await expect(status).toHaveText("Approved");

    await browser.pause(1000);
    await browser.saveScreenshot("./Screenshots/TC03/02.png");
  });
});