// CSS selectors related to buttons
const CLASS_BUTTON_CONTAINER = "a-button-inner";
const SELECTOR_INNER_BUTTON = "input[type=submit]";
const SELECTOR_ALL_BUTTONS = `button, a[class*="button"],.${CLASS_BUTTON_CONTAINER},input[type=submit][value]:not([value=""]),input[type=button][value]:not([value=""])`;

/**
 * Represents a button presents on the webpage.
 * This class finds a button through button label and
 * it provides methods to perform various button interactions.
 */
exports.WebButton = class WebButton {
	#label; // button label

	constructor(label) {
		this.#label = label;
	}

	/**
	 * Finds target button object in the DOM having button label
	 *
	 * @param {*} rootElement element in DOM hierarchy where the search for button begins
	 * @returns target button object | null if button is not found
	 */
	#findButtonElement = async (rootElement) => {
		if (rootElement === undefined) rootElement = await browser.$("body");
		const allButtons = await rootElement.$$(SELECTOR_ALL_BUTTONS);
		let targetButton = null;
		for (const button of allButtons) {
			let label;
			const tagName = await button.getTagName();

			if (tagName === "input") label = await button.getAttribute("value");
			else label = await button.getText();

			if (!!label && this.#getAlphaLabel(label) === this.#label) {
				// Found the target button
				targetButton = button;
				// Element with button container class contains target button inside it
				if (
					(await targetButton.getAttribute("class")).includes(
						CLASS_BUTTON_CONTAINER
					)
				) {
					targetButton = await targetButton.$(SELECTOR_INNER_BUTTON);
				}
				break;
			}
		}
		return targetButton;
	};

	/**
	 * Removes special characters and extra spaces from the button label
	 *
	 * @param {string} label Original button label
	 * @returns Label with removed special chars and extra spaces
	 */
	#getAlphaLabel = (label) => {
		return label
			.replace(/\W/g, " ")
			.replace(/\s{2,}/g, " ")
			.trim();
	};

	/**
	 * Clicks the button
	 * @param {*} rootElement root element of DOM hierarchy/sub-hierarchy in which the button exists
	 * @returns  true of button is clicked | false
	 */
	async click(rootElement) {
		const buttonToPress = await this.#findButtonElement(rootElement);
		if (!buttonToPress) return false;
		await buttonToPress.click();
		return true;
	}
};
