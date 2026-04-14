const { Before, After, AfterStep, Status } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const HomePage = require('../pages/HomePage');

Before(async function () {
  this.log('Step: Launching browser');
  
  this.browser = await chromium.launch({ 
    headless: false, // Changed to false for proper screenshot capture
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
    try {
      // Wait for page to be fully loaded before screenshot
      await this.page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});
      
      const screenshotPath = path.join('screenshots', `final-${Date.now()}.png`);
      await this.page.screenshot({ 
        path: screenshotPath, 
        fullPage: true,
        animations: 'disabled'
      });
      
      if (fs.existsSync(screenshotPath)) {
        const screenshotBuffer = fs.readFileSync(screenshotPath);
        await this.attachScreenshot(screenshotBuffer, 'Final Screenshot');
        this.log(`Final screenshot captured: ${screenshotPath}`);
      }
    } catch (error) {
      this.log(`Error capturing final screenshot: ${error.message}`);
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
    try {
      // Wait a bit for page to stabilize before screenshot
      await this.page.waitForTimeout(500);
      
      const stepName = scenario.pickle.name || 'step';
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const screenshotPath = path.join('screenshots', `${stepName}-${timestamp}.png`);
      
      await this.page.screenshot({ 
        path: screenshotPath, 
        fullPage: true,
        animations: 'disabled'
      });
      
      if (fs.existsSync(screenshotPath)) {
        const screenshotBuffer = fs.readFileSync(screenshotPath);
        await this.attachScreenshot(screenshotBuffer, `Screenshot after: ${stepName}`);
        this.log(`Step screenshot captured: ${screenshotPath}`);
      }
    } catch (error) {
      this.log(`Error capturing step screenshot: ${error.message}`);
    }
  }
});
