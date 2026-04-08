const { Before, After, AfterStep, Status } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const HomePage = require('../pages/HomePage');

Before(async function () {
  this.log('Step: Launching browser');
  
  this.browser = await chromium.launch({ 
    headless: true,
    slowMo: 1000
  });
  
  this.context = await this.browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  
  this.page = await this.context.newPage();
  
  this.pageObjects.homePage = new HomePage(this.page);
  
  this.log('Browser launched successfully');
});

After(async function (scenario) {
  this.log('Step: Capturing final screenshot');
  
  if (this.page) {
    const screenshotPath = path.join('screenshots', `final-${Date.now()}.png`);
    await this.page.screenshot({ path: screenshotPath, fullPage: true });
    
    if (fs.existsSync(screenshotPath)) {
      const screenshotBuffer = fs.readFileSync(screenshotPath);
      await this.attachScreenshot(screenshotBuffer, 'Final Screenshot');
    }
  }
  
  this.log('Step: Closing browser');
  
  if (this.browser) {
    await this.browser.close();
  }
});

AfterStep(async function (scenario) {
  this.log('Step: Capturing screenshot after step');
  
  if (this.page) {
    const stepName = scenario.pickle.name || 'step';
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const screenshotPath = path.join('screenshots', `${stepName}-${timestamp}.png`);
    
    await this.page.screenshot({ path: screenshotPath, fullPage: true });
    
    if (fs.existsSync(screenshotPath)) {
      const screenshotBuffer = fs.readFileSync(screenshotPath);
      await this.attachScreenshot(screenshotBuffer, `Screenshot after: ${stepName}`);
    }
  }
});
