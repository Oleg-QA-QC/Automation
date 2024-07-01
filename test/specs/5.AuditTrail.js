import SignInPage from "../pageobjects/signInPage";
import Dashboard from "../pageobjects/dashboard";
import Documents from "../pageobjects/documents";
import Products from "../pageobjects/products";

Date.prototype.toShortFormat = function () {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = this.getDate().toString().padStart(2,'0');
  const monthIndex = this.getMonth();
  const monthName = monthNames[monthIndex];
  const year = this.getFullYear();
  return `${day} ${monthName} ${year}`;
};
const date = new Date().toShortFormat().toUpperCase();

describe("System will provide audit trail for Documents", () => {
  beforeEach(async () => {
    await browser.pause(3000);
  });
  before(async () => {
    await browser.reloadSession();
    await browser.maximizeWindow();
    await SignInPage.open();
    await SignInPage.login();
    await Dashboard.clickOnTheFeature("Products");
    await Products.mainProductBtns("Add Product");
    await Products.addProduct("Thermometer");
    await browser.refresh();
    await Products.addSKU("Thermometer", "SKU for Thermometer", "Brazil");
  });
  after(async () => {
    await Dashboard.logo.click();
    await Dashboard.clickOnTheFeature("Documents");
    await browser.refresh();
    await Documents.archiveDocument("Tag 5");
    await Dashboard.logo.click();
    await Dashboard.clickOnTheFeature("Products");
    await Products.deleteProduct("Thermometer");
    await browser.pause(1000);
    await browser.closeWindow();
  });
  it("Click on the 'Documents' feature from the main bar", async () => {
    await Dashboard.clickOnTheFeature("Documents");
  });
  it("Click on the [New Tag]", async () => {
    await Documents.createNewTag("Tag 5");
    await Documents.searchItem("Tag 5");
  });
  it("Create document", async () => {
    await Documents.addDocument("Thermometer", "Document 5");
    await Documents.logsForCreationDocument.waitForDisplayed({
      timeout: 10000,
    });
    await Documents.logsForCreationDate.waitForDisplayed({
      timeout: 10000,
    });
    await expect(Documents.logsForCreationDocument).toHaveTextContaining(
      "Document was created by user."
    );
    await expect(Documents.logsForCreationDate).toHaveTextContaining(`${date}`);
  });
  it("Upload New Version and confirm audit trail and data with user", async () => {
    await Documents.upload();
    await Documents.versionText.waitForDisplayed({ timeout: 10000 });
    await expect(Documents.versionText).toHaveTextContaining(
      `Version: 1.0 | Expiration date: ${date}`
    );
    await expect(Documents.logsForAddVersion).toHaveTextContaining(
      "Document version was added by user."
    );
    await expect(Documents.logsForAddDate).toHaveTextContaining(`${date}`);
    await Documents.upload2();
    await browser.pause(1000);
    await Documents.listOfVersionText[0].waitForDisplayed({ timeout: 10000 });
    await expect(Documents.listOfVersionText[0]).toHaveTextContaining(
      `Version: 1.1 | Expiration date: ${date}`
    );
    await expect(Documents.logsForAddSecondVersion).toHaveTextContaining(
      "Document version was added by user."
    );
    await expect(Documents.logsForAddSecondDate).toHaveTextContaining(
      `${date}`
    );
  });
});