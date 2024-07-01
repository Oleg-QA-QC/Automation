class Permission {

  get permissionContainer() {
    return $(
      ".ant-modal-body .ant-form.ant-form-horizontal.form___212u8 > :nth-child(5)"
    );
  }
  get permissionList() {
    return $$("div.ant-card.ant-card-bordered.ant-card-small");
  }
  get switchBtn() {
    return $$(".ant-card-extra button .ant-switch-inner");
  }
  get updateBtn() {
    return $(".ant-modal-body .ant-btn.ant-btn-primary");
  }
  get succsessfullMessage() {
    return $("//span[contains(text(),'Sent successfully')]");
  }
  get roleRows() {
    return $$(".ant-table-row.ant-table-row-level-0");
  }
  get editBtns() {
    return $$(".anticon.anticon-edit");
  }
  get roleField() {
    return $(".ant-select-selection__rendered");
  }
  get dropDownRole() {
    return $$(".ant-select-dropdown-menu li");
  }
  get shareProd() {
    return $$(".ant-card.ant-card-bordered.ant-card-large");
  }
  get toggle() {
    return $$(".ant-switch");
  }
  get edit() {
    return $$(".ant-btn");
  }
  get userField() {
    return $(".ant-select-selection__rendered");
  }
  get dropDownUser() {
    return $$(".userSearchName___1SzEk");
  }
  get addUserBtn() {
    return $(".ant-input-group.ant-input-group-compact .ant-btn");
  }
  get doneBtn() {
    return $(".ant-btn.ant-btn-primary");
  }
  
  // Share with sub user functionality
  async shareWithUser(subUserName) {
    await browser.pause(2000);
    await this.userField.waitForClickable({ timeout: 10000 });
    await this.userField.click();
    await this.dropDownUser[0].waitForExist({ timeout: 10000 });
    for (let i = 0; i < (await this.dropDownUser.length); i++) {
      const user = await this.dropDownUser[i].getText();
      const promise = await Promise.resolve(await user);
      if (promise === subUserName) {
        await this.dropDownUser[i].click();
      }
    }
    await this.addUserBtn.waitForClickable({ timeout: 10000 });
    await this.addUserBtn.click();
    await this.doneBtn.click();
  }

  // Click on the edit of the chosen user
  async getNeededUser(text) {
    await browser.pause(2000);
    await this.roleRows[0].waitForDisplayed({ timeout: 20000 });
    for (let i = 0; i < (await this.roleRows.length); i++) {
      const roleText = await this.roleRows[i]
        .$(".ant-table-row.ant-table-row-level-0 td:nth-child(2)")
        .getText();
      const promise = await Promise.resolve(await roleText);
      if (promise === text) {
        await this.editBtns[i].waitForClickable({ timeout: 20000 });
        await this.editBtns[i].click();
      }
    }
  }

  // Click on the [Update]
  async updateClick() {
    await this.updateBtn.scrollIntoView();
    await this.updateBtn.click();
  }

  // Find unique permission feature and activate it
  async listOfPermissions(text) {
    await this.permissionList[0].waitForExist({ timeout: 10000 });
    for (let i = 0; i < (await this.permissionList.length); i++) {
      const textOfPermission = await this.permissionList[i]
        .$(
          "div.ant-modal-body .ant-row.ant-form-item .ant-form-item-children .ant-card-head-title"
        )
        .getText();
      const promise = await Promise.resolve(await textOfPermission);
      let mainModuleSwitch = await this.permissionList[i].$(
        ".ant-card-head .ant-switch-inner"
      );
      if ((await promise) === text && (await mainModuleSwitch.isExisting())) {
        await browser.pause(500);
        await mainModuleSwitch.click();
      }
    }
  }

  // Working with features and their permissions
  async listOfPermissionsAndSubPermissions(
    text,
    subtext1,
    subtext2,
    subtext3,
    subtext4,
    subtext5
  ) {
    await browser.pause(2000);
    await this.permissionList[0].waitForExist({ timeout: 10000 });

    for (let i = 0; i < (await this.permissionList.length); i++) {
      let textOfPermission = await this.permissionList[i]
        .$(
          ".ant-card-head .ant-card-head-title"
        )
        .getText();
      const promise = await Promise.resolve(await textOfPermission);
      let selector = await $$(".ant-card.ant-card-bordered.ant-card-small");
      let subselector = await selector[i].$$(".ant-card-body div");
      let mainModuleSwitch = await this.permissionList[i].$(
        ".ant-card-head .ant-switch-inner"
      );

      if (promise.includes(text) && (await mainModuleSwitch.isExisting())) {
        await browser.pause(500);
        await mainModuleSwitch.click();

        for (let a = 0; a < (await subselector.length); a++) {
          let switchSubBtn = await subselector[a].$('[role="switch"]');
          const subText = await subselector[a].getText();
          const subPermision = await Promise.resolve(await subText);

          if (await subPermision.includes(subtext1)) {
            await switchSubBtn.click();
          }
          if (await subPermision.includes(subtext2)) {
            await switchSubBtn.click();
          }
          if (await subPermision.includes(subtext3)) {
            await switchSubBtn.click();
          }
          if (await subPermision.includes(subtext4)) {
            await switchSubBtn.click();
          }
          if (await subPermision.includes(subtext5)) {
            await switchSubBtn.click();
          }
        }
      }
    }
  }

  // Working with permissions of chosen feature
  async listOfSubPermissions(
    text,
    subtext1,
    subtext2,
    subtext3,
    subtext4,
    subtext5
  ) {
    await browser.pause(2000);
    await this.permissionList[0].waitForExist({ timeout: 10000 });
    for (let i = 0; i < (await this.permissionList.length); i++) {
      const textOfPermission = await this.permissionList[i]
        .$(
          "div.ant-modal-body .ant-row.ant-form-item .ant-form-item-children .ant-card-head-title"
        )
        .getText();
      const promise = await Promise.resolve(await textOfPermission);
      let selector = await $$(".ant-card.ant-card-bordered.ant-card-small");
      let subselector = await selector[i].$$(".ant-card-body div");
      if (promise.includes(text)) {
        for (let a = 0; a < (await subselector.length); a++) {
          let switchSubBtn = await subselector[a].$('[role="switch"]');
          const subText = await subselector[a].getText();
          const subPermision = await Promise.resolve(await subText);
          if (await subPermision.includes(subtext1)) {
            await switchSubBtn.click();
          }
          if (await subPermision.includes(subtext2)) {
            await switchSubBtn.click();
          }
          if (await subPermision.includes(subtext3)) {
            await switchSubBtn.click();
          }
          if (await subPermision.includes(subtext4)) {
            await switchSubBtn.click();
          }
          if (await subPermision.includes(subtext5)) {
            await switchSubBtn.click();
          }
        }
      }
    }
  }
}

module.exports = new Permission();
