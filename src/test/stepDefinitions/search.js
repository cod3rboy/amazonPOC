const { logger } = require("../logger.js");
const { Given, When, Then } = require("@cucumber/cucumber");
const { assertThat, is, truthy } = require("hamjest");
const { ProductSearch } = require("../web/product-search.js");

/**
 * This step definition sets the given keyword in the product search box.
 */
Given(/^user enters (.*) in search box$/, async (searchKeyword) => {
	try {
		logger.debug(
			`Step definition - user enters ${searchKeyword} in search box`
		);
		const productSearch = new ProductSearch();
		await productSearch.setKeyword(searchKeyword);
		logger.debug("STEP OK");
	} catch (err) {
		logger.error(err.message);
		throw err;
	}
});

/**
 * This step definition selects the given category name in the product category select box.
 */
Given(/^user selects (.*) category in search box$/, async (categoryName) => {
	try {
		logger.debug(
			`Step definition - user selects ${categoryName} category in search box`
		);
		const productSearch = new ProductSearch();
		await productSearch.selectCategory(categoryName);
		logger.debug("STEP OK");
	} catch (err) {
		logger.error(err.message);
		throw err;
	}
});

/**
 * This step definition submits the product search.
 */
When(/^user submits search box$/, async () => {
	try {
		logger.debug("Step definition - user submits search box");
		const productSearch = new ProductSearch();
		const submitted = await productSearch.performSearch();
		assertThat("Failed to submit product search", submitted, is(truthy()));
		logger.debug("STEP OK");
	} catch (err) {
		logger.error(err.message);
		throw err;
	}
});

/**
 * This step definition asserts that page displays the search results.
 */
Then(/^search results are displayed$/, async () => {
	try {
		logger.debug("Step definition - search results are displayed");
		const productSearch = new ProductSearch();
		const hasSearchResults = await productSearch.hasResults();
		assertThat(
			"Expected - Search results displayed, Actual - No search results displayed",
			hasSearchResults,
			is(truthy())
		);
		logger.debug("STEP OK");
	} catch (err) {
		logger.error(err.message);
		throw err;
	}
});
