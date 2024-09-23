
import MainHelper from "./helpers/main_helper.js";
import UiHelper from "./helpers/ui_helper.js";

// class MainHelper {
// 	/**
//  * 
//  * @param {import("./type.d").DrawingConfig} drawingConfig 
//  */
// 	static async draw(drawingConfig) {
// 		///////////////////////////////////////////////////////////////////////////////
// 		///////////////////////////////////////////////////////////////////////////////
// 		//	
// 		///////////////////////////////////////////////////////////////////////////////
// 		///////////////////////////////////////////////////////////////////////////////



// 		const svgImageEl = await DrawingHelper.getSvgImageEl(drawingConfig.iconName, {
// 			width: drawingConfig.widthFinal * (1 - drawingConfig.widthMargin * 2),
// 			height: drawingConfig.heightFinal * (1 - drawingConfig.heightMargin * 2),
// 			fill: drawingConfig.iconColor
// 		});

// 		///////////////////////////////////////////////////////////////////////////////
// 		///////////////////////////////////////////////////////////////////////////////
// 		//	
// 		///////////////////////////////////////////////////////////////////////////////
// 		///////////////////////////////////////////////////////////////////////////////

// 		// create a canvas element
// 		const canvasEl = /** @type {HTMLCanvasElement} */(document.querySelector('#canvasContainer'))
// 		canvasEl.width = drawingConfig.widthFinal;
// 		canvasEl.height = drawingConfig.heightFinal;

// 		// Draw background
// 		// await DrawingHelper.drawBackgroundCircle(canvasEl, drawingConfig.backgroundColor);
// 		// await DrawingHelper.drawBackgroundRect(canvasEl, drawingConfig.backgroundColor);

// 		await DrawingHelper.drawImageInCenter(canvasEl, svgImageEl);
// 	}

// 	static async getIconNames() {

// 		// fetch the icons.svg
// 		const iconsSvgUrl = `./vendor/bootstrap/bootstrap-icons.svg`;
// 		const response = await fetch(iconsSvgUrl);
// 		const iconsSvgContent = await response.text();

// 		// get the icon svg within the icons.svg
// 		const svgIconsEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
// 		svgIconsEl.innerHTML = iconsSvgContent; // Replace with the SVG content


// 		const symbolEls = Array.from(svgIconsEl.querySelectorAll('symbol'))
// 		const iconNames = []
// 		for (const symbolEl of symbolEls) {
// 			const iconName = /** @type {string} */(symbolEl.getAttribute('id'))
// 			iconNames.push(iconName)
// 		}

// 		return iconNames
// 	}

// }

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//	class drawingHelper
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// class DrawingHelper {


// 	/**
// 	 * 
// 	 * @param {string} iconName 
// 	 * @param {object} partialOptions
// 	 * @param {number=} partialOptions.width
// 	 * @param {number=} partialOptions.height
// 	 * @param {string=} partialOptions.fill
// 	 */
// 	static async getSvgImageEl(iconName, partialOptions = {}) {
// 		const options = {
// 			width: partialOptions.width ?? 512,
// 			height: partialOptions.height ?? 512,
// 			fill: partialOptions.fill ?? 'orange',
// 		}

// 		// fetch the icons.svg
// 		const iconsSvgUrl = `./vendor/bootstrap/bootstrap-icons.svg`;
// 		const response = await fetch(iconsSvgUrl);
// 		const iconsSvgContent = await response.text();

// 		// get the icon svg within the icons.svg
// 		const svgIconsEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
// 		svgIconsEl.innerHTML = iconsSvgContent; // Replace with the SVG content
// 		const svgSymbolEl = svgIconsEl.getElementById(iconName);

// 		const svgContent = /* html */`
// 			<svg xmlns="http://www.w3.org/2000/svg" width="${options.width}" height="${options.height}" fill="${options.fill}" viewBox="0 0 16 16">
// 				${svgSymbolEl.innerHTML}
// 			</svg>
// 		`
// 		const svgImageEl = await DrawingHelper.svgContentToLoadedImageEl(svgContent);
// 		return svgImageEl;
// 	}

