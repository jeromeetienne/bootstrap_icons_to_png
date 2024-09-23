import DrawingHelper from "./drawing_helper.js"
import MainHelper from "./main_helper.js"

export default class UiHelper {
	// Generic Input
	static iconNameSearchEl = /** @type {HTMLInputElement} */(document.querySelector('#iconNameSearchContainer'))

	// DrawingConfig input
	static iconNameContainerEl = /** @type {HTMLSelectElement} */(document.querySelector('#iconNameContainer'))
	static widthFinalContainerEl = /** @type {HTMLInputElement} */(document.querySelector('#widthFinalContainer'))
	static heightFinalContainerEl = /** @type {HTMLInputElement} */(document.querySelector('#heightFinalContainer'))
	static widthMarginContainerEl = /** @type {HTMLInputElement} */(document.querySelector('#widthMarginContainer'))
	static heightMarginContainerEl = /** @type {HTMLInputElement} */(document.querySelector('#heightMarginContainer'))
	static iconColorContainerEl = /** @type {HTMLInputElement} */(document.querySelector('#iconColorContainer'))
	static backgroundColorContainerEl = /** @type {HTMLInputElement} */(document.querySelector('#backgroundColorContainer'))
	static backgroundShapeContainerEl = /** @type {HTMLSelectElement} */(document.querySelector('#backgroundShapeContainer'))

	/**
	 * 
	 * @param {()=>Promise<void>} onChangeCallback 
	 */
	static async onChange(onChangeCallback) {
		this.iconNameContainerEl.addEventListener('input', onChangeCallback);
		this.widthFinalContainerEl.addEventListener('input', onChangeCallback);
		this.heightFinalContainerEl.addEventListener('input', onChangeCallback);
		this.widthMarginContainerEl.addEventListener('input', onChangeCallback);
		this.heightMarginContainerEl.addEventListener('input', onChangeCallback);
		this.iconColorContainerEl.addEventListener('input', onChangeCallback);
		this.backgroundColorContainerEl.addEventListener('input', onChangeCallback);
		this.backgroundShapeContainerEl.addEventListener('input', onChangeCallback);
	}

	static async init(){
		// init the iconNameSearch
		const iconNames = await MainHelper.getIconNames();
		this.iconNameSearchEl.addEventListener('input', async () => {
			const searchedValue = this.iconNameSearchEl.value;

			// find all matching names
			const matchingNames = iconNames.filter(iconName => iconName.includes(searchedValue));

			// if no matching names, then return
			if(matchingNames.length === 0)	return;
			
			// pick the best name
			const bestName = matchingNames[0];

			// update the iconNameContainer
			this.iconNameContainerEl.value = bestName;
			// emit a input event
			this.iconNameContainerEl.dispatchEvent(new Event('input'));
		})

	}

	/**
	 * 
	 * @param {import("../type.d.js").DrawingConfig} drawingConfig 
	 */
	static setDrawingConfig(drawingConfig) {
		this.widthFinalContainerEl.value = drawingConfig.widthFinal.toString();
		this.heightFinalContainerEl.value = drawingConfig.heightFinal.toString();
		this.iconNameContainerEl.value = drawingConfig.iconName;
		this.widthMarginContainerEl.value = drawingConfig.widthMargin.toString();
		this.heightMarginContainerEl.value = drawingConfig.heightMargin.toString();
		this.iconColorContainerEl.value = drawingConfig.iconColor;
		this.backgroundColorContainerEl.value = drawingConfig.backgroundColor;
		this.backgroundShapeContainerEl.value = drawingConfig.backgroundShape;
	}

	static getDrawingConfig() {
		/** @type {import("../type.d.js").DrawingConfig} */
		const drawingConfig = {
			iconName: this.iconNameContainerEl.value,
			widthFinal: parseInt(this.widthFinalContainerEl.value),
			heightFinal: parseInt(this.heightFinalContainerEl.value),
			widthMargin: parseFloat(this.widthMarginContainerEl.value),
			heightMargin: parseFloat(this.heightMarginContainerEl.value),
			iconColor: this.iconColorContainerEl.value,
			backgroundColor: this.backgroundColorContainerEl.value,
			backgroundShape: /** @type {import("../type.d.js").BackgroundShape} */(this.backgroundShapeContainerEl.value),
		}
		return drawingConfig;
	}
}