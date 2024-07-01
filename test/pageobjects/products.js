class Products {
  // main Product btns 1-5
  get listOfProductBtns() {
    return $$(".ant-btn");
  }
  get name() {
    return $("#name");
  }
  get addBtn() {
    return $(".ant-form-item-control .ant-btn.ant-btn-primary");
  }
  
  // Add Product
  async addProduct(Name) {
    await browser.pause(1000);
    await this.name.waitForDisplayed({ timeout: 10000 });
    await this.name.addValue(Name);
    await this.addBtn.waitForClickable({ timeout: 10000 });
    await this.addBtn.click();
  }

  // Click on the main btn on the main screen (1 - 5)
  async mainProductBtns(text) {
    await browser.refresh();
    await browser.pause(2000);
    await this.listOfProductBtns[0].waitForExist({ timeout: 10000 });
    for (let i = 0; i < (await this.listOfProductBtns.length); i++) {
      const btnText = this.listOfProductBtns[i].$(".ant-btn span").getText();
      const promise = await Promise.resolve(await btnText);
      if (promise.includes(text)) {
        await this.listOfProductBtns[i].click();
      }
    }
  }
  get searchField() {
    return $(".ant-input");
  }
  get sku() {
    return $("//span[contains(text(),'SKU')]/..");
  }
  get addSKUBtn() {
    return $(".ant-modal-content .ant-btn.ant-btn-primary");
  }
  get skuName() {
    return $("#name");
  }
  get searchCountry() {
    return $("//div[contains(text(),'Search a country name')]/..");
  }
  get inputCountry() {
    return $(".ant-select-search__field");
  }
  get addBtnSKU() {
    return $("//span[text()='Add']/..");
  }
  get closeSKU() {
    return $("i.anticon.anticon-close.ant-modal-close-icon");
  }

  // Add a SKU to the appropriate product
  async addSKU(product, sku, country) {
    await this.searchField.waitForClickable({ timeout: 10000 });
    await this.searchField.addValue(product);
    await browser.pause(1000);
    await this.sku.waitForClickable({ timeout: 10000 });
    await this.sku.click();
    await browser.pause(1000);
    await this.addSKUBtn.waitForClickable({ timeout: 10000 });
    await this.addSKUBtn.click();
    await this.skuName.waitForDisplayed({ timeout: 10000 });
    await this.skuName.addValue(sku);
    await browser.pause(1000);
    await this.searchCountry.click();
    await browser.pause(500);
    await this.inputCountry.addValue(country);
    await browser.pause(1000);
    await browser.keys("Enter");
    await this.addBtnSKU.waitForClickable({ timeout: 10000 });
    await this.addBtnSKU.click();
    await browser.pause(1000);
    await this.closeSKU.waitForClickable({ timeout: 10000 });
    await this.closeSKU.click();
  }

  get deleteProductButton() {
    return $("i.anticon.anticon-delete");
  }
  get yesButton() {
    return $(".ant-btn.ant-btn-danger");
  }

  // Delete product
  async deleteProduct(product) {
    await browser.pause(1000);
    await this.searchField.waitForClickable({ timeout: 10000 });
    await this.searchField.addValue(product);
    await browser.pause(2000);
    await this.deleteProductButton.waitForClickable({ timeout: 10000 });
    await this.deleteProductButton.click();
    await this.yesButton.waitForClickable({ timeout: 10000 });
    await this.yesButton.click();
    await browser.pause(1000);
  }
}

module.exports = new Products();
