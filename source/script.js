//========//
// SHARED //
//========//
const shared = {
	clock: 0,
	brush: {
		colour: YELLOW,
	},
}

//------ NO SHARED CREATED BELOW THIS LINE ------//

//======//
// CELL //
//======//
const Cell = class {
	constructor(options = {}) {
		// Properties
		Object.assign(this, {
			bounds: {
				left: 0.0,
				right: 1.0,
				top: 0.0,
				bottom: 1.0,
			},
			colour: BLACK,
			...options,
		})

		// Internal
		this.birth = shared.clock

		// Caches
		this.splash = this.colour.splash

		const x = this.bounds.left
		const y = this.bounds.top
		this.position = [x, y]

		const width = this.bounds.right - this.bounds.left
		const height = this.bounds.bottom - this.bounds.top
		this.dimensions = [width, height]

		// Check for rounding errors
		const widthTest1 = this.bounds.left + width === this.bounds.right
		const widthTest2 = this.bounds.right - width === this.bounds.left

		const heightTest1 = this.bounds.top + height === this.bounds.bottom
		const heightTest2 = this.bounds.bottom - height === this.bounds.top

		if (!widthTest1) {
			console.error("Cell bounds are not consistent with dimensions", this.bounds.left + width, this.bounds.right)
		}

		if (!widthTest2) {
			console.error("Cell bounds are not consistent with dimensions", this.bounds.right - width, this.bounds.left)
		}

		if (!heightTest1) {
			console.error(
				"Cell bounds are not consistent with dimensions",
				this.bounds.top + height,
				this.bounds.bottom,
			)
		}

		if (!heightTest2) {
			console.error(
				"Cell bounds are not consistent with dimensions",
				this.bounds.bottom - height,
				this.bounds.top,
			)
		}
	}

	clear(image) {
		const { colour } = this
		this.colour = VOID
		this.draw(image)
		this.colour = colour
	}

	draw(image) {
		const [x, y] = [this.position.x * image.width, this.position.y * image.height]
		const [width, height] = [this.dimensions[0] * image.width, this.dimensions[1] * image.height]

		const left = Math.floor(x)
		const right = Math.floor(x + width)
		const top = Math.floor(y)
		const bottom = Math.floor(y + height)

		const drawnWidth = right - left
		const drawnHeight = bottom - top

		let i = getPixelIndex(image, left, top)

		// Set the image data of every pixel in the cell
		// The border is 1 pixel thick and void coloured
		let BORDER_WIDTH = Math.min(1, Math.min(drawnWidth, drawnHeight) / 10)
		if (BORDER_WIDTH < 1) {
			if (BORDER_WIDTH > 0.4) {
				BORDER_WIDTH = 1
			} else {
				BORDER_WIDTH = 1
			}
		}

		const area = this.dimensions[0] * this.dimensions[1]

		//const fillColour = lerp([[0, 0, 0], GREEN], area ** 0.25).map((v) => Math.floor(v))
		const fillColour = this.colour

		for (let y = top; y <= bottom; y++) {
			for (let x = left; x <= right; x++) {
				const isBorder =
					BORDER_WIDTH > 0 &&
					(x < left + BORDER_WIDTH ||
						x > right - BORDER_WIDTH ||
						y < top + BORDER_WIDTH ||
						y > bottom - BORDER_WIDTH)

				const colour = isBorder ? VOID : fillColour

				image.data[i + 0] = colour[0]
				image.data[i + 1] = colour[1]
				image.data[i + 2] = colour[2]
				i += 4
			}
			i += (image.width - drawnWidth - 1) * 4
		}
	}
}

//=======//
// IMAGE //
//=======//
const getPixelIndex = (image, x, y) => {
	return (x + y * image.width) * 4
}

// Function that sets the alpha channel of every pixel
const setImageAlpha = (image, alpha) => {
	for (let i = 3; i < image.data.length; i += 4) {
		image.data[i] = alpha
	}
}

//=======//
// WORLD //
//=======//
class World {
	constructor({ colour = BLACK } = {}) {
		// Properties
		this.cells = new Set()

		// Caches
		this.caches = {
			left: new Map(),
			right: new Map(),
			top: new Map(),
			bottom: new Map(),
		}

		// Setup
		this.add(new Cell({ colour }))
	}

	add(cell) {
		this.cells.add(cell)
		this.cache(cell)
	}

	delete(cell) {
		this.cells.delete(cell)
		this.uncache(cell)
	}

	cache(cell) {
		for (const key in DIRECTION) {
			const cache = this.caches[key]
			const address = cell.bounds[key]
			let set = cache.get(address)
			if (set === undefined) {
				set = new Set()
				cache.set(address, set)
			}
			set.add(cell)
		}
	}

	uncache(cell) {
		for (const key in DIRECTION) {
			const cache = this.caches[key]
			const address = cell.bounds[key]
			const set = cache.get(address)
			set.delete(cell)
			if (set.size === 0) {
				cache.delete(address)
			}
		}
	}

	draw(image) {
		for (const cell of this.cells) {
			cell.draw(image)
		}
	}

