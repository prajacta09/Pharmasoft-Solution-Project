const config = {
  baseUrl: process.env.BASE_URL || 'https://pharmasoftsol.com/',
  browserType: process.env.BROWSER_TYPE || 'chromium',
  headless: process.env.HEADLESS === 'true',
  viewport: {
    width: parseInt(process.env.VIEWPORT_WIDTH) || 1280,
    height: parseInt(process.env.VIEWPORT_HEIGHT) || 720
  },
  timeout: parseInt(process.env.TIMEOUT) || 30000,
  navigationTimeout: parseInt(process.env.NAVIGATION_TIMEOUT) || 60000,
  retryCount: parseInt(process.env.RETRY_COUNT) || 3,
  screenshotOnFailure: process.env.SCREENSHOT_ON_FAILURE === 'true',
  allureResultsDir: process.env.ALLURE_RESULTS_DIR || 'allure-results',
  screenshotDir: process.env.SCREENSHOT_DIR || 'screenshots',
  
  playwrightOptions: {
    slowMo: 1000,
    ignoreHTTPSErrors: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  },
  
  contextOptions: {
    acceptDownloads: true,
    javaScriptEnabled: true,
    ignoreHTTPSErrors: true
  }
};

module.exports = config;
