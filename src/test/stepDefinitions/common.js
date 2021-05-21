const { logger } = require("../logger.js");
const { getHomeUrl, getConfig } = require("../config.js");
const { generatePageUrl, visitPage, currentPage } = require("../web/page.js");
const { WebButton } = require("../web/ui/web-button.js");
const { WebForm } = require("../web/ui/web-form.js");
const { Given, When, Then } = require("@cucumber/cucumber");
const { PageToVisit, TestContext } = require("../context/test-context.js");
const {
	assertThat,
	undefined,
	is,
	not,
	strictlyEqualTo,
	truthy,
} = require("hamjest");
const {
	makeTextFieldFromLabel,
	LABEL_EMAIL_PHONE_FIELD,
	LABEL_PASSWORD_FIELD,
} = require("../web/text-field.js");

/**
 * This step definition sets the name of the page to visit in the test context.
 * This page name is used later to generate its corresponding url.
 */
Given(/^user visits (.*) page$/, async (pageName) => {
	try {
		logger.debug(`Step definition - user visits ${pageName} page`);
		logger.debug(`Setting ContextItem ${PageToVisit}`);
		TestContext.setContextItem(PageToVisit, pageName);
		logger.debug("STEP OK");
	} catch (err) {
		logger.error(err.message);
		throw err;
	}
});

/**
 * This step definition loads the web page using page name.
 * The page name is retrived from test context and its corresponding url is then generated and visited.
 */
Given(/^page is loaded$/, async () => {
	try {
		logger.debug("Step definition - page is loaded");
		logger.debug(`Getting ContextItem ${PageToVisit}`);
		const pageName = TestContext.getContextItem(PageToVisit);
		assertThat(pageName, is(not(undefined())));
		const pageUrl = generatePageUrl(getHomeUrl(), pageName);
		const page = await visitPage(pageUrl);
		assertThat(page.url, strictlyEqualTo(pageUrl));
		logger.debug("STEP OK");
	} catch (err) {
		logger.error(err.message);
		throw err;
	}
});

/**
 * This step definition clicks a target button.
 * The target button is determined by its label text.
 */
Given(/^user clicks (.*) button$/, async (buttonLabel) => {
	try {
		logger.debug(`Step definition - user clicks ${buttonLabel} button`);
		const button = new WebButton(buttonLabel);
		const clicked = await button.click();
		assertThat(
			`Expected - clicked button ${buttonLabel} , Actual - not clicked button`,
			clicked,
			is(truthy())
		);
		logger.debug("STEP OK");
	} catch (err) {
		logger.error(err.message);
		throw err;
	}
});

/**
 * This step definition sets value in a text field in the form on the page.
 * The label of text field and the value to set is captured from the feature file by this step definition.
 * A TextField object contains the text field id for the given text field label, so to determine the id of
 * text field label captured by step definition a TextField object must be created.
 */
When(/^user sets (.*) to value (.*)$/, async (fieldLabel, fieldValue) => {
	try {
		logger.debug(
			`Step definition - user sets ${fieldLabel} to value ${fieldValue}`
		);
		const field = makeTextFieldFromLabel(fieldLabel);
		if (
			field.label === LABEL_EMAIL_PHONE_FIELD ||
			field.label === LABEL_PASSWORD_FIELD
		) {
			// Decode the sensitive information
			const buffer = Buffer.from(getConfig(fieldValue), "base64");
			fieldValue = buffer.toString("utf-8");
		}
		const formToFill = new WebForm();
		await formToFill.setText(field.id, fieldValue);
		logger.debug("STEP OK");
	} catch (err) {
		logger.error(err.message);
		throw err;
	}
});

/**
 * This step definition asserts the browser redirection to the given page.
 * The redirection is verified by comparing the URLs of the expected and actual page.
 */
Then(/^browser redirects to (.*) page$/, async (pageName) => {
	try {
		logger.debug(`Step definition - browser redirects to ${pageName} page`);
		const expectedPageUrl = new URL(
			generatePageUrl(getHomeUrl(), pageName)
		);
		const currentPageUrl = new URL((await currentPage()).url);
		assertThat(
			"Actual redirect base url is different than expected",
			currentPageUrl.origin,
			strictlyEqualTo(expectedPageUrl.origin)
		);
		assertThat(
			"Actual redirect url path is different than expected",
			currentPageUrl.pathname,
			strictlyEqualTo(expectedPageUrl.pathname)
		);
		logger.debug("STEP OK");
	} catch (err) {
		logger.error(err.message);
		throw err;
	}
});
