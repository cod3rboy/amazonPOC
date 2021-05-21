const { logger } = require("../logger.js");
const { getHomeUrl } = require("../config.js");
const {
	currentPage,
	generatePageUrl,
	PAGE_SIGN_IN,
} = require("../web/page.js");
const { Given, Then } = require("@cucumber/cucumber");
const { truthy, assertThat, is, strictlyEqualTo, falsey } = require("hamjest");

/**
 * This step definition asserts that user is not currently signed in by checking the presence of 'sign in' text
 * in the content of current page. The 'sign in' text is only present in the page content when user is not signed in.
 */
Given(/^user is not signed in$/, async () => {
	try {
		logger.debug("Step definition - user is not signed in");
		const page = await currentPage();
		const notSignedIn = page.contains("sign in", true);
		assertThat(
			"Expected - page contains 'sign in' text, Actual - page does not contain 'sign in' text",
			notSignedIn,
			is(truthy())
		);
		logger.debug("STEP OK");
	} catch (err) {
		logger.error(err.message);
		throw err;
	}
});

/**
 * This step definition verifies that the given field is present on the sign in page.
 */
Given(/^sign in page asks for (.*)$/, async (fieldName) => {
	try {
		logger.debug(`Step definition - sign in page asks for ${fieldName}`);
		const activePage = await currentPage();
		const activePageUrl = new URL(activePage.url);
		const signInPageUrl = new URL(
			generatePageUrl(getHomeUrl(), PAGE_SIGN_IN)
		);
		// First verify user is on sign in page
		assertThat(
			"Current page is not sign in page",
			activePageUrl.pathname,
			strictlyEqualTo(signInPageUrl.pathname)
		);
		// Verify that current page contains given field
		assertThat(
			`Current page does not contain field '${fieldName}'`,
			activePage.contains(fieldName),
			is(truthy())
		);
		logger.debug("STEP OK");
	} catch (err) {
		logger.error(err.message);
		throw err;
	}
});

/**
 * This step definition asserts that the user is currently signed in by checking the absence of 'sign in' text
 * and 'Hello, Sign in' text. When the user is signed in, page content does not contain 'sign in' text and 'Hello, Sign in' text.
 */
Then(/^user is signed in$/, async () => {
	try {
		logger.debug("Step definition - user is signed in");
		const page = await currentPage();
		assertThat(
			"Expected - page does not contain 'sign in' text, Actual - page contains 'sign in' text",
			page.contains("sign in", true),
			is(falsey())
		);
		assertThat(
			"Expected - page does not contain 'Hello, sign in' text, Actual - page contains 'Hello, sign in' text",
			page.contains("Hello, sign in", true),
			is(falsey())
		);
		logger.debug("STEP OK");
	} catch (err) {
		logger.error(err.message);
		throw err;
	}
});
