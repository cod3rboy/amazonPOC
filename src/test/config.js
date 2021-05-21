/**
 * This module abstracts the test configuration settings.
 * It provides method to retrieve stored configuration for test as well as helper methods to retrieve common
 * configuration settings.
 */
const config = require("config");

// Configuration path keys used in configuration file
const CONFIG_JSON_REPORT_DIR = "cucumberJsonReportDirectory";
const CONFIG_HTML_REPORT_FILE = "cucumberHtmlReportFile";
const CONFIG_LOG_DIR = "logDirectory";
const CONFIG_HOME_URL = "homeUrl";

/**
 * Retrieves the value stored at a given configuration path key
 *
 * @param {string} configKey any valid configuration path key
 * @returns value stored at given configKey. Throws error if configKey is invalid.
 */
exports.getConfig = function (configKey) {
	return config.get(configKey);
};

/**
 * Returns the configured directory path for the cucumber json test report
 *
 * @returns directory path for json test report
 */
exports.getJsonTestReportDirectory = function () {
	return config.get(CONFIG_JSON_REPORT_DIR);
};

/**
 * Returns the configured file path for the cucumber html test report
 *
 * @returns file path for html test report
 */
exports.getHtmlTestReportFilePath = function () {
	return config.get(CONFIG_HTML_REPORT_FILE);
};

/**
 * Returns the configured directory path for storing test logs
 *
 * @returns logs directory path
 */
exports.getLogDirectoryPath = function () {
	return config.get(CONFIG_LOG_DIR);
};

/**
 * Returns the configured home url
 *
 * @returns home url
 */
exports.getHomeUrl = function () {
	return config.get(CONFIG_HOME_URL);
};
