// This file contains functions that help you to work with cells
// They don't add any extra functionality
// They just make your code more readable

import { SOLID } from "./element"
import { AXIS, DIRECTION, EDGES, type Axis, type Edge } from "./core/Direction"
import type { World } from "./core/World"
import type { Colour } from "./libraries/colour"
import { Cell, type Bounds } from "./core/Cell"
import { shared } from "./game"
import { wrap } from "./libraries/math"
import { shuffleArray } from "./libraries/array"
import type { Vector2 } from "./libraries/vector"

// A replacement is a list of cells to remove from the world and a list of cells to add
export type Replacement = [oldCells: Cell[], newCells: Cell[]]

// Split a cell into a grid of equally sized cells
export const split = (cell: Cell, [rows, columns]: [number, number]) => {
	const { left, right, top, bottom } = cell.bounds
	const [width, height] = cell.dimensions

	const splitWidth = width / columns
	const splitHeight = height / rows

	const cells: Cell[] = []
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < columns; j++) {
			cells.push(
				new Cell({
					bounds: {
						left: left + j * splitWidth,
						top: top + i * splitHeight,
						right: right - (columns - j - 1) * splitWidth,
						bottom: bottom - (rows - i - 1) * splitHeight,
					},
					colour: cell.colour,
				}),
			)
		}
	}

	return cells
}

// Chop a cell into smaller cells along an axis
// The targets are the positions along the axis where the cells should be chopped
const chop = (cell: Cell, axis: Axis, targets: number[]) => {
	if (targets.length === 0) {
		return [cell]
	}

	const direction = AXIS[axis]

	// Sort and remove duplicates
	targets = [...new Set(targets)].sort((a, b) => a - b)

	const cells: Cell[] = []
	let currentTarget = cell.bounds[direction.min]
	for (let i = 0; i <= targets.length; i++) {
		const target = targets[i] ?? cell.bounds[direction.max]

		if (target === currentTarget) {
			continue
		}

		const bounds = {
			[direction.min]: currentTarget,
			[direction.max]: target,
			[direction.adjacent.min]: cell.bounds[direction.adjacent.min],
			[direction.adjacent.max]: cell.bounds[direction.adjacent.max],
		} as unknown as Bounds

		cells.push(new Cell({ bounds, colour: cell.colour }))
		currentTarget = target
	}

	return cells
}

// From an array of cells, return a single cell that encompasses all of them
// This assumes that the cells are all connected via touching
// The cells can be in any order and can have different dimensions
const merge = (cells: Cell[]) => {
	const [first] = cells
	if (first === undefined) {
		throw new Error("Cannot merge 0 cells")
	}

	let left = Infinity
	let top = Infinity
	let right = -Infinity
	let bottom = -Infinity

	for (const { bounds } of cells) {
		left = Math.min(left, bounds.left)
		top = Math.min(top, bounds.top)
		right = Math.max(right, bounds.right)
		bottom = Math.max(bottom, bounds.bottom)
	}

	return new Cell({ colour: first.colour, bounds: { left, top, right, bottom } })
}

const reposition = (cell: Cell, bounds: Partial<Bounds>) => {
	return new Cell({
		colour: cell.colour,
		bounds: { ...cell.bounds, ...bounds },
	})
}

export const recolour = (cell: Cell, colour: Colour) => {
	return new Cell({ colour, bounds: cell.bounds })
}

// Pick an array of cells that are adjacent and touching the given cell
export const pickContacts = (cell: Cell, world: World, edge: Edge) => {
	const { bounds } = cell
	const direction = DIRECTION[edge]

	const front = bounds[edge]
	const min = bounds[direction.min]
	const max = bounds[direction.max]

	const set = world.caches[direction.opposite.name].get(front)
	if (set === undefined) {
		return []
	}

	const cells: Cell[] = []
	for (const other of set) {
		const otherMin = other.bounds[direction.min]
		const otherMax = other.bounds[direction.max]

		// Check if the cells overlap in any way at all
		if (otherMin >= max || otherMax <= min) {
			continue
		}

		cells.push(other)
	}

	return cells
}

