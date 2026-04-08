const { setWorldConstructor, World } = require('@cucumber/cucumber');

class CustomWorld extends World {
  constructor(options) {
    super(options);
    this.browser = null;
    this.context = null;
    this.page = null;
    this.sharedTestData = {};
    this.pageObjects = {};
    this.screenshotPath = '';
  }

  async attachScreenshot(screenshotBuffer, stepName) {
    if (this.attach) {
      this.attach(screenshotBuffer, 'image/png');
    }
  }

  log(message) {
    console.log(`[TEST LOG] ${message}`);
  }

  setSharedData(key, value) {
    this.sharedTestData[key] = value;
  }

  getSharedData(key) {
    return this.sharedTestData[key];
  }
}

setWorldConstructor(CustomWorld);

module.exports = CustomWorld;
