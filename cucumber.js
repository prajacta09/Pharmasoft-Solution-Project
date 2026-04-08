module.exports = {
  default: `./features/**/*.feature`,
  requireModule: ['dotenv/config'],
  format: [
    'progress',
    'json:./reports/cucumber-report.json',
    'html:./reports/cucumber-report.html'
  ],
  require: [
    './step-definitions/**/*.js'
  ],
  formatOptions: {
    snippetInterface: 'async-await'
  },
  publishQuiet: true,
  dryRun: false,
  forceExit: false,
  strict: false,
  retry: 0,
  stepTimeout: 30000,
  timeout: 30000
};