// Cut the contacts on one edge of a cell down to pieces that fit exactly against the cell
// Returns the fitted pieces (snips), the leftover pieces (excesses), and how far the snips reach
const snipContacts = (cell: Cell, contacts: Cell[], edge: Edge, reach = Infinity) => {
	const direction = DIRECTION[edge]
	const adjacent = direction.adjacent
	const oppositeEdge = direction.opposite.name

	const contactReach = Math.min(reach, ...contacts.map((contact) => contact.dimensions[adjacent.dimensionNumber]))
	const signedReach = contactReach * direction.sign

	const sizeds: Cell[] = []
	const excesses: Cell[] = []

	for (const contact of contacts) {
		const [head, tail] = chop(contact, adjacent.axis, [contact.bounds[oppositeEdge] + signedReach])

		if (direction.sign === 1) {
			sizeds.push(head!)
			if (tail !== undefined) excesses.push(tail)
		} else if (tail !== undefined) {
			sizeds.push(tail)
			excesses.push(head!)
		} else {
			sizeds.push(head!)
		}
	}

	// If any sized contacts overlap the cell, chop them off
	const cellMin = cell.bounds[direction.min]
	const cellMax = cell.bounds[direction.max]
	const snips: Cell[] = []
	for (let sized of sizeds) {
		if (sized.bounds[direction.min] < cellMin) {
			const [excess, snip] = chop(sized, direction.axis, [cellMin])
			sized = snip!
			excesses.push(excess!)
		}

		if (sized.bounds[direction.max] > cellMax) {
			const [snip, excess] = chop(sized, direction.axis, [cellMax])
			sized = snip!
			excesses.push(excess!)
		}

		// Now we're left with a contact that fits perfectly inside the cell
		snips.push(sized)
	}

	return { snips, excesses, reach: contactReach }
}

const pickSnips = (cell: Cell, world: World, edge: Edge, reach: number) => {
	const contacts = pickContacts(cell, world, edge)
	return { contacts, ...snipContacts(cell, contacts, edge, reach) }
}

// Swap a cell with the snips on one of its edges
const swapSnips = (cell: Cell, snips: Cell[], edge: Edge) => {
	const direction = DIRECTION[edge]
	const oppositeEdge = direction.opposite.name
	const cellSize = cell.dimensions[direction.adjacent.dimensionNumber]

	// front   snip     cell
	// middle  middle   middle
	// back    cell     snip
	const front = snips[0]!.bounds[edge]
	const back = cell.bounds[oppositeEdge]
	const middle = front - cellSize * direction.sign

	const newCell = reposition(cell, { [edge]: front, [oppositeEdge]: middle })
	const newSnips = snips.map((snip) => reposition(snip, { [oppositeEdge]: back, [edge]: middle }))

	return [newCell, ...newSnips]
}

type Judge = (cells: Cell[]) => number
type Compare = (a: number, b?: number) => boolean

const defaultJudge: Judge = (cells) => Math.max(...cells.map((cell) => cell.dimensions[0] * cell.dimensions[1]))

const defaultCompare: Compare = (a, b = -Infinity) => a > b

const defaultFilter = (cell: Cell) => wrap(shared.clock - cell.birth, 0, 999) > 0

interface SleepOptions {
	edges?: Edge[]
	judge?: Judge
	compare?: Compare
	filter?: (cell: Cell) => boolean
}

// 'Sleeping' means merging with a nearby cell so that we don't have to
// update or draw this cell every frame
//
// This function makes a cell look for a nearby cell (of the same colour) to merge with
// If it finds one, it merges with it and returns any cells created
// If it doesn't find one, it returns an empty array
//
// There are some different ways a merge could happen:
// 1. The cell is touching a cell that perfectly lines up with it
// 2. The cell is touching a bigger cell that can be split into multiple cells that line up with it
export const tryToSleep = (
	cell: Cell,
	world: World,
	{ edges = EDGES, judge = defaultJudge, compare = defaultCompare, filter = defaultFilter }: SleepOptions = {},
) => {
	let winner: Replacement | undefined = undefined
	let highScore: number | undefined = undefined

	for (const edge of shuffleArray([...edges])) {
		const replacement = sleep(cell, world, edge, filter)
		if (replacement === undefined) continue
		const [oldCells, newCells] = replacement

		const newScore = judge(newCells)
		const oldScore = judge(oldCells)

		if (compare(newScore, oldScore) && compare(newScore, highScore)) {
			highScore = newScore
			winner = replacement
		}
	}

	if (winner === undefined) {
		return []
	}

	return world.replace(...winner)
}

