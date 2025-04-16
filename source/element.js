const ELEMENTS = new Map()

const pointer = getPointer()

on(
	"keydown",
	(event) => {
		for (const [splash, element] of ELEMENTS) {
			if (element.key.includes(event.key)) {
				shared.brush.colour = new Splash(splash).d
				return
			}
		}
	},
	{ passive: false },
)

const FALL_SPEED = 1 / 128
const MIN_SIZE = 1 / 256

const POINTER_RADIUS = 0.0 //0.03
const POINTER_FADE_RADIUS = 0.0 //0.1
const POINTER_CELL_SIZE = 1 / 4 //1 / 256
let AIR_TARGET = 1 / 32

const getPointerAirTarget = (cell) => {
	if (pointer.position.x === undefined) {
		return AIR_TARGET
	}

	const pointerPosition = camera.cast(scale(pointer.position, devicePixelRatio))
	const distanceFromPointer = distanceToBounds(pointerPosition, cell.bounds)

	if (distanceFromPointer < POINTER_RADIUS) {
		return POINTER_CELL_SIZE
	} else if (distanceFromPointer < POINTER_FADE_RADIUS) {
		return lerp([POINTER_CELL_SIZE, 1], distanceFromPointer - POINTER_RADIUS)
	}

	return AIR_TARGET
}

const SOLID = new Set([YELLOW.splash, ORANGE.splash, GREEN.splash, SILVER.splash])
