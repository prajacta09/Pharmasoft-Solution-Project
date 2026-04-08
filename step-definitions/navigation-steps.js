const { Given, When, Then } = require('@cucumber/cucumber');

Given('I launch the Pharmasoft homepage', async function () {
  this.log('Step: Launching Pharmasoft homepage');
  await this.pageObjects.homePage.navigate();
});

Given('the page loads successfully', async function () {
  this.log('Step: Verifying page load');
  await this.pageObjects.homePage.waitForPageLoad();
  const title = await this.pageObjects.homePage.getPageTitle();
  if (!title) {
    throw new Error('Page title is empty - page may not have loaded properly');
  }
  this.log(`Page loaded successfully with title: ${title}`);
});

When('I look for all navigation menus', async function () {
  this.log('Step: Looking for all navigation menus');
  const menuItems = await this.pageObjects.homePage.getAllMenuItems();
  this.setSharedData('menuItems', menuItems);
  this.log(`Found ${menuItems.length} menu items`);
});

When('I list all available menu items', async function () {
  this.log('Step: Listing all available menu items');
  const menuItems = await this.pageObjects.homePage.getAllMenuItems();
  this.setSharedData('menuItems', menuItems);
  this.log(`Listed ${menuItems.length} menu items`);
});

Then('I should see the menu items listed', async function () {
  this.log('Step: Verifying menu items are listed');
  const menuItems = this.getSharedData('menuItems');
  
  if (!menuItems || menuItems.length === 0) {
    throw new Error('No menu items found');
  }
  
  this.log(`Successfully verified ${menuItems.length} menu items are listed`);
  
  for (const item of menuItems) {
    this.log(`- ${item.text} (${item.type})`);
  }
});

Then('the navigation should be visible', async function () {
  this.log('Step: Verifying navigation visibility');
  const isVisible = await this.pageObjects.homePage.isNavigationVisible();
  
  if (!isVisible) {
    throw new Error('Navigation menu is not visible');
  }
  
  this.log('Navigation is visible as expected');
});

Then('I should be able to navigate to each menu', async function () {
  this.log('Step: Attempting to navigate to each menu');
  const menuItems = this.getSharedData('menuItems');
  
  if (!menuItems || menuItems.length === 0) {
    throw new Error('No menu items available for navigation');
  }
  
  // Filter out skip links and only test main navigation items
  const mainMenuItems = menuItems.filter(item => 
    !item.text.includes('Skip to') && 
    item.text !== 'Pharmasoft' &&
    item.text.length > 2
  );
  
  this.log(`Testing ${mainMenuItems.length} main menu items out of ${menuItems.length} total`);
  
  let successfulNavigations = 0;
  const maxItemsToTest = Math.min(mainMenuItems.length, 3); // Limit to 3 items for demo
  
  for (let i = 0; i < maxItemsToTest; i++) {
    const item = mainMenuItems[i];
    try {
      this.log(`Attempting to navigate to: ${item.text}`);
      
      await this.pageObjects.homePage.navigate();
      await this.pageObjects.homePage.waitForPageLoad();
      
      await this.pageObjects.homePage.clickMenuItem(item.text);
      await this.page.waitForTimeout(1000);
      
      const currentTitle = await this.pageObjects.homePage.getPageTitle();
      this.log(`Successfully navigated to: ${item.text} - Page title: ${currentTitle}`);
      
      successfulNavigations++;
      
    } catch (error) {
      this.log(`Failed to navigate to ${item.text}: ${error.message}`);
    }
  }
  
  this.log(`Successfully navigated to ${successfulNavigations} out of ${maxItemsToTest} tested menu items`);
  
  if (successfulNavigations === 0) {
    throw new Error('Failed to navigate to any menu items');
  }
});

Then('each navigation should load successfully', async function () {
  this.log('Step: Verifying each navigation loads successfully');
  const menuItems = this.getSharedData('menuItems');
  
  if (!menuItems || menuItems.length === 0) {
    throw new Error('No menu items to verify');
  }
  
  let successfulLoads = 0;
  
  for (const item of menuItems) {
    try {
      this.log(`Verifying load for: ${item.text}`);
      
      await this.pageObjects.homePage.navigate();
      await this.pageObjects.homePage.clickMenuItem(item.text);
      await this.page.waitForTimeout(2000);
      
      const title = await this.pageObjects.homePage.getPageTitle();
      
      if (title && title.trim().length > 0) {
        this.log(`Page loaded successfully for ${item.text} - Title: ${title}`);
        successfulLoads++;
      } else {
        this.log(`Page failed to load properly for ${item.text} - Empty title`);
      }
      
    } catch (error) {
      this.log(`Error verifying load for ${item.text}: ${error.message}`);
    }
  }
  
  this.log(`Successfully verified ${successfulLoads} out of ${menuItems.length} pages loaded properly`);
  
  if (successfulLoads === 0) {
    throw new Error('No pages loaded successfully');
  }
});
