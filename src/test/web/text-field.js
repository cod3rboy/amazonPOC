/**
 * This module stores the text field labels and IDs for corresponding text boxes.
 */
const LABEL_EMAIL_PHONE_FIELD = "Email or mobile phone number";
const ID_EMAIL_PHONE_FIELD = "ap_email";

const LABEL_PASSWORD_FIELD = "Password";
const ID_PASSWORD_FIELD = "ap_password";

exports.LABEL_EMAIL_PHONE_FIELD = LABEL_EMAIL_PHONE_FIELD;
exports.LABEL_PASSWORD_FIELD = LABEL_PASSWORD_FIELD;

/**
 * Stores a text field label and id.
 */
class TextField {
	#label; // Display label text for the field
	#id; // id of the field

	constructor(label, id) {
		this.#label = label;
		this.#id = id;
	}

	get label() {
		return this.#label;
	}
	get id() {
		return this.#id;
	}
}

/**
 * Creates a TextField object for the given label
 *
 * @param {string} fieldLabel label for text field
 * @returns TextField object for the given label | throws Error if given label is unknown
 */
exports.makeTextFieldFromLabel = function (fieldLabel) {
	switch (fieldLabel) {
		case LABEL_EMAIL_PHONE_FIELD:
			return new TextField(fieldLabel, ID_EMAIL_PHONE_FIELD);
		case LABEL_PASSWORD_FIELD:
			return new TextField(fieldLabel, ID_PASSWORD_FIELD);
		default:
			throw new Error(`Unknown text field label - ${fieldLabel}`);
	}
};
