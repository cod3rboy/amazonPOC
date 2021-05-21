const SELECTOR_SELECT_BOX = "select#<id>";

/**
 * Represents a select box on the webpage.
 * This class finds a select box using its id attribute
 * and provides methods to perform various interactions on select box.
 */
exports.WebSelectBox = class WebSelectBox {
	#selectBoxId; // id of the select box

	constructor(selectBoxId) {
		this.#selectBoxId = selectBoxId;
	}

	/**
	 * This methods finds the select box object using its id in the DOM
	 *
	 * @param {*} rootElement root element of DOM hierarchy/sub-hierarchy in which select box is present
	 * @returns select box object
	 */
	#findSelectBox = async (rootElement) => {
		if (!rootElement) rootElement = await browser.$("body");
		return await rootElement.$(
			SELECTOR_SELECT_BOX.replace(/<id>/g, this.#selectBoxId)
		);
	};

	/**
	 * This method selects an option in the select box
	 *
	 * @param {string} optionText option to select in the select box
	 * @param {*} rootElement root element of DOM hierarchy/sub-hierarchy in which select box is present
	 */
	async selectOption(optionText, rootElement) {
		const selectBox = await this.#findSelectBox(rootElement);
		await selectBox.selectByVisibleText(optionText);
	}

	/**
	 * This method selects first option in the select box
	 *
	 * @param {*} rootElement root element of DOM hierarchy/sub-hierarchy in which select box is present
	 */
	async selectFirstOption(rootElement) {
		const selectBox = await this.#findSelectBox(rootElement);
		await selectBox.selectByIndex(0);
	}

	/**
	 * This method is used to get the selected option in the select box
	 *
	 * @param {*} rootElement root element of DOM hierarchy/sub-hierarchy in which select box is present
	 * @returns selected option text
	 */
	async getSelectedOption(rootElement) {
		const selectBox = await this.#findSelectBox(rootElement);
		const selection = await selectBox.getValue();
		if (Array.isArray(selection)) return selection[0];
		return selection;
	}
};
