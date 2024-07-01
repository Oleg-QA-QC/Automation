const Page = require("./page");
require("dotenv").config();

class SignInPage extends Page {
  get email() {
    return $("#email");
  }
  get password() {
    return $("#password");
  }
  get loginBtn() {
    return $(".ant-btn.submit___ZTD0m.ant-btn-primary.ant-btn-lg");
  }
  get error() {
    return $(".ant-alert-message")
  }

  // Login into main account
  async login() {
    await this.email.waitForClickable({ timeout: 100000 });
    await this.email.setValue(process.env.EMAIL);
    await this.password.waitForClickable({ timeout: 100000 });
    await this.password.setValue(process.env.PASSWORD);
    await this.loginBtn.waitForClickable({ timeout: 100000 });
    await this.loginBtn.click();
  }

  // Login into sub-account
  async login2() {
    await this.email.waitForClickable({ timeout: 100000 });
    await this.email.setValue(process.env.EMAIL3);
    await this.password.waitForClickable({ timeout: 100000 });
    await this.password.setValue(process.env.PASSWORD3);
    await this.loginBtn.waitForClickable({ timeout: 100000 });
    await this.loginBtn.click();
  }

  // Login with icorrect credentials
  async notLogin() {
    await this.email.waitForClickable({ timeout: 100000 });
    await this.email.setValue(process.env.EMAIL2);
    await this.password.waitForClickable({ timeout: 100000 });
    await this.password.setValue(process.env.PASSWORD2);
    await this.loginBtn.waitForClickable({ timeout: 100000 });
    await this.loginBtn.click();
  }
}

module.exports = new SignInPage();
