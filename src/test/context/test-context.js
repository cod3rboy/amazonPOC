/**
 * This module stores test context data.
 * The data stored in the context is shared among all step definitions of a scenario during its execution.
 */

// Key used for context item
exports.PageToVisit = "page_to_visit";

// Map used to store the test context key-value pairs
const contextMap = new Map();

/**
 * Sets a context item in the test context for the specified key
 *
 * @param {string} key Key for context item
 * @param {*} value Value to store against given key
 */
function setContextItem(key, value) {
	contextMap.set(key, value);
}

/**
 * Retrieve previously stored context item from the test context for given key
 *
 * @param {string} key key previously used to store context item in test context
 * @returns context item or undefined if key not found in test context
 */
function getContextItem(key) {
	return contextMap.get(key);
}

/**
 * Checks whether a context item for given key exists in test context
 *
 * @param {string} key key to check in test context
 * @returns true | false
 */
function hasContextItem(key) {
	return contextMap.has(key);
}

/**
 * Deletes a context item from the test context
 *
 * @param {string} key key used to store context item in test context
 * @returns true if context item existed in the test context and has been removed, or false if context item does not exist.
 */
function deleteContextItem(key) {
	return contextMap.delete(key);
}

/**
 * Clears the test context
 */
function clearContext() {
	contextMap.clear();
}

exports.TestContext = {
	setContextItem,
	getContextItem,
	hasContextItem,
	deleteContextItem,
	clearContext,
};
