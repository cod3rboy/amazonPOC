/**
 * This module provides operations to generate target page url, visit target page and search the target page content.
 */

// Pages names
const PAGE_HOME = "Home";
const PAGE_SIGN_IN = "Sign in";

exports.PAGE_HOME = PAGE_HOME;
exports.PAGE_SIGN_IN = PAGE_SIGN_IN;

/**
 * Returns the path segment for a known page to append to base URL
 *
 * @param {string} pageName known page name
 * @returns path segment for known page | throws Error if pageName is unknown
 */
function getPagePathSegment(pageName) {
	switch (pageName) {
		case PAGE_HOME:
			return "";
		case PAGE_SIGN_IN:
			return "ap/signin";
		default:
			throw new Error(`Unknown page name : ${pageName}`);
	}
}

/**
 *	Creates Page object for the active page
 *
 * @param {string} url (optional) url of the page to set in page object
 * @returns Page object for active page
 */
async function makeActivePage(url) {
	if (!url) url = await browser.getUrl();
	const pageContent = await (await browser.$("body")).getText();
	return new Page(url, pageContent);
}

/**
 * Generates a ready to visit url for given target page
 *
 * @param {string} baseUrl base url of the target page
 * @param {string} pageName name of the target page
 * @param {*} queryParams key-value pair object containing query parameters to append to url
 * @returns url for the target page
 */
exports.generatePageUrl = function (baseUrl, pageName, queryParams) {
	const url = new URL(baseUrl);
	const pathSegment = getPagePathSegment(pageName);
	if (pathSegment.length !== 0) url.pathname = pathSegment;
	if (!!queryParams) {
		for (const key in queryParams) {
			url.searchParams.append(key, queryParams[key]);
		}
	}
	return url.toString();
};

/**
 * Visits page at given url and returns its corresponding Page object
 *
 * @param {string} url URL of the page to visit
 * @returns Page object for the visited page
 */
exports.visitPage = async function (url) {
	await browser.url(url);
	return await makeActivePage(url);
};

/**
 * Returns the Page object corresponding to the currently active page.
 *
 * @returns Page object for the current page
 */
exports.currentPage = async function () {
	return await makeActivePage();
};

/**
 * Provides abstraction for a visited page.
 * It stores the url and the text content of the visited page and provides some operations related to page content.
 */
class Page {
	#url;
	#pageContent;

	constructor(url, pageContent) {
		this.#url = new URL(url);
		this.#pageContent = pageContent;
	}

	get url() {
		return this.#url.toString();
	}

	/**
	 * Checks whether page content is empty
	 *
	 * @returns true if page content is emtpy | false
	 */
	empty() {
		return !this.#pageContent || this.#pageContent.trim().length === 0;
	}

	/**
	 * Finds the content in page which matches a match group in the given regex pattern
	 *
	 * @param {RegExp} regex Regular expression pattern
	 * @param {BigInteger} matchGroup Match group to return
	 * @returns page content matched in the matchGroup of regex | null if no content matched
	 */
	find(regex, matchGroup) {
		const regexp = new RegExp(regex);
		const match = regexp.exec(this.#pageContent);
		if (match === null) return null;
		return match[matchGroup];
	}

	/**
	 * Determines whether the page content contains the given text
	 *
	 * @param {string} text text to find
	 * @param {boolean} ignoreCase true for case-insensitive | false for case-sensitive
	 * @returns true if given text is found | false if not found
	 */
	contains(text, ignoreCase) {
		let pageContent = this.#pageContent;
		if (!!ignoreCase) {
			pageContent = pageContent.toLowerCase();
			text = text.toLowerCase();
		}
		return pageContent.includes(text);
	}
}