// 	/**
// 	 * @param {string} svgContent 
// 	 */
// 	static async svgContentToLoadedImageEl(svgContent) {
// 		return new Promise((resolve, reject) => {
// 			const blob = new Blob([svgContent], { type: 'image/svg+xml' });
// 			const imageEl = document.createElement('img');

// 			imageEl.src = URL.createObjectURL(blob);
// 			// imageEl.style.width = '100%';
// 			// imageEl.style.height = '100%';

// 			imageEl.addEventListener('load', () => {
// 				resolve(imageEl);
// 			})
// 		})
// 	}

// 	/**
// 	 * 
// 	 * @param {HTMLCanvasElement} canvasEl 
// 	 */
// 	static async canvasToBlobUrl(canvasEl) {
// 		return new Promise((resolve, reject) => {
// 			canvasEl.toBlob((blob) => {
// 				if (blob === null) throw new Error('blob is null');

// 				const blobUrl = URL.createObjectURL(blob);
// 				resolve(blobUrl);
// 			}, 'image/png', 1);
// 		})
// 	}

// 	/**
// 	 * 
// 	 * @param {HTMLCanvasElement} canvasEl 
// 	 * @param {string} fillStyle 
// 	 */
// 	static async drawBackgroundCircle(canvasEl, fillStyle) {
// 		const context2d = /** @type {CanvasRenderingContext2D} */(canvasEl.getContext('2d'))
// 		context2d.fillStyle = fillStyle;
// 		// Draw a circle with a radius of 50 at the center of the canvas
// 		context2d.beginPath();
// 		const radius = Math.min(canvasEl.width, canvasEl.height) / 2;
// 		context2d.arc(canvasEl.width / 2, canvasEl.height / 2, radius, 0, 2 * Math.PI);
// 		context2d.fill();
// 	}

// 	/**
// 	 * 
// 	 * @param {HTMLCanvasElement} canvasEl 
// 	 * @param {string} fillStyle 
// 	 */
// 	static async drawBackgroundRect(canvasEl, fillStyle) {
// 		const context2d = /** @type {CanvasRenderingContext2D} */(canvasEl.getContext('2d'))
// 		context2d.fillStyle = fillStyle;
// 		context2d.fillRect(0, 0, canvasEl.width, canvasEl.height);
// 	}

// 	/**
// 	 * 
// 	 * @param {HTMLCanvasElement} canvasEl 
// 	 * @param {HTMLImageElement} imageEl 
// 	 */
// 	static async drawImageInCenter(canvasEl, imageEl) {
// 		const context2d = /** @type {CanvasRenderingContext2D} */(canvasEl.getContext('2d'))
// 		context2d.drawImage(imageEl, (canvasEl.width - imageEl.width) / 2, (canvasEl.height - imageEl.height) / 2);
// 	}
// }

// class UiHelper {
// 	static iconNameContainerEl = /** @type {HTMLInputElement} */(document.querySelector('#iconNameContainer'))
// 	static widthFinalContainerEl = /** @type {HTMLInputElement} */(document.querySelector('#widthFinalContainer'))
// 	static heightFinalContainerEl = /** @type {HTMLInputElement} */(document.querySelector('#heightFinalContainer'))
// 	static widthMarginContainerEl = /** @type {HTMLInputElement} */(document.querySelector('#widthMarginContainer'))
// 	static heightMarginContainerEl = /** @type {HTMLInputElement} */(document.querySelector('#heightMarginContainer'))
// 	static iconColorContainerEl = /** @type {HTMLInputElement} */(document.querySelector('#iconColorContainer'))
// 	static backgroundColorContainerEl = /** @type {HTMLInputElement} */(document.querySelector('#backgroundColorContainer'))

