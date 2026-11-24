import { ELEMENTS, getPointerAirTarget } from "../element"
import { GREY } from "../libraries/colour"
import { split, tryToSleep } from "../sugar"
import type { Cell } from "../core/Cell"

export const AIR_SPLASH = GREY.splash

// How many times bigger than its target size a cell is, in each dimension
const getSizeRatio = (cell: Cell) => {
	const target = getPointerAirTarget(cell)
	const [width, height] = cell.dimensions
	return [width / target, height / target] as const
}

// Score cells by how close they are to their target size (higher is better)
const judge = (cells: Cell[]) => {
	const errors = cells.map((cell) => {
		const [x, y] = getSizeRatio(cell)
		return Math.max(Math.abs(1 - x), Math.abs(1 - y))
	})
	const average = errors.reduce((a, b) => a + b, 0) / errors.length
	return -average
}

const compare = (a: number, b = -Infinity) => a >= b

// Air cells split and merge to stay close to their target size
ELEMENTS.set(AIR_SPLASH, {
	name: "Air",
	key: ["0"],
	update: (cell, world) => {
		const [widthRatio, heightRatio] = getSizeRatio(cell)

		// If a cell is too big, try to split it
		const veryTooWide = widthRatio >= 2.0
		const veryTooTall = heightRatio >= 2.0
		if (veryTooWide || veryTooTall) {
			const rows = veryTooTall ? 2 : 1
			const columns = veryTooWide ? 2 : 1
			const splitCells = split(cell, [rows, columns])

			// Use the split cells if they're better
			if (compare(judge(splitCells), judge([cell]))) {
				return world.replace([cell], splitCells)
			}
		}

		// If a cell is too small, try to sleep it
		const tooShort = heightRatio < 1.0
		const tooNarrow = widthRatio < 1.0
		if (tooShort && tooNarrow) {
			return tryToSleep(cell, world, { judge, compare })
		}

		if (tooShort) {
			const result = tryToSleep(cell, world, { edges: ["top", "bottom"], judge, compare })
			if (result.length > 0) return result
		}

		if (tooNarrow) {
			const result = tryToSleep(cell, world, { edges: ["left", "right"], judge, compare })
			if (result.length > 0) return result
		}

		return []
	},
})
