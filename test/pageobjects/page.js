const dotenv = require("dotenv");
require("dotenv").config();

module.exports = class Page {
  open() {
    return browser.url(process.env.LINK);
  }
};