// 	/**
// 	 * 
// 	 * @param {()=>Promise<void>} onChangeCallback 
// 	 */
// 	static async onChange(onChangeCallback) {
// 		this.iconNameContainerEl.addEventListener('input', onChangeCallback);
// 		this.widthFinalContainerEl.addEventListener('input', onChangeCallback);
// 		this.heightFinalContainerEl.addEventListener('input', onChangeCallback);
// 		this.widthMarginContainerEl.addEventListener('input', onChangeCallback);
// 		this.heightMarginContainerEl.addEventListener('input', onChangeCallback);
// 		this.iconColorContainerEl.addEventListener('input', onChangeCallback);
// 		this.backgroundColorContainerEl.addEventListener('input', onChangeCallback);
// 	}

// 	/**
// 	 * 
// 	 * @param {import("./type.d").DrawingConfig} drawingConfig 
// 	 */
// 	static setDrawingConfig(drawingConfig) {
// 		this.widthFinalContainerEl.value = drawingConfig.widthFinal.toString();
// 		this.heightFinalContainerEl.value = drawingConfig.heightFinal.toString();
// 		this.iconNameContainerEl.value = drawingConfig.iconName;
// 		this.widthMarginContainerEl.value = drawingConfig.widthMargin.toString();
// 		this.heightMarginContainerEl.value = drawingConfig.heightMargin.toString();
// 		this.iconColorContainerEl.value = drawingConfig.iconColor;
// 		this.backgroundColorContainerEl.value = drawingConfig.backgroundColor;
// 	}

// 	static getDrawingConfig() {
// 		/** @type {import("./type.d").DrawingConfig} */
// 		const drawingConfig = {
// 			iconName: this.iconNameContainerEl.value,
// 			widthFinal: parseInt(this.widthFinalContainerEl.value),
// 			heightFinal: parseInt(this.heightFinalContainerEl.value),
// 			widthMargin: parseFloat(this.widthMarginContainerEl.value),
// 			heightMargin: parseFloat(this.heightMarginContainerEl.value),
// 			// iconColor: 'black',
// 			iconColor: this.iconColorContainerEl.value,
// 			backgroundColor: this.backgroundColorContainerEl.value,
// 		}
// 		return drawingConfig;
// 	}

// 	static async updateDownloadButton() {

// 		const canvasEl = /** @type {HTMLCanvasElement} */(document.querySelector('#canvasContainer'));
// 		const blobUrl = await DrawingHelper.canvasToBlobUrl(canvasEl);
// 		const downloadButtonEl = /** @type {HTMLAnchorElement} */(document.querySelector('#downloadButtonContainer'));
// 		downloadButtonEl.href = blobUrl;

// 		const drawingConfig = this.getDrawingConfig();

// 		const fileName = `icon-${drawingConfig.iconName}-${drawingConfig.widthFinal}x${drawingConfig.heightFinal}.png`;
// 		downloadButtonEl.download = fileName;
// 	}
// }

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//	
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

async function mainAsync() {
await UiHelper.init();
	const iconNames = await MainHelper.getIconNames();

	for (const iconName of iconNames) {
		const htmlContent = /* html */`
			<option value="${iconName}">${iconName}</option>
		`
		const optionEl = /** @type {HTMLDivElement} */(new DOMParser().parseFromString(htmlContent, 'text/html').body.firstChild)
		// add the element to the container
		UiHelper.iconNameContainerEl.appendChild(optionEl);
	}
	console.log(iconNames);


	/** @type {import("./type.d").DrawingConfig} */
	const drawingConfig = {
		iconName: 'robot',
		widthFinal: 512,
		heightFinal: 512,
		widthMargin: 0.0,
		heightMargin: 0.15,
		iconColor: '#000000',
		backgroundColor: '#ffffff',
		backgroundShape: 'none',
	}

	await UiHelper.setDrawingConfig(drawingConfig);

	await MainHelper.draw(drawingConfig);
	await MainHelper.updateDownloadButton();

	await UiHelper.onChange(async () => {
		const drawingConfig = UiHelper.getDrawingConfig();
		await MainHelper.draw(drawingConfig);

		await MainHelper.updateDownloadButton();
	})
}

await mainAsync();
export default {}