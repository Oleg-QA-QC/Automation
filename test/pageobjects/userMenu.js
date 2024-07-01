class UserMenu {

  get userBar() {
    return $(".name___1NET5");
  }
  get roleBar() {
    return $(".nameWithAcl___1qdIE");
  }
  get userMenuItem() {
    return $$(".ant-dropdown-menu-item");
  }

  // Using with My Team
  async userMenuBar(text) {
    await this.userBar.waitForClickable({ timeout: 10000 });
    await this.userBar.click();
    await browser.pause(1500);
    await this.userMenuItem[0].waitForExist({ timeout: 10000 });
    for (let i = 0; i < (await this.userMenuItem.length); i++) {
      const textItem = await this.userMenuItem[i]
        .$(".ant-dropdown-menu-item span")
        .getText();
      const promise = await Promise.resolve(await textItem);
      if (promise.includes(text)) {
        await this.userMenuItem[i].click();
      }
    }
  }

  //Using with Role (for sub user)
  async userMenuBarRole(text) {
    await this.roleBar.waitForClickable({ timeout: 10000 });
    await this.roleBar.click();
    await browser.pause(1500);
    await this.userMenuItem[0].waitForExist({ timeout: 10000 });
    for (let i = 0; i < (await this.userMenuItem.length); i++) {
      const textItem = await this.userMenuItem[i]
        .$(".ant-dropdown-menu-item span")
        .getText();
      const promise = await Promise.resolve(await textItem);
      if (promise.includes(text)) {
        await this.userMenuItem[i].click();
      }
    }
  }

  get systemSettingsTab() {
    return $("//*[a='System Settings']");
  }
  get eSignatureOptionalBtn() {
    return $("//*[div='Make E-Signature Optional']//button");
  }
  get updateBtn() {
    return $(".ant-form-item-children .ant-btn.ant-btn-primary");
  }

  // Switch on eSignature optional toggle btn
  async swithchOnESignatureOptional() {
    let toggleBtn = await this.eSignatureOptionalBtn.getAttribute(
      "aria-checked"
    );
    if (toggleBtn === "true") {
      await this.updateBtn.waitForClickable({ timeout: 10000 });
      await this.updateBtn.click();
    } else {
      await this.eSignatureOptionalBtn.click();
      await this.updateBtn.waitForClickable({ timeout: 10000 });
      await this.updateBtn.click();
    }
  }
}

module.exports = new UserMenu();