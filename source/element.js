const ELEMENTS = new Map()

const pointer = getPointer()

on(
	"keydown",
	(event) => {
		for (const [splash, element] of ELEMENTS) {
			if (element.key.includes(event.key)) {
				shared.brush.colour = new Splash(splash)
				return
			}
		}
	},
	{ passive: false },
)

const POINTER_RADIUS = 0.03 //0.03
const POINTER_FADE_RADIUS = 0.1 //0.1
const POINTER_CELL_SIZE = 1 / 128 //1 / 256
let AIR_TARGET = 1 / 1
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

// Debug: Adjust AIR_TARGET based on pointer y position
/*on("pointermove", (event) => {
	const y = event.clientY / window.innerHeight
	const target = lerp([0.00001, 0.5], clamp(y, 0, Infinity))
	AIR_TARGET = target
})*/

const AIR_SPLASH = GREY.splash
ELEMENTS.set(AIR_SPLASH, {
	name: "Air",
	key: ["a", "1"],
	update: (cell, world) => {
		const target = getPointerAirTarget(cell)
		const dimensionErrorScale = cell.dimensions.map((v) => v / target)

		// Function that finds the error of all cells from their target size
		const judge = (cells) => {
			let errors = []

			for (const cell of cells) {
				const target = getPointerAirTarget(cell)
				const dimensionErrorScale = cell.dimensions.map((v) => v / target)
				const dimensionErrorDiff = dimensionErrorScale.map((v) => Math.abs(1 - v))
				const errorDiff = Math.max(dimensionErrorDiff[0], dimensionErrorDiff[1])
				errors.push(errorDiff)
			}

			const sum = errors.reduce((a, b) => a + b, 0)
			const average = sum / errors.length
			const score = -average
			return score
		}

		const filter = (cell) => {
			const age = shared.clock - cell.birth
			return age > 5
		}

		const compareSplit = (a, b = -Infinity) => {
			return a >= b
		}

		const compare = (a, b = -Infinity) => {
			return a >= b
		}

		// If a cell is too big, try to split it
		const veryTooWide = dimensionErrorScale[0] >= 2.0
		const veryTooTall = dimensionErrorScale[1] >= 2.0
		if (veryTooWide || veryTooTall) {
			const columns = veryTooTall ? 2 : 1
			const rows = veryTooWide ? 2 : 1
			const splitCells = split(cell, [columns, rows])

			// Judge the split cells and use them if they're better
			const splitScores = judge(splitCells)
			const originalScores = judge([cell])
			if (compareSplit(splitScores, originalScores)) {
				return world.replace([cell], splitCells)
			}
		}

		// If a cell is too small, try to sleep it
		const tooThin = dimensionErrorScale[1] < 1.0
		const tooShort = dimensionErrorScale[0] < 1.0
		if (tooThin && tooShort) {
			return tryToSleep(cell, world, { judge, compare, filter })
		}

		if (tooThin) {
			const result = tryToSleep(cell, world, { edges: ["top", "bottom"], judge, compare, filter })
			if (result.length > 0) {
				return result
			}
		}

		if (tooShort) {
			const result = tryToSleep(cell, world, { edges: ["left", "right"], judge, compare, filter })
			if (result.length > 0) {
				return result
			}
		}

		return []
	},
})

const FALL_SPEED = 1 / 256

ELEMENTS.set(YELLOW.splash, {
	name: "Sand",
	key: ["s", "2"],
	update: (cell, world) => {
		const edge = "top"
		const below = pickSnips(cell, world, edge, FALL_SPEED)

		if (below.snips.length === 0) {
			return tryToSleep(cell, world)
		}

		// If there isn't solid below, fall
		if (below.snips.every((c) => !SOLID.has(c.colour))) {
			//const above = pickSnips(cell, world, "top", FALL_SPEED)
			let sand = cell
			//if (above.snips.length > 0 && above.snips.every((v) => v.colour === YELLOW)) {
			//sand = merge([cell, ...above.snips])
			//}

			const movedCells = swapSnips(sand, below.snips, edge)
			//return world.replace([cell, ...below.contacts], [cell, ...below.excesses, ...below.snips])
			return world.replace([cell, ...below.contacts], [...below.excesses, ...movedCells])
		}

		return tryToSleep(cell, world)
	},
})

ELEMENTS.set(ORANGE.splash, {
	name: "Wood",
	key: ["w", "4"],
})

ELEMENTS.set(RED.splash, {
	name: "Fire",
	key: ["f", "5"],
})

ELEMENTS.set(GREEN.splash, {
	name: "Plant",
	key: ["p", "7"],
})

ELEMENTS.set(BLUE.splash, {
	name: "Water",
	key: ["w", "3"],
})

ELEMENTS.set(SILVER.splash, {
	name: "Stone",
	key: ["t", "6"],
})

const SOLID = new Set([YELLOW, ORANGE, GREEN, SILVER])