const equals = (a: readonly number[], b: readonly number[]) => {
	if (a === b) return true
	if (a.length !== b.length) return false
	for (let i = 0; i < a.length; i++) {
		if (a[i] !== b[i]) return false
	}
	return true
}

// Try to move a cell towards an edge, swapping places with whatever non-solid cells are there
// Returns the replacement that should be done, or undefined if the cell can't move
export const move = (cell: Cell, world: World, edge: Edge, speed: number, minSize = 0): Replacement | undefined => {
	const direction = DIRECTION[edge]
	const below = pickSnips(cell, world, edge, speed)

	if (below.snips.length === 0) {
		return undefined
	}

	const isGap = (c: Cell) => !SOLID.has(c.colour.splash) && c.colour.splash !== cell.splash

	// If there isn't solid below, fall
	if (below.snips.every(isGap)) {
		const movedCells = swapSnips(cell, below.snips, edge)
		return [
			[cell, ...below.contacts],
			[...below.excesses, ...movedCells],
		]
	}

	// If there are some gaps below, cut myself up into gap-sized pieces so they can fall into them
	const gaps = below.snips.filter(isGap)
	if (gaps.length > 0) {
		const targets = gaps.flatMap((v) => [v.bounds[direction.min], v.bounds[direction.max]])
		const pieces = chop(cell, direction.axis, targets)
		const size = direction.dimensionNumber
		if (cell.dimensions[size] >= minSize && pieces.some((piece) => piece.dimensions[size] <= minSize)) {
			return undefined
		}
		return [[cell], pieces]
	}

	return undefined
}

// Find a way to merge a cell with a contact on one edge
// Returns the replacement that would do it, or undefined if there isn't one
const sleep = (cell: Cell, world: World, edge: Edge, filter: (cell: Cell) => boolean): Replacement | undefined => {
	const direction = DIRECTION[edge]
	const cellMin = cell.bounds[direction.min]
	const cellMax = cell.bounds[direction.max]

	// Get all the cells that are touching this cell, in a random order
	// so that we don't always merge with the same cell
	const candidates = shuffleArray(pickContacts(cell, world, edge).filter(filter))

	let splitCandidate: Cell | undefined = undefined

	for (const candidate of candidates) {
		// If the candidate is a different colour, we can't merge with it
		if (!equals(candidate.colour, cell.colour)) {
			continue
		}

		const candidateMin = candidate.bounds[direction.min]
		const candidateMax = candidate.bounds[direction.max]

		// If the candidate is the exact same size as us, we can merge with it
		if (candidateMin === cellMin && candidateMax === cellMax) {
			return [[cell, candidate], [merge([cell, candidate])]]
		}

		// If the candidate is smaller at either end, we can't merge with it
		if (candidateMin > cellMin || candidateMax < cellMax) {
			continue
		}

		// Otherwise, the candidate is bigger than us
		// We can split the candidate into multiple cells that line up with us
		// Then we can merge with one of those cells
		splitCandidate ??= candidate
	}

	if (splitCandidate === undefined) {
		return undefined
	}

	// Where should we split the candidate? We might need to chop in two places, or just one
	const targets: number[] = []
	let mergeIndex = 0
	if (splitCandidate.bounds[direction.min] < cellMin) {
		targets.push(cellMin)
		mergeIndex = 1
	}
	if (splitCandidate.bounds[direction.max] > cellMax) {
		targets.push(cellMax)
	}

	const splitCells = chop(splitCandidate, direction.axis, targets)
	const mergedCell = merge([cell, splitCells[mergeIndex]!])

	return [
		[cell, splitCandidate],
		[mergedCell, ...splitCells.filter((_, i) => i !== mergeIndex)],
	]
}

// Get the distance from a point to the nearest point on (or inside) a rectangle
export const distanceToBounds = ([x, y]: Vector2, { left, right, top, bottom }: Bounds) => {
	const dx = Math.max(left - x, 0, x - right)
	const dy = Math.max(top - y, 0, y - bottom)
	return Math.hypot(dx, dy)
}
