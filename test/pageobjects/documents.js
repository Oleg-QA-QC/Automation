class Documents {
  get newTag() {
    return $("//span[contains(text(),'New Tag')]/..");
  }
  get name() {
    return $("#name");
  }
  get addBtn() {
    return $(".ant-modal-content .ant-btn.ant-btn-primary");
  }
  get tagsList() {
    return $$(".ant-table-row.ant-table-row-level-0");
  }
  get tagName() {
    return $(".ant-table-row.ant-table-row-level-0 a");
  }
  get title() {
    return $(".item___3PWx2.active___1l6ie h1");
  }
  get addDocumentBtn() {
    return $("//span[contains(text(),'Add Document')]/..");
  }
  get inputDocName() {
    return $(".ant-modal-content .ant-input");
  }
  get nextBtn() {
    return $(".ant-btn.ant-btn-default");
  }
  get nextBtn2() {
    return $(".ant-btn.ant-btn-default");
  }
  get productsList() {
    return $$(".container___19NSw li.ant-list-item");
  }
  get DropDownSearch() {
    return $(".ant-select-selection__rendered");
  }
  get selectCountry() {
    return $("//li[contains(text(),'Brazil')]");
  }
  get doneBtn() {
    return $(".ant-btn-group .ant-btn.ant-btn-primary");
  }
  get uploadNewVersion() {
    return $(".ant-card.ant-card-bordered .ant-btn.ant-btn-primary");
  }
  get input() {
    return $('input[type="file"]');
  }
  get addVersionBtn() {
    return $("//span[contains(text(),'Add Version')]//..");
  }
  get inputVersionFields() {
    return $$(".ant-input-number-input");
  }
  get calendar() {
    return $(".ant-calendar-picker-input.ant-input");
  }
  get logsForCreationDocument() {
    return $(".ant-timeline-item-content p");
  }
  get logsForCreationDate() {
    return $(".ant-timeline-item-content span");
  }
  get logsForAddVersion() {
    return $(".ant-timeline>:nth-child(1) p");
  }
  get logsForAddDate() {
    return $(".ant-timeline>:nth-child(1) span");
  }
  get logsForAddSecondVersion() {
    return $(".ant-timeline>:nth-child(1) p");
  }
  get logsForAddSecondDate() {
    return $(".ant-timeline>:nth-child(1) span");
  }
  get versionText() {
    return $(".ant-collapse-header");
  }
  get versionTextList() {
    return $$(".ant-collapse-header");
  }
  get listOfVersionText() {
    return $$(".ant-collapse-header");
  }
  get browseFile() {
    return $$(".ant-modal-content .ant-btn.ant-btn-primary");
  }
  get edit() {
    return $$(".my-btn___3q8Er .anticon.anticon-edit");
  }
  get neededCalendarDate() {
    return $('td[title="May 10, 2023"]');
  }
  get inputDate() {
    return $(".ant-calendar-picker-input.ant-input");
  }
  get archiveBtn() {
    return $$("i.anticon.anticon-delete");
  }
  get dateTextSelector() {
    return $(".ant-calendar-my-select");
  }
  get nextMonth() {
    return $(".ant-calendar-next-month-btn");
  }
  get archiveYes() {
    return $(".ant-btn.ant-btn-primary.ant-btn-sm");
  }
  get deletedDocument() {
    return $("//a[contains(text(),'Document 1')]");
  }
  get deletedDocument7() {
    return $("//a[contains(text(),'Document 7')]");
  }
  get searchField() {
    return $(".header___3wuSJ .ant-input");
  }
  get searchedItem() {
    return $(".ant-table-row.ant-table-row-level-0 a");
  }
  get searchedArchivedItem() {
    return $$(".ant-table-row.ant-table-row-level-0 a");
  }
  get archiveSearch() {
    return $(".header___38GNK .ant-input");
  }
  get version() {
    return $(".anticon.anticon-right.ant-collapse-arrow");
  }
  get loadedFile() {
    return $(".mainCard___37NfP a");
  }

  // Should be included 2 unique docs in the list
  async shouldInclude(doc1, doc2) {
    await browser.pause(2000);
    await this.tagsList[0].waitForExist({ timeout: 10000 });
    const list = [];
    for (let i = 0; i < (await this.tagsList.length); i++) {
      const tag = await this.tagsList[i]
        .$(".ant-table-row.ant-table-row-level-0 a")
        .getText();
      const promiseTag = await Promise.resolve(await tag);
      list.push(await promiseTag);
    }
    if (list.includes(doc1) && list.includes(doc2)) {
      return true;
    } else {
      return false;
    }
  }

  get logo() {
    return $(".logo___vI_yt");
  }

  // Search the tag and open it
  async searchItem(text) {
    await browser.pause(1000);
    await this.searchField.waitForClickable({ timeout: 10000 });
    await this.searchField.setValue(text);
    await browser.pause(2000);
    await this.searchedItem.waitForClickable({ timeout: 10000 });
    await this.searchedItem.click();
    await browser.pause(2000);
  }

  get archiveTagBtn() {
    return $("i.anticon.anticon-delete");
  }

  // Remove the searched tag
  async archiveTag(tag) {
    await this.searchField.waitForClickable({ timeout: 10000 });
    await this.searchField.setValue(tag);
    await browser.pause(2000);
    await this.archiveTagBtn.waitForClickable({ timeout: 10000 });
    await this.archiveTagBtn.click();
    await browser.pause(500);
    await this.archiveYes.waitForClickable({ timeout: 10000 });
    await this.archiveYes.click();
  }

  // Search the tag
  async searchItemDMS(text) {
    await this.searchField.waitForClickable({ timeout: 10000 });
    await this.searchField.setValue(text);
  }

  // Search archive tag
  async searchArchive(text) {
    await browser.pause(3000);
    await this.archiveSearch.waitForClickable({ timeout: 10000 });
    await this.archiveSearch.addValue(text);
    await browser.pause(2000);
    await this.searchedArchivedItem[0].waitForDisplayed({ timeout: 10000 });
    return await this.searchedArchivedItem[0];
  }

  get today() {
    return $("a.ant-calendar-today-btn");
  }

  // Upload the file with version
  async upload() {
    await browser.pause(1000);
    await this.uploadNewVersion.waitForClickable({ timeout: 10000 });
    await this.uploadNewVersion.click();
    await browser.pause(3000);
    await browser.execute(() => {
      const liElements = document.querySelector('input[type="file"]');
      liElements.removeAttribute("style");
    });
    const filePath = "test/upload/invite.ics";
    const remoteFilePath = await browser.uploadFile(filePath);
    await this.input.setValue(remoteFilePath);
    await this.inputVersionFields[0].setValue("1");
    await this.inputVersionFields[1].setValue("0");
    await this.calendar.click();
    await browser.pause(500);
    await this.today.waitForClickable({ timeout: 10000 });
    await this.today.click();
    await this.addVersionBtn.waitForClickable({ timeout: 10000 });
    await this.addVersionBtn.click();
  }

  // Upload another version
  async upload2() {
    await browser.pause(1000);
    await this.uploadNewVersion.waitForClickable({ timeout: 10000 });
    await this.uploadNewVersion.click();
    await browser.pause(3000);
    await browser.execute(() => {
      const liElements = document.querySelector('input[type="file"]');
      liElements.removeAttribute("style");
    });
    const filePath = "test/upload/invite2.ics";
    const remoteFilePath = await browser.uploadFile(filePath);
    await this.input.setValue(remoteFilePath);
    await this.inputVersionFields[0].setValue("1");
    await this.inputVersionFields[1].setValue("1");
    await this.calendar.click();
    await browser.pause(500);
    await this.today.waitForClickable({ timeout: 10000 });
    await this.today.click();
    await this.addVersionBtn.waitForClickable({ timeout: 10000 });
    await this.addVersionBtn.click();
  }

  get paginationNext() {
    return $(".container___19NSw .ant-pagination-next");
  }

  get searchProduct() {
    return $(".ant-input-wrapper.ant-input-group .ant-input");
  }

  get searchedProduct() {
    return $(".ant-list-item");
  }

  // Create a new document
  async addDocument(product, doc) {
    await this.addDocumentBtn.waitForClickable({ timeout: 10000 });
    await this.addDocumentBtn.click();
    await this.inputDocName.setValue(doc);
    await browser.pause(500);
    await this.nextBtn.waitForClickable({ timeout: 10000 });
    await this.nextBtn.click();
    await browser.pause(1000);
    await this.productsList[0].waitForExist({ timeout: 10000 });
    await this.searchProduct.setValue(product);
    await browser.pause(2000);
    await this.searchedProduct.waitForClickable({ timeout: 10000 });
    await this.searchedProduct.click();
    await this.nextBtn2.waitForClickable({ timeout: 10000 });
    await this.nextBtn2.click();
    await this.nextBtn.click();
    await browser.pause(2000);
    await this.DropDownSearch.waitForClickable({ timeout: 10000 });
    await this.DropDownSearch.click();
    await browser.pause(500);
    await this.selectCountry.click();
    await this.doneBtn.click();
  }

  // Create a new tag
  async createNewTag(documentName) {
    await browser.refresh();
    await browser.pause(1000);
    await this.newTag.waitForClickable({ timeout: 10000 });
    await this.newTag.click();
    await this.name.setValue(documentName);
    await this.addBtn.waitForClickable({ timeout: 10000 });
    await this.addBtn.click();
  }

  get neededTag() {
    return $$(".ant-table-row.ant-table-row-level-0 a");
  }

  get nextPagination() {
    return $(".anticon.anticon-right");
  }

  // Open searched tag
  async existingTag(TagName) {
    await this.searchField.waitForClickable({ timeout: 10000 });
    await this.searchField.addValue(TagName);
    await browser.pause(1500);
    await $(".ant-table-row.ant-table-row-level-0 a").click();
    await browser.pause(1000);
  }

  get docSearchFiled() {
    return $(".ant-input");
  }

  // Search and click on the existing document
  async existingDoc(documentName) {
    await this.docSearchFiled.waitForClickable({ timeout: 10000 });
    await this.docSearchFiled.addValue(documentName);
    await browser.pause(1500);
    await $(".ant-table-row.ant-table-row-level-0 a").click();
    await browser.pause(1000);
  }

  get archivePaginationNext() {
    return $$(".ant-pagination.ant-table-pagination .ant-pagination-next");
  }

  // Search archived item and return (the name) itself
  async archivedItem(text) {
    await browser.pause(2000);
    await this.docSearchFiled.waitForClickable({ timeout: 10000 });
    await this.docSearchFiled.addValue(text);
    await browser.pause(1500);
    await this.tagsList[0].waitForClickable({ timeout: 10000 });
    for (let i = 0; i < (await this.tagsList.length); i++) {
      const tag = await this.tagsList[i]
        .$(".ant-table-row.ant-table-row-level-0 a")
        .getText();
      const promiseTag = await Promise.resolve(await tag);
      if (promiseTag.includes(text)) {
        return await this.tagsList[i];
      } else {
        await this.archivePaginationNext[1].click();
      }
    }
  }

  // Remove searched document
  async archiveDocument(docName) {
    await browser.pause(1000);
    await this.docSearchFiled.waitForClickable({ timeout: 10000 });
    await this.docSearchFiled.addValue(docName);
    await browser.pause(1000);
    await this.archiveTagBtn.click();
    await this.archiveYes.waitForClickable({ timeout: 10000 });
    await this.archiveYes.click();
  }

  get existingDocument() {
    return $("//div[@class='name___1Uttz']");
  }
  get doneButton() {
    return $("//span[contains(text(),'Done')]/..");
  }
  
  // Select From DMS
  async DMSUpload() {
    await this.existingDocument.waitForDisplayed({ timeout: 10000 });
    await this.existingDocument.click();
    await this.doneButton.waitForClickable({ timeout: 10000 });
    await this.doneButton.click();
  }
}
module.exports = new Documents();
