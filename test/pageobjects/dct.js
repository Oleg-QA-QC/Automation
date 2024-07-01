require("dotenv").config();

class DCT {
  get listOfChecklists() {
    return $$(".ant-table-row.ant-table-row-level-0");
  }
  get approveToggleBtn() {
    return $(".approve___28SgE button.ant-switch");
  }
  get confirmBtn() {
    return $(".ant-modal-body .ant-btn.ant-btn-primary");
  }
  get password() {
    return $("#password");
  }
  get confirmBtn2() {
    return $(".ant-form-item-control .ant-btn.ant-btn-primary");
  }
  get reason() {
    return $("//option[contains(text(),'Reason')]");
  }
  get selectReason() {
    return $("//option[contains(text(),'I have reviewed the document')]");
  }
  get firstName() {
    return $("#recipient_first_name");
  }
  get email() {
    return $("#esig-sad-email");
  }
  get signHere() {
    return $(".sign-arrow.rtl-sign-arrow");
  }
  get typeInSignature() {
    return $("#esig-tab-type");
  }
  get adoptSign() {
    return $("//span[contains(text(),'Adopt & Sign')]");
  }
  get agreeSign() {
    return $("//span[@id='esig-agreed']");
  }
  get approvetext() {
    return $("#doc_title");
  }
  get approvedBy() {
    return $(".approve___28SgE .title___3HjBt");
  }
  get radioBtn() {
    return $(
      ".ant-radio-group.ant-radio-group-solid Label:nth-child(2) .ant-radio-input"
    );
  }

  //Signature process
  async signature() {
    await this.reason.click();
    await this.selectReason.waitForDisplayed({ timeout: 10000 });
    await this.selectReason.click();
    await this.firstName.setValue("Oleg Zagorodnii");
    await this.email.setValue(process.env.EMAIL2);
    await this.signHere.click();
    await this.typeInSignature.waitForClickable({ timeout: 10000 });
    await this.typeInSignature.click();
    await this.adoptSign.waitForClickable({ timeout: 10000 });
    await this.adoptSign.click();
    await this.agreeSign.waitForClickable({ timeout: 10000 });
    await this.agreeSign.click();
  }

  async addPassword() {
    await this.password.setValue(process.env.PASSWORD2);
    await this.confirmBtn2.click();
  }

  // All main btns on the main screen (1 - 6)
  get listOfDCTBtns() {
    return $$(".ant-btn.btn___3Wp-j");
  }

  //Click on the main btn on the main screen (1 - 6)
  async mainDCTBtns(text) {
    await browser.refresh();
    await browser.pause(3000);
    await this.listOfDCTBtns[0].waitForClickable({ timeout: 10000 });
    for (let i = 0; i < (await this.listOfDCTBtns.length); i++) {
      const btnText = this.listOfDCTBtns[i]
        .$(".ant-btn.btn___3Wp-j span")
        .getText();
      const promise = await Promise.resolve(await btnText);
      if (promise.includes(text)) {
        await this.listOfDCTBtns[i].click();
      }
    }
  }

  get yesBtn() {
    return $(".ant-row .ant-btn.ant-btn-primary");
  }
  get calendarField() {
    return $(".ant-calendar-picker-input.ant-input");
  }
  get inputDateFild() {
    return $(".ant-calendar-input");
  }
  get nextBtn() {
    return $(".ant-btn-group .ant-btn-default");
  }
  get searchProduct() {
    return $(".ant-input-wrapper.ant-input-group .ant-input");
  }
  get searchedProduct() {
    return $(".ant-list-item");
  }
  get searchSKU() {
    return $(".ant-input-search.ant-input-affix-wrapper>input");
  }
  get searchedSKU() {
    return $(
      ".ant-tabs-tabpane.ant-tabs-tabpane-active.container___RyJ82 .ant-list-item-meta-content"
    );
  }
  get nextBtn2() {
    return $(".buttons___VGbOE .ant-btn.ant-btn-default");
  }
  get clickField() {
    return $(".searchContainer___1DC_N .ant-select-selection__rendered");
  }
  get searchCountry() {
    return $(".searchContainer___1DC_N .ant-select-search__field");
  }
  get nextBtn3() {
    return $(".buttons___VGbOE .ant-btn.ant-btn-default");
  }
  get classification() {
    return $(
      "//div[contains(text(),'Medical Device')]/..//li[contains(text(),'Class III')]"
    );
  }
  get nextBtn4() {
    return $(".ant-btn-group .ant-btn.ant-btn-default");
  }
  get checklistType() {
    return $('//div[text()="Market Approval"]');
  }
  get nextBtn5() {
    return $(".ant-btn-group .ant-btn.ant-btn-default");
  }
  get checklistSubType() {
    return $('//div[contains(text(),"Re-Registration")]');
  }
  get nextBtn6() {
    return $(".ant-btn-group .ant-btn.ant-btn-default");
  }
  get checklistNameField() {
    return $(
      ".ant-tabs-tabpane.ant-tabs-tabpane-active.container___RyJ82 .ant-input"
    );
  }
  get checklistDone() {
    return $(".buttons___VGbOE .ant-btn.ant-btn-primary");
  }
  get checklistYesBtn() {
    return $(".ant-modal-confirm-btns .ant-btn.ant-btn-primary");
  }
  get todayDate() {
    return $(".ant-calendar-today-btn");
  }

