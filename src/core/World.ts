import { shared } from "../game"
import { EDGES, type Edge } from "./Direction"
import { Cell } from "./Cell"
import { BLACK, type Colour } from "../libraries/colour"
import type { Vector2 } from "../libraries/vector"

// For each edge, a lookup from an edge's position to the cells that have an edge there
export type Caches = Record<Edge, Map<number, Set<Cell>>>

export class World {
	cells = new Set<Cell>()
	caches: Caches = {
		left: new Map(),
		right: new Map(),
		top: new Map(),
		bottom: new Map(),
	}

	constructor({ colour = BLACK }: { colour?: Colour } = {}) {
		this.add(new Cell({ colour }))
	}

	add(cell: Cell) {
		this.cells.add(cell)
		this.cache(cell)
	}

	delete(cell: Cell) {
		this.cells.delete(cell)
		this.uncache(cell)
	}

	cache(cell: Cell) {
		for (const edge of EDGES) {
			const cache = this.caches[edge]
			const address = cell.bounds[edge]
			let set = cache.get(address)
			if (set === undefined) {
				set = new Set()
				cache.set(address, set)
			}
			set.add(cell)
		}
	}

	uncache(cell: Cell) {
		for (const edge of EDGES) {
			const cache = this.caches[edge]
			const address = cell.bounds[edge]
			const set = cache.get(address)
			if (set === undefined) continue
			set.delete(cell)
			if (set.size === 0) {
				cache.delete(address)
			}
		}
	}

	draw(image: ImageData) {
		for (const cell of this.cells) {
			cell.draw(image)
		}
	}

	replace(cells: Cell[], newCells: Cell[]) {
		for (const cell of cells) {
			this.delete(cell)
		}
		for (const newCell of newCells) {
			newCell.birth = shared.clock
			this.add(newCell)
		}
		return newCells
	}

	pick([x, y]: Vector2) {
		for (const cell of this.cells) {
			const [left, top] = cell.position
			const [right, bottom] = [left + cell.dimensions[0], top + cell.dimensions[1]]

			if (x >= left && x <= right && y >= top && y <= bottom) {
				return cell
			}
		}
		return undefined
	}
}
