# Automated Testing POC Instructions

## Problem solved:

This test automation solution is a POC to implement the BDD automated testing of the web applications.
The Application Under Test(AUT) for this POC is Amazon India shopping portal https://www.amazon.in/.
The test scenarios covered are - log into the application and search products from the search box.

## Technologies used:

1. Javascript.
2. [Node.js](https://nodejs.org/) v12.22.1 javascript execution engine.
3. [WebDriverIO](https://webdriver.io/) provides Cucumber.js test framework and WebDriver protocol integration for cross-browser testing.
4. [ChromeDriver](https://www.npmjs.com/package/chromedriver) v89.x.x npm package for executing tests on Chrome browser. It will need Chrome browser version v89 or higher for the tests to execute.
5. [Cucumber-html-reporter](https://www.npmjs.com/package/cucumber-html-reporter) npm package to translate Cucumber JSON test report to HTML test report.
6. [Hamjest](https://www.npmjs.com/package/hamjest) npm package provides library of composable matchers for defining meaningful and readable assertions in javascript.
7. [Winston](https://www.npmjs.com/package/winston) npm package for logging.
8. [Config](https://www.npmjs.com/package/config) npm package for application configuration settings.
9. [Fs-extra](https://www.npmjs.com/package/fs-extra) npm package for file system operations.

## Opening and Setting up Project:

1.  [Visual Studio Code](https://code.visualstudio.com/) (vscode) used as IDE to develop this solution.
2.  To open the project in vscode, go to File -> Open Folder then locate and select the project folder and click Select Folder button.
3.  To install project dependencies, open the Terminal or Command Prompt and go to the project folder '...\amazonPOC' and run the following command -

        npm install

    (live internet connection required to install these dependencies and make sure node.js is installed and included in PATH environment variable.)

4.  User should have 'write' permissions to the location where '...\amazonPOC' directory is located. This is required only for installing dependencies, creating and writing report and log files at the locations '...\amazonPOC\node_modules', '...\amazonPOC\reports' and '...\amazonPOC\logs' respectively.
5.  To get better vscode IDE support, ensure that [Cucumber (Gherkin) Full Support](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete) vscode extension is installed.

## Running Tests:

Open the Terminal or Command Prompt and go to Directory '.....\amazonPOC\' and run below command:

    npx wdio run wdio.conf.js

#### Note:

Tests execute in the Chrome browser in the headless mode.

## Test Artifacts:

1. **Execution report**: Execution report file 'cucumber-tests.html' generated and located at '....\amazonPOC\reports'.
2. **Execution logs**: Log file 'cucumber-tests.log' generated and located at '....\amazonPOC\logs'.
