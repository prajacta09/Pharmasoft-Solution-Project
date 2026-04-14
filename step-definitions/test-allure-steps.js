const { Given, When, Then } = require('@cucumber/cucumber');

Given('I have a working test framework', async function () {
  console.log('Step: Test framework is working');
});

When('I run a simple test', async function () {
  console.log('Step: Running simple test');
});

Then('the test should pass', async function () {
  console.log('Step: Test should pass');
});

Then('Allure report should be generated', async function () {
  console.log('Step: Allure report should be generated');
});
