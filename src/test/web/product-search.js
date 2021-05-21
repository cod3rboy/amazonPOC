/**
 * This modules provides operations for searching a product on the website.
 */
const { WebForm } = require("./ui/web-form.js");
const { currentPage } = require("./page.js");

const ID_SEARCH_FORM = "nav-search-bar-form"; // search form id
const ID_SEARCH_FIELD = "twotabsearchtextbox"; // id of the search text field
const LABEL_SUBMIT_BUTTON = "Go"; // Label for the search button
const ID_CATEGORY_SELECT = "searchDropdownBox"; // id of the category select box
// Pattern to capture search results summary line.
const PATTERN_RESULTS_COUNT = /\d+-\d+ of (over )?(\d+[,\d+]*) results for "\w+"/i;

exports.ProductSearch = class ProductSearch {
	#searchForm;

	constructor() {
		this.#searchForm = new WebForm(`#${ID_SEARCH_FORM}`);
	}

	/**
	 * Sets the search keyword in the search text field
	 *
	 * @param {string} searchKeyword search keyword
	 */
	async setKeyword(searchKeyword) {
		await this.#searchForm.setText(ID_SEARCH_FIELD, searchKeyword);
	}

	/**
	 * Selects an option in the categories select box
	 *
	 * @param {string} categoryName category name option to select
	 */
	async selectCategory(categoryName) {
		await this.#searchForm.selectOption(ID_CATEGORY_SELECT, categoryName);
	}

	/**
	 * Submits the search form and search results page is loaded.
	 *
	 * @returns true if form is submitted | false
	 */
	async performSearch() {
		return await this.#searchForm.submit(LABEL_SUBMIT_BUTTON);
	}

	/**
	 * Checks whether page has search results or not. This method is intended to be called after invoking performSearch method.
	 * @returns true if page displays search results | false
	 */
	async hasResults() {
		const page = await currentPage();
		const results = page.find(PATTERN_RESULTS_COUNT, 2);
		return results !== null;
	}
};
