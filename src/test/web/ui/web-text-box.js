const SELECTOR_TEXT_BOX =
	"input[type=text]#<id>,textarea#<id>,input[type=search]#<id>,input.a-input-text#<id>";

/**
 * Represents a text box on the web page.
 * This class finds a text box using its id attribute
 * and provides methods to set/get values in the text.
 */
exports.WebTextBox = class WebTextBox {
	#textBoxId; // id of the text box

	constructor(textBoxId) {
		this.#textBoxId = textBoxId;
	}

	/**
	 * This method finds the text box object in the DOM using its id
	 *
	 * @param {*} rootElement root element of DOM hierarchy/sub-hierarchy in which text box is present
	 * @returns text box object
	 */
	#findTextBoxElement = async (rootElement) => {
		if (!rootElement) rootElement = await browser.$("body");
		return await rootElement.$(
			SELECTOR_TEXT_BOX.replace(/<id>/g, this.#textBoxId)
		);
	};

	/**
	 * Sets the text value in the text box
	 *
	 * @param {string} text text value to set in text box
	 * @param {*} rootElement root element of DOM hierarchy/sub-hierarchy in which text box is present
	 */
	async setText(text, rootElement) {
		const textBox = await this.#findTextBoxElement(rootElement);
		// clear any existing text and set new text
		await textBox.setValue(text);
	}

	/**
	 * Gets the text value from the text box
	 *
	 * @param {*} rootElement root element of DOM hierarchy/sub-hierarchy in which text box is present
	 * @returns text value present in the text box
	 */
	async getText(rootElement) {
		const textBox = await this.#findTextBoxElement(rootElement);
		return await textBox.getValue();
	}
};