	replace(cells, newCells) {
		for (const cell of cells) {
			this.delete(cell)
		}
		for (const newCell of newCells) {
			newCell.birth = shared.clock
			this.add(newCell)
		}
		return newCells
	}

	pick(position) {
		const [x, y] = position
		for (const cell of this.cells) {
			const [left, top] = cell.position
			const [right, bottom] = [left + cell.dimensions[0], top + cell.dimensions[1]]

			if (x >= left && x <= right && y >= top && y <= bottom) {
				return cell
			}
		}
	}
}

//========//
// COLOUR //
//========//
const getSplashDigits = (splash) => {
	const chars = splash.toString().padStart(3, "0").split("")
	const digits = chars.map((v) => parseInt(v))
	return digits
}

const mutateSplash = (splash) => {
	const digits = getSplashDigits(splash)
	digits[0] = clamp(digits[0] + randomFrom([0, -1, -1]), 0, 9)
	digits[1] = clamp(digits[1] + randomFrom([-1, 0, 1]), 0, 9)
	digits[2] = clamp(digits[2] + randomFrom([-1, 0, 1]), 0, 9)
	return parseInt(digits.join(""))
}

//===========//
// DIRECTION //
//===========//
const DIRECTION = {
	left: {
		name: "left",
		min: "top",
		max: "bottom",
		axis: "x",
		dimensionNumber: 1,
		sign: -1,
	},
	right: {
		name: "right",
		min: "top",
		max: "bottom",
		axis: "x",
		dimensionNumber: 1,
		sign: 1,
	},
	top: {
		name: "top",
		min: "left",
		max: "right",
		axis: "y",
		dimensionNumber: 0,
		sign: -1,
	},
	bottom: {
		name: "bottom",
		min: "left",
		max: "right",
		axis: "y",
		dimensionNumber: 0,
		sign: 1,
	},
}

DIRECTION.left.opposite = DIRECTION.right
DIRECTION.right.opposite = DIRECTION.left
DIRECTION.top.opposite = DIRECTION.bottom
DIRECTION.bottom.opposite = DIRECTION.top

DIRECTION.left.adjacent = DIRECTION.top
DIRECTION.right.adjacent = DIRECTION.bottom
DIRECTION.top.adjacent = DIRECTION.right
DIRECTION.bottom.adjacent = DIRECTION.left

const AXIS = {
	x: {
		name: "x",
		min: "top",
		max: "bottom",
		edges: ["left", "right"],
		dimensionNumber: 1,
		sign: 1,
	},
	y: {
		name: "y",
		min: "left",
		max: "right",
		edges: ["top", "bottom"],
		dimensionNumber: 0,
		sign: 1,
	},
}

AXIS.x.opposite = AXIS.x
AXIS.y.opposite = AXIS.y

AXIS.x.adjacent = AXIS.y
AXIS.y.adjacent = AXIS.x

//------ NO GLOBALS USED ABOVE THIS LINE ------//

//========//
// GLOBAL //
//========//
const global = {
	world: new World({ colour: GREY }),
	camera: new View(),
	image: undefined,
}

//===========//
// GAME LOOP //
//===========//
const stage = new Stage({ speed: 2.0, paused: false })

stage.start = (context) => {
	const { canvas } = context
	canvas.style["background-color"] = VOID
}

stage.resize = (context) => {
	const { world, camera } = global
	const { canvas } = context

	// Resize camera
	const size = Math.min(canvas.width, canvas.height)
	camera.resize([size, size])

	// Resize image
	const image = context.createImageData(size, size)
	setImageAlpha(image, 255)
	global.image = image

	// Redraw world
	world.draw(image)
	const [x, y] = camera.get([0, 0])
	context.putImageData(image, x, y)
}

stage.tick = (context) => {
	const { canvas } = context
	const { image, camera } = global
	const [x, y] = camera.get([0, 0])

	// debug: redraw entire world
	//global.world.draw(image)

	context.clearRect(0, 0, canvas.width, canvas.height)
	context.putImageData(image, x, y)
}

stage.update = (context) => {
	const { world, image, camera } = global

	shared.clock = wrap(shared.clock + 1, 0, 999)

	// Update cells
	for (const cell of world.cells) {
		if (cell.birth === shared.clock) {
			continue
		}

		const element = ELEMENTS.get(cell.colour.splash)

		if (element === undefined) {
			continue
		}

		if (element.update !== undefined) {
			const newCells = element.update(cell, world)
			for (const newCell of newCells) {
				newCell.draw(image)
			}
		}
	}

	// Place cells with the pointer
	const pointer = getPointer()
	if (pointer.down) {
		const colour = shared.brush.colour
		const cell = world.pick(camera.cast(scale(pointer.position, devicePixelRatio)))
		const canWrite = cell && (colour.splash === AIR_SPLASH || cell.colour.splash === AIR_SPLASH)
		if (canWrite) {
			const newCell = recolour(cell, colour)
			world.replace([cell], [newCell])
			cell.clear(image)
			newCell.draw(image)
		}
	}
}

Object.assign(window, global)
Object.assign(window, shared)