  // Create the checklist for Submission
  async createChecklistForSubmission(product, SKU, country, checklistName) {
    await this.yesBtn.click();
    await this.calendarField.click();
    await this.todayDate.waitForClickable({ timeout: 10000 });
    await this.todayDate.click();
    await this.nextBtn.click();
    await browser.pause(2000);
    await this.searchProduct.setValue(product);
    await browser.pause(2000);
    await this.searchedProduct.waitForClickable({ timeout: 10000 });
    await this.searchedProduct.click();
    await browser.pause(2000);
    await this.searchSKU.waitForClickable({ timeout: 10000 });
    await this.searchSKU.click();
    await browser.pause(1000);
    await this.searchSKU.setValue(SKU);
    await this.searchedSKU.waitForClickable({ timeout: 10000 });
    await this.searchedSKU.click();
    await this.nextBtn2.waitForClickable({ timeout: 10000 });
    await this.nextBtn2.click();
    await browser.pause(1500);
    await this.clickField.waitForClickable({ timeout: 10000 });
    await this.clickField.click();
    await browser.pause(2000);
    await this.searchCountry.setValue(country);
    await browser.keys("Enter");
    await browser.pause(1500);
    await this.classification.waitForClickable({ timeout: 10000 });
    await this.classification.click();
    await this.checklistType.waitForClickable({ timeout: 10000 });
    await this.checklistType.click();
    await browser.pause(1500);
    await this.checklistSubType.waitForClickable({ timeout: 10000 });
    await this.checklistSubType.click();
    await this.nextBtn6.waitForClickable({ timeout: 10000 });
    await this.nextBtn6.click();
    await browser.pause(1500);
    await this.checklistNameField.setValue(checklistName);
    await this.checklistDone.waitForClickable({ timeout: 10000 });
    await this.checklistDone.click();
    await this.checklistYesBtn.waitForClickable({ timeout: 10000 });
    await this.checklistYesBtn.click();
  }
  get underLogo() {
    return $("//a[contains(text(),'Product Checklist')]");
  }
  get nameFilter() {
    return $("//span[contains(text(),'Checklist ID')]/ancestor::th/i");
  }
  get inputSearchField() {
    return $(".ant-modal-content .ant-input");
  }
  get magnifyingGlass() {
    return $(".ant-btn.ant-input-search-button.ant-btn-primary");
  }

  // Open searched checklist
  async openSearchedChecklist(checklistName) {
    await browser.refresh();
    await browser.pause(1000);
    await this.nameFilter.waitForClickable({ timeout: 10000 });
    await this.nameFilter.click();
    await this.inputSearchField.waitForClickable({ timeout: 10000 });
    await this.inputSearchField.setValue(checklistName);
    await this.magnifyingGlass.waitForClickable({ timeout: 10000 });
    await this.magnifyingGlass.click();
    await browser.pause(1500);

    await $("td a").click();
  }
  get removeChecklist() {
    return $("//i[contains(@class,'anticon anticon-delete')]");
  }
  get removeYes() {
    return $("//button[@class='ant-btn ant-btn-primary ant-btn-sm']");
  }

  // Remove searched checklist
  async removeSearchedChecklist(checklistName) {
    await browser.pause(1000);
    await this.nameFilter.waitForClickable({ timeout: 10000 });
    await this.nameFilter.click();
    await this.inputSearchField.waitForClickable({ timeout: 10000 });
    await this.inputSearchField.setValue(checklistName);
    await this.magnifyingGlass.waitForClickable({ timeout: 10000 });
    await this.magnifyingGlass.click();
    await browser.pause(1500);

    await this.removeChecklist.waitForClickable({ timeout: 10000 });
    await this.removeChecklist.click();
    await this.removeYes.waitForClickable({ timeout: 10000 });
    await this.removeYes.click();
  }

  get popUpMessage() {
    return $("div.ant-popover-message-title");
  }
  get noBtn() {
    return $(
      "//div[contains(text(),'Would you like to initiate E-Signature?')]//ancestor::div//button[@class='ant-btn ant-btn-sm']"
    );
  }
  get emailInput() {
    return $("#email");
  }
  get passwordInput() {
    return $("#password");
  }
  get confirmBtn() {
    return $(".ant-modal-content .ant-btn.ant-btn-primary");
  }
  get lockedYes() {
    return $("//button[contains(@class,'ant-btn-primary')]");
  }
  
  // Approving without signature
  async approveWithoutSignature() {
    await this.popUpMessage.waitForDisplayed({ timeout: 10000 });
    await expect(this.popUpMessage).toHaveText(
      "Are you sure you would like to proceed? Once the requirement is approved it will be locked for changes"
    );
    await this.lockedYes.click();
    await browser.pause(1000);
    await this.noBtn.waitForClickable({ timeout: 10000 });
    await this.noBtn.click();
    await browser.pause(1000);
    await this.emailInput.waitForExist({ timeout: 10000 });
    await this.emailInput.setValue(process.env.EMAIL);
    await this.passwordInput.waitForExist({ timeout: 10000 });
    await this.passwordInput.setValue(process.env.PASSWORD);
    await this.confirmBtn.waitForClickable({ timeout: 10000 });
    await this.confirmBtn.click();
  }

  get approveRequirementMark() {
    return $("//tbody[@class='ant-table-tbody']/tr[1]//i[@aria-label='icon: check']");
  }

}
module.exports = new DCT();
