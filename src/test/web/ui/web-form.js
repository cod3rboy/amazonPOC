const { WebSelectBox } = require("./web-select-box.js");
const { WebTextBox } = require("./web-text-box.js");
const { WebButton } = require("./web-button.js");

/**
 * Represents a form on the webpage.
 * It is used to fill the values in the form fields.
 */
exports.WebForm = class WebForm {
	#formSelector; // form element selector

	constructor(formSelector) {
		if (!!formSelector) this.#formSelector = formSelector;
		else this.#formSelector = "form";
	}

	/**
	 * Finds the form element on the page
	 *
	 * @returns target form element
	 */
	#findFormElement = async () => {
		return await browser.$(this.#formSelector);
	};

	/**
	 * Set the value in the text field of form
	 *
	 * @param {string} textFieldId unique id of the text field for accessing text field element in DOM
	 * @param {string} value value to set in the text field
	 */
	async setText(textFieldId, value) {
		if (!value) value = "";
		const form = await this.#findFormElement();
		const textBox = new WebTextBox(textFieldId);
		await textBox.setText(value, form);
	}

	/**
	 * Select a value in the select box field of form
	 *
	 * @param {string} selectFieldId unique id of the select box field for accessing select box element in DOM
	 * @param {string} value option to select in the select box
	 */
	async selectOption(selectFieldId, value) {
		if (!value) value = "";
		const form = await this.#findFormElement();
		const selectBox = new WebSelectBox(selectFieldId);
		if (value.trim().length === 0) await selectBox.selectFirstOption(form);
		else await selectBox.selectOption(value, form);
	}

	/**
	 * Submits the form
	 *
	 * @param {string} submitButtonLabel Label for the submit button in the form
	 * @returns true if form is submitted | false
	 */
	async submit(submitButtonLabel) {
		const form = await this.#findFormElement();
		const submitButton = new WebButton(submitButtonLabel);
		return await submitButton.click(form);
	}
};
