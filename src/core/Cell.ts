import { Colour, BLACK, VOID } from "../libraries/colour"
import type { Vector2 } from "../libraries/vector"
import { shared } from "../game"

export interface Bounds {
	left: number
	right: number
	top: number
	bottom: number
}

const BORDER_WIDTH = 1

const getPixelIndex = (image: ImageData, x: number, y: number) => (x + y * image.width) * 4

export class Cell {
	birth: number
	colour: Colour = BLACK
	splash = BLACK.splash
	bounds: Bounds = { left: 0, right: 1, top: 0, bottom: 1 }
	position: Vector2
	dimensions: Vector2

	constructor(options: Partial<Pick<Cell, "colour" | "bounds">> = {}) {
		Object.assign(this, options)

		this.birth = shared.clock
		this.splash = this.colour.splash
		this.position = [this.bounds.left, this.bounds.top]

		const width = this.bounds.right - this.bounds.left
		const height = this.bounds.bottom - this.bounds.top
		this.dimensions = [width, height]

		// Check for rounding errors
		const { left, right, top, bottom } = this.bounds
		if (left + width !== right || right - width !== left || top + height !== bottom || bottom - height !== top) {
			console.error("Cell bounds are not consistent with dimensions", this.bounds, this.dimensions)
		}
	}

	clear(image: ImageData) {
		const { colour } = this
		this.colour = VOID
		this.draw(image)
		this.colour = colour
	}

	draw(image: ImageData) {
		const [x, y] = [this.position[0] * image.width, this.position[1] * image.height]
		const [width, height] = [this.dimensions[0] * image.width, this.dimensions[1] * image.height]

		const left = Math.floor(x)
		const right = Math.floor(x + width)
		const top = Math.floor(y)
		const bottom = Math.floor(y + height)

		const drawnWidth = right - left

		let i = getPixelIndex(image, left, top)

		// Set the image data of every pixel in the cell, with a void-coloured border
		for (let y = top; y <= bottom; y++) {
			for (let x = left; x <= right; x++) {
				const isBorder =
					x < left + BORDER_WIDTH ||
					x > right - BORDER_WIDTH ||
					y < top + BORDER_WIDTH ||
					y > bottom - BORDER_WIDTH

				const colour = isBorder ? VOID : this.colour

				image.data[i + 0] = colour.red
				image.data[i + 1] = colour.green
				image.data[i + 2] = colour.blue
				i += 4
			}
			i += (image.width - drawnWidth - 1) * 4
		}
	}
}
