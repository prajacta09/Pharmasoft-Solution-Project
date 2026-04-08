class AiHelper {
  constructor() {
    this.failurePatterns = [
      'Element not found',
      'Timeout exceeded',
      'Element not visible',
      'Element not clickable',
      'Navigation failed',
      'Page load failed'
    ];
  }

  detectFailure(error) {
    const errorMessage = error.message || error.toString();
    
    for (const pattern of this.failurePatterns) {
      if (errorMessage.toLowerCase().includes(pattern.toLowerCase())) {
        return {
          detected: true,
          type: pattern,
          message: errorMessage,
          suggestion: this.getSuggestion(pattern)
        };
      }
    }
    
    return {
      detected: false,
      type: 'unknown',
      message: errorMessage,
      suggestion: 'Retry the action or check if the element exists'
    };
  }

  getSuggestion(failureType) {
    const suggestions = {
      'Element not found': 'Try using alternative locators like getByText(), getByRole(), or CSS selectors',
      'Timeout exceeded': 'Increase wait time or use waitForSelector() before interacting',
      'Element not visible': 'Scroll to element or use force option if appropriate',
      'Element not clickable': 'Wait for element to be enabled and visible',
      'Navigation failed': 'Check if URL is correct and network is stable',
      'Page load failed': 'Wait for network idle or increase page load timeout'
    };
    
    return suggestions[failureType] || 'Retry the action with different approach';
  }

  suggestLocatorFallback(elementDescription) {
    const fallbackStrategies = [
      `Try getByText("${elementDescription}")`,
      `Try getByRole("button", { name: "${elementDescription}" })`,
      `Try locator("text=${elementDescription}")`,
      `Try locator('[title="${elementDescription}"]')`,
      `Try locator('[aria-label="${elementDescription}"]')`,
      `Try CSS selector: .${elementDescription.toLowerCase().replace(/\s+/g, '-')}`,
      `Try XPath: //*[text()="${elementDescription}"]`
    ];
    
    return fallbackStrategies;
  }

  analyzePageContext(pageContent) {
    const analysis = {
      hasNavigation: false,
      hasHeader: false,
      hasFooter: false,
      hasMenu: false,
      suggestedSelectors: []
    };
    
    if (pageContent.includes('nav') || pageContent.includes('navigation')) {
      analysis.hasNavigation = true;
      analysis.suggestedSelectors.push('nav', '[role="navigation"]');
    }
    
    if (pageContent.includes('header')) {
      analysis.hasHeader = true;
      analysis.suggestedSelectors.push('header', '[role="banner"]');
    }
    
    if (pageContent.includes('footer')) {
      analysis.hasFooter = true;
      analysis.suggestedSelectors.push('footer', '[role="contentinfo"]');
    }
    
    if (pageContent.includes('menu') || pageContent.includes('menuitem')) {
      analysis.hasMenu = true;
      analysis.suggestedSelectors.push('[role="menuitem"]', '[role="menu"]');
    }
    
    return analysis;
  }
}

module.exports = AiHelper;
