# Pharmasoft UI Automation Framework

A lightweight, production-ready UI automation framework using Playwright, Cucumber, and BDD with AI integration.

## Tech Stack

- **Playwright** - Browser automation
- **Cucumber** - BDD framework
- **Page Object Model** - Design pattern
- **AI Integration** - Lightweight failure detection and suggestions
- **MCP-style Context Manager** - Test context management
- **Allure Reporting** - Enhanced test reports
- **GitHub Actions** - Continuous integration
- **Dependency Injection** - Custom World implementation

## Project Structure

```
/features                 # Feature files (BDD scenarios)
/step-definitions        # Step definitions and hooks
/pages                   # Page Object Models
/utils                   # Utility functions
/ai                      # AI helper and context manager
/config                  # Configuration files
/reports                 # Test reports
/screenshots             # Test screenshots
/.github/workflows        # GitHub Actions workflows
package.json             # Dependencies and scripts
README.md                # Documentation
```

## Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

3. Copy environment variables (optional):
```bash
cp .env.example .env
```

## Running Tests

### Run all tests:
```bash
npm test
```

### Run smoke tests:
```bash
npm run test:smoke
```

### Run regression tests:
```bash
npm run test:regression
```

### Generate reports:
```bash
npm run test:report
```

### Generate Allure report:
```bash
npm run allure:generate
```

### Open Allure report:
```bash
npm run allure:open
```

## Configuration

### Environment Variables (.env)

```bash
BASE_URL=https://pharmasoftsol.com/
BROWSER_TYPE=chromium
HEADLESS=true
VIEWPORT_WIDTH=1280
VIEWPORT_HEIGHT=720
TIMEOUT=30000
NAVIGATION_TIMEOUT=60000
RETRY_COUNT=3
SCREENSHOT_ON_FAILURE=true
ALLURE_RESULTS_DIR=allure-results
SCREENSHOT_DIR=screenshots
```

### Configuration Files

- `config/config.js` - Framework configuration
- `cucumber.js` - Cucumber configuration
- `.env` - Environment variables

## Features

### Dependency Injection

Custom World implementation provides:
- Shared browser context
- Page objects management
- Test data sharing
- Screenshot attachment

### AI Integration

- **AiHelper.js** - Failure detection and locator suggestions
- **ContextManager.js** - MCP-style context management
- Automatic retry logic with smart fallbacks

### Reporting

- **Allure Reports** - Detailed test execution reports
- **HTML Reports** - Cucumber HTML reports
- **Screenshots** - Automatic screenshot capture per step
- **Logs** - Comprehensive logging throughout test execution

### Page Object Model

- **HomePage.js** - Main page interactions
- Playwright locators (getByRole, getByText, etc.)
- No XPath usage (best practices)

## Test Scenarios

### Navigation Testing

The framework includes comprehensive navigation testing:

1. **List all menus** - Discover and list all navigation elements
2. **Validate navigation** - Test navigation to each menu item
3. **Page load verification** - Ensure each page loads successfully

## CI/CD Integration

### GitHub Actions Workflow

- **Install Job** - Dependencies and browser setup
- **Test Job** - Test execution with artifact collection
- **Report Job** - Report generation and publishing
- **Pages Deployment** - GitHub Pages deployment for main branch

### Pipeline Features

- Parallel job execution
- Artifact caching and retention
- Report publishing
- Automatic deployment on main branch
- Pull request testing

## Best Practices

### Framework Design

- **Single Browser** - Chromium only for consistency
- **No Parallel Execution** - Sequential test execution
- **Dependency Injection** - Shared context via World
- **Clean Code** - No global variables
- **Production Ready** - Comprehensive error handling

### Test Development

- Use async/await consistently
- Access page objects via world context
- Add descriptive logs for each step
- Use Playwright recommended locators
- Follow BDD best practices

## Troubleshooting

### Common Issues

1. **Browser not found**: Run `npx playwright install`
2. **Timeout errors**: Increase timeout values in .env
3. **Element not found**: Check AI helper suggestions
4. **CI failures**: Verify GitHub Actions workflow configuration

### Debug Mode

Set `HEADLESS=false` in .env to watch test execution in browser.

## Contributing

1. Follow existing code patterns
2. Add tests for new features
3. Update documentation
4. Ensure GitHub Actions workflow passes

## License

ISC License
