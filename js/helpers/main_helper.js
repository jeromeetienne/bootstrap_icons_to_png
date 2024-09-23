import DrawingHelper from "./drawing_helper.js";
import UiHelper from "./ui_helper.js";

export default class MainHelper {
	/**
 * 
 * @param {import("../type.d.js").DrawingConfig} drawingConfig 
 */
	static async draw(drawingConfig) {
		///////////////////////////////////////////////////////////////////////////////
		///////////////////////////////////////////////////////////////////////////////
		//	
		///////////////////////////////////////////////////////////////////////////////
		///////////////////////////////////////////////////////////////////////////////

		const svgImageEl = await DrawingHelper.getSvgImageEl(drawingConfig.iconName, {
			width: drawingConfig.widthFinal * (1 - drawingConfig.widthMargin * 2),
			height: drawingConfig.heightFinal * (1 - drawingConfig.heightMargin * 2),
			fill: drawingConfig.iconColor
		});

		///////////////////////////////////////////////////////////////////////////////
		///////////////////////////////////////////////////////////////////////////////
		//	
		///////////////////////////////////////////////////////////////////////////////
		///////////////////////////////////////////////////////////////////////////////

		// create a canvas element
		const canvasEl = /** @type {HTMLCanvasElement} */(document.querySelector('#canvasContainer'))
		canvasEl.width = drawingConfig.widthFinal;
		canvasEl.height = drawingConfig.heightFinal;

		// Draw background
		if (drawingConfig.backgroundShape === 'circle') {
			await DrawingHelper.drawBackgroundCircle(canvasEl, drawingConfig.backgroundColor);
		} else if (drawingConfig.backgroundShape === 'rectangle') {
			await DrawingHelper.drawBackgroundRect(canvasEl, drawingConfig.backgroundColor);
		} else if (drawingConfig.backgroundShape === 'none') {
			// nothing on purpose
		} else {
			throw new Error(`unknown backgroundShape ${drawingConfig.backgroundShape}`)
		}

		await DrawingHelper.drawImageInCenter(canvasEl, svgImageEl);
	}

	static async getIconNames() {

		// fetch the icons.svg
		const iconsSvgUrl = `./vendor/bootstrap/bootstrap-icons.svg`;
		const response = await fetch(iconsSvgUrl);
		const iconsSvgContent = await response.text();

		// get the icon svg within the icons.svg
		const svgIconsEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svgIconsEl.innerHTML = iconsSvgContent; // Replace with the SVG content


		const symbolEls = Array.from(svgIconsEl.querySelectorAll('symbol'))
		const iconNames = []
		for (const symbolEl of symbolEls) {
			const iconName = /** @type {string} */(symbolEl.getAttribute('id'))
			iconNames.push(iconName)
		}

		return iconNames
	}

	static async updateDownloadButton() {

		const canvasEl = /** @type {HTMLCanvasElement} */(document.querySelector('#canvasContainer'));
		const blobUrl = await DrawingHelper.canvasToBlobUrl(canvasEl);
		const downloadButtonEl = /** @type {HTMLAnchorElement} */(document.querySelector('#downloadButtonContainer'));
		downloadButtonEl.href = blobUrl;

		const drawingConfig = UiHelper.getDrawingConfig();

		const fileName = `icon-${drawingConfig.iconName}-${drawingConfig.widthFinal}x${drawingConfig.heightFinal}.png`;
		downloadButtonEl.download = fileName;
	}

}
