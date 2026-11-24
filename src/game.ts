import { View } from "./libraries/camera"
import { AIR_SPLASH } from "./elements/air"
import { recolour } from "./sugar"
import { GREY, VOID, YELLOW, type Colour } from "./libraries/colour"
import { ELEMENTS } from "./element"
import { World } from "./core/World"
import { Stage } from "./libraries/stage"
import { wrap } from "./libraries/math"
import { getPointer } from "./libraries/pointer"
import { scale } from "./libraries/vector"

export const shared = {
	clock: 0,
	brush: {
		colour: YELLOW as Colour,
	},
}

export const global = {
	world: new World({ colour: GREY }),
	camera: new View(),
	image: undefined as ImageData | undefined,
}

// Set the alpha channel of every pixel
const setImageAlpha = (image: ImageData, alpha: number) => {
	for (let i = 3; i < image.data.length; i += 4) {
		image.data[i] = alpha
	}
}

//===========//
// GAME LOOP //
//===========//
const stage = Stage({ speed: 2.0, paused: false })

stage.start = ({ canvas }) => {
	canvas.style.backgroundColor = VOID.toString()
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
	const { image, camera } = global
	if (image === undefined) return
	const [x, y] = camera.get([0, 0])

	console.log("cells:", global.world.cells.size)

	context.clearRect(0, 0, context.canvas.width, context.canvas.height)
	context.putImageData(image, x, y)
}

stage.update = () => {
	const { world, image, camera } = global
	if (image === undefined) return

	shared.clock = wrap(shared.clock + 1, 0, 999)

	// Update cells
	for (const cell of world.cells) {
		if (cell.birth === shared.clock) continue

		const element = ELEMENTS.get(cell.colour.splash)
		if (element?.update === undefined) continue

		for (const newCell of element.update(cell, world)) {
			newCell.draw(image)
		}
	}

	// Place cells with the pointer
	const pointer = getPointer()
	if (pointer.down && pointer.position !== undefined) {
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

// Expose state on window for debugging in the console
Object.assign(window, global)
Object.assign(window, shared)
