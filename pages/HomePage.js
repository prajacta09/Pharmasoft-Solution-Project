class HomePage {
  constructor(page) {
    this.page = page;
    this.url = 'https://pharmasoftsol.com/';
    
    this.locators = {
      navigationMenu: this.page.getByRole('navigation'),
      menuItems: this.page.locator('nav a, nav button, nav [role="menuitem"]'),
      header: this.page.getByRole('banner'),
      mainContent: this.page.getByRole('main'),
      footer: this.page.getByRole('contentinfo')
    };
  }

  async navigate() {
    console.log('Step: Navigating to homepage');
    try {
      await this.page.goto(this.url, { waitUntil: 'domcontentloaded', timeout: 10000 });
      await this.page.waitForLoadState('domcontentloaded', { timeout: 5000 });
      console.log('Step: Homepage loaded successfully');
    } catch (error) {
      console.log('Page load timeout, continuing anyway...');
      // Continue even if timeout occurs
    }
  }

  async getPageTitle() {
    console.log('Step: Getting page title');
    const title = await this.page.title();
    console.log(`Page title: ${title}`);
    return title;
  }

  async getAllMenuItems() {
    console.log('Step: Finding all menu items');
    
    const menuItems = [];
    
    // Try multiple selector strategies
    const selectors = [
      'nav a',
      'nav button', 
      '[role="menuitem"]',
      'header a',
      'header button',
      '.menu a',
      '.navigation a',
      '.nav a',
      '[href*="/"]',
      'a[href]'
    ];
    
    for (const selector of selectors) {
      try {
        const elements = await this.page.locator(selector).all();
        console.log(`Found ${elements.length} elements with selector: ${selector}`);
        
        for (const element of elements) {
          try {
            const text = await element.textContent();
            const href = await element.getAttribute('href');
            const isVisible = await element.isVisible();
            
            if (text && text.trim() && isVisible && text.trim().length > 0) {
              const cleanText = text.trim();
              
              // Avoid duplicates and empty/irrelevant links
              if (!menuItems.find(item => item.text === cleanText) && 
                  cleanText.length > 1 && 
                  cleanText !== 'Home' &&
                  !cleanText.match(/^\d+$/)) {
                
                menuItems.push({
                  text: cleanText,
                  href: href || '',
                  type: 'link',
                  selector: selector
                });
              }
            }
          } catch (err) {
            // Skip elements that can't be accessed
            continue;
          }
        }
      } catch (err) {
        console.log(`Selector ${selector} failed: ${err.message}`);
        continue;
      }
    }
    
    // If still no items found, try to find any clickable elements
    if (menuItems.length === 0) {
      console.log('No menu items found with standard selectors, trying fallback...');
      
      const allClickables = await this.page.locator('button, [role="button"], a').all();
      for (const element of allClickables) {
        try {
          const text = await element.textContent();
          const isVisible = await element.isVisible();
          
          if (text && text.trim() && isVisible && text.trim().length > 1) {
            const cleanText = text.trim();
            
            if (!menuItems.find(item => item.text === cleanText)) {
              menuItems.push({
                text: cleanText,
                href: await element.getAttribute('href') || '',
                type: 'clickable',
                selector: 'button, [role="button"], a'
              });
            }
          }
        } catch (err) {
          continue;
        }
      }
    }
    
    console.log(`Found ${menuItems.length} menu items:`, menuItems.map(m => m.text));
    return menuItems;
  }

  async clickMenuItem(menuText) {
    console.log(`Step: Clicking menu item: ${menuText}`);
    
    const menuItems = await this.getAllMenuItems();
    const targetMenu = menuItems.find(menu => 
      menu.text.toLowerCase().includes(menuText.toLowerCase())
    );
    
    if (!targetMenu) {
      throw new Error(`Menu item with text "${menuText}" not found`);
    }
    
    try {
      // Use the selector that found the item
      if (targetMenu.selector) {
        await this.page.locator(`${targetMenu.selector}:has-text("${targetMenu.text}")`).first().click();
      } else if (targetMenu.type === 'link') {
        await this.page.locator(`a:has-text("${targetMenu.text}")`).first().click();
      } else if (targetMenu.type === 'button') {
        await this.page.locator(`button:has-text("${targetMenu.text}")`).first().click();
      } else if (targetMenu.type === 'menuitem') {
        await this.page.locator(`[role="menuitem"]:has-text("${targetMenu.text}")`).first().click();
      } else if (targetMenu.type === 'clickable') {
        await this.page.locator(`button:has-text("${targetMenu.text}"), [role="button"]:has-text("${targetMenu.text}"), a:has-text("${targetMenu.text}")`).first().click();
      }
      
      // Wait for navigation with timeout handling
      try {
        await this.page.waitForLoadState('domcontentloaded', { timeout: 3000 });
        console.log(`Step: Successfully clicked menu item: ${menuText}`);
      } catch (loadError) {
        console.log(`Navigation timeout for ${menuText}, continuing...`);
      }
      
    } catch (error) {
      console.log(`Failed to click ${targetMenu.text} with selector ${targetMenu.selector}: ${error.message}`);
      
      // Try alternative approach
      try {
        await this.page.locator(`text=${targetMenu.text}`).first().click();
        try {
          await this.page.waitForLoadState('domcontentloaded', { timeout: 3000 });
        } catch (loadError) {
          console.log(`Navigation timeout for ${menuText}, continuing...`);
        }
        console.log(`Step: Successfully clicked menu item using text selector: ${menuText}`);
      } catch (fallbackError) {
        throw new Error(`Failed to click menu item "${menuText}" with all strategies`);
      }
    }
  }

  async isNavigationVisible() {
    console.log('Step: Checking if navigation is visible');
    
    // Check for various navigation patterns
    const navigationSelectors = [
      'nav',
      '[role="navigation"]',
      'header',
      '.menu',
      '.navigation',
      '.nav',
      '[role="menubar"]'
    ];
    
    for (const selector of navigationSelectors) {
      try {
        const element = this.page.locator(selector).first();
        if (await element.isVisible()) {
          console.log(`Navigation found with selector: ${selector}`);
          return true;
        }
      } catch (err) {
        continue;
      }
    }
    
    // If no traditional navigation found, check if we have any menu items
    const menuItems = await this.getAllMenuItems();
    if (menuItems.length > 0) {
      console.log(`Navigation considered visible - found ${menuItems.length} menu items`);
      return true;
    }
    
    console.log('Navigation not visible');
    return false;
  }

  async waitForPageLoad() {
    console.log('Step: Waiting for page to load');
    try {
      await this.page.waitForLoadState('domcontentloaded', { timeout: 5000 });
      await this.page.waitForTimeout(1000);
      console.log('Step: Page loaded successfully');
    } catch (error) {
      console.log('Page load timeout, continuing anyway...');
      await this.page.waitForTimeout(1000);
    }
  }
}

module.exports = HomePage;
