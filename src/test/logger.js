/**
 * This module sets up logger for the application.
 */
const { createLogger, format, transports } = require("winston");
const { combine, splat, timestamp, printf } = format;
const { getLogDirectoryPath } = require("./config.js");

// Log file Directory
const LOG_DIR = getLogDirectoryPath();

/**
 * Checks whether the meta data object is empty.
 *
 * @param {*} metaData Meta data object
 * @returns true if meta data is empty | false
 */
function isMetaDataEmpty(metaData) {
	return (
		metaData &&
		Object.keys(metaData).length === 0 &&
		metaData.constructor === Object
	);
}

// Setup the format for log file
const logFormat = printf(({ level, message, timestamp, ...metadata }) => {
	let msg = `${timestamp} [${level}] : ${message} `;
	if (!isMetaDataEmpty(metadata))
		msg += "- [ METADATA = " + JSON.stringify(metadata) + " ]";
	return msg;
});

// Create Logger
const logger = createLogger({
	level: "debug",
	format: combine(splat(), timestamp(), logFormat),
	transports: [
		new transports.File({
			filename: LOG_DIR + "cucumber-tests.log",
			level: "debug",
		}),
	],
});

exports.logger = logger;
