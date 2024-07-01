class Dashboard {
  get HomeDashboard() {
    return $(".anticon.anticon-home");
  }
  get ListOfFeatureBtns() {
    return $$(".btn-group-vertical.btn-block button");
  }
  get logo() {
    return $(".logo___vI_yt");
  }

  // Clicks on the main btn on the main screen
  async clickOnTheFeature(text) {
    await browser.pause(1500);
    await this.HomeDashboard.waitForClickable({ timeout: 100000 });
    await this.HomeDashboard.moveTo();
    await this.ListOfFeatureBtns[0].waitForClickable({ timeout: 10000 });
    for (let i = 0; i < (await this.ListOfFeatureBtns.length); i++) {
      const Feature = await this.ListOfFeatureBtns[i]
        .$("span.label-full")
        .getText();
      const PromiseList = await Promise.resolve(await Feature);
      if (await PromiseList.includes(text)) {
        await this.ListOfFeatureBtns[i].click();
      }
    }
  }
}

module.exports = new Dashboard();
