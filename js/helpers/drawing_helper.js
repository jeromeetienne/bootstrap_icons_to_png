export default class DrawingHelper {


	/**
	 * 
	 * @param {string} iconName 
	 * @param {object} partialOptions
	 * @param {number=} partialOptions.width
	 * @param {number=} partialOptions.height
	 * @param {string=} partialOptions.fill
	 */
	static async getSvgImageEl(iconName, partialOptions = {}) {
		const options = {
			width: partialOptions.width ?? 512,
			height: partialOptions.height ?? 512,
			fill: partialOptions.fill ?? 'orange',
		}

		// fetch the icons.svg
		const iconsSvgUrl = `./vendor/bootstrap/bootstrap-icons.svg`;
		const response = await fetch(iconsSvgUrl);
		const iconsSvgContent = await response.text();

		// get the icon svg within the icons.svg
		const svgIconsEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svgIconsEl.innerHTML = iconsSvgContent; // Replace with the SVG content
		const svgSymbolEl = svgIconsEl.getElementById(iconName);

		const svgContent = /* html */`
			<svg xmlns="http://www.w3.org/2000/svg" width="${options.width}" height="${options.height}" fill="${options.fill}" viewBox="0 0 16 16">
				${svgSymbolEl.innerHTML}
			</svg>
		`
		const svgImageEl = await DrawingHelper.svgContentToLoadedImageEl(svgContent);
		return svgImageEl;
	}

	/**
	 * @param {string} svgContent 
	 */
	static async svgContentToLoadedImageEl(svgContent) {
		return new Promise((resolve, reject) => {
			const blob = new Blob([svgContent], { type: 'image/svg+xml' });
			const imageEl = document.createElement('img');

			imageEl.src = URL.createObjectURL(blob);
			// imageEl.style.width = '100%';
			// imageEl.style.height = '100%';

			imageEl.addEventListener('load', () => {
				resolve(imageEl);
			})
		})
	}

	/**
	 * 
	 * @param {HTMLCanvasElement} canvasEl 
	 */
	static async canvasToBlobUrl(canvasEl) {
		return new Promise((resolve, reject) => {
			canvasEl.toBlob((blob) => {
				if (blob === null) throw new Error('blob is null');

				const blobUrl = URL.createObjectURL(blob);
				resolve(blobUrl);
			}, 'image/png', 1);
		})
	}

	/**
	 * 
	 * @param {HTMLCanvasElement} canvasEl 
	 * @param {string} fillStyle 
	 */
	static async drawBackgroundCircle(canvasEl, fillStyle) {
		const context2d = /** @type {CanvasRenderingContext2D} */(canvasEl.getContext('2d'))
		context2d.fillStyle = fillStyle;
		// Draw a circle with a radius of 50 at the center of the canvas
		context2d.beginPath();
		const radius = Math.min(canvasEl.width, canvasEl.height) / 2;
		context2d.arc(canvasEl.width / 2, canvasEl.height / 2, radius, 0, 2 * Math.PI);
		context2d.fill();
	}

	/**
	 * 
	 * @param {HTMLCanvasElement} canvasEl 
	 * @param {string} fillStyle 
	 */
	static async drawBackgroundRect(canvasEl, fillStyle) {
		const context2d = /** @type {CanvasRenderingContext2D} */(canvasEl.getContext('2d'))
		context2d.fillStyle = fillStyle;
		// context2d.fillRect(0, 0, canvasEl.width, canvasEl.height);
		context2d.beginPath();
context2d.roundRect(0, 0, canvasEl.width, canvasEl.height, [canvasEl.width*0.2]);
context2d.fill();
	}

	/**
	 * 
	 * @param {HTMLCanvasElement} canvasEl 
	 * @param {HTMLImageElement} imageEl 
	 */
	static async drawImageInCenter(canvasEl, imageEl) {
		const context2d = /** @type {CanvasRenderingContext2D} */(canvasEl.getContext('2d'))
		context2d.drawImage(imageEl, (canvasEl.width - imageEl.width) / 2, (canvasEl.height - imageEl.height) / 2);
	}
}