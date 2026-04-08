class ContextManager {
  constructor() {
    this.context = {
      lastStep: null,
      lastLocator: null,
      lastAction: null,
      failureReason: null,
      retryCount: 0,
      maxRetries: 3,
      pageContent: '',
      elementsFound: [],
      navigationHistory: []
    };
  }

  updateStep(stepName) {
    this.context.lastStep = stepName;
    this.context.retryCount = 0;
    this.context.failureReason = null;
  }

  updateLocator(locator) {
    this.context.lastLocator = locator;
  }

  updateAction(action) {
    this.context.lastAction = action;
  }

  recordFailure(error) {
    this.context.failureReason = error.message || error.toString();
    this.context.retryCount++;
  }

  shouldRetry() {
    return this.context.retryCount < this.context.maxRetries;
  }

  resetRetries() {
    this.context.retryCount = 0;
  }

  updatePageContent(content) {
    this.context.pageContent = content;
  }

  addElementFound(element) {
    if (!this.context.elementsFound.find(el => el.text === element.text)) {
      this.context.elementsFound.push(element);
    }
  }

  addToNavigationHistory(url, title) {
    this.context.navigationHistory.push({
      url,
      title,
      timestamp: new Date().toISOString()
    });
  }

  getLastNavigation() {
    return this.context.navigationHistory[this.context.navigationHistory.length - 1];
  }

  getNavigationCount() {
    return this.context.navigationHistory.length;
  }

  getContext() {
    return { ...this.context };
  }

  setContext(newContext) {
    this.context = { ...this.context, ...newContext };
  }

  clearContext() {
    this.context = {
      lastStep: null,
      lastLocator: null,
      lastAction: null,
      failureReason: null,
      retryCount: 0,
      maxRetries: 3,
      pageContent: '',
      elementsFound: [],
      navigationHistory: []
    };
  }

  generateReport() {
    return {
      summary: {
        totalSteps: this.context.navigationHistory.length,
        totalFailures: this.context.retryCount,
        elementsFound: this.context.elementsFound.length
      },
      lastStep: this.context.lastStep,
      lastLocator: this.context.lastLocator,
      lastAction: this.context.lastAction,
      failureReason: this.context.failureReason,
      navigationHistory: this.context.navigationHistory,
      elementsFound: this.context.elementsFound
    };
  }
}

module.exports = ContextManager;
