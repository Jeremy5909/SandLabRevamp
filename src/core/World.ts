import { shared } from "../game";
import { DIRECTION } from "./Direction";
import { Cell } from "./Cell";
import { BLACK } from "../libraries/colour";

export interface Caches {
  left: Map<any, any>,
  right: Map<any, any>,
  top: Map<any, any>,
  bottom: Map<any, any>,
}

export class World {
  cells: Set<Cell>;
  caches: Caches;
  constructor({ colour = BLACK } = {}) {
    // Properties
    this.cells = new Set();

    // Caches
    this.caches = {
      left: new Map(),
      right: new Map(),
      top: new Map(),
      bottom: new Map(),
    };

    // Setup
    this.add(new Cell({ colour }));
  }

  add(cell: Cell) {
    this.cells.add(cell);
    this.cache(cell);
  }

  delete(cell: Cell) {
    this.cells.delete(cell);
    this.uncache(cell);
  }

  cache(cell: Cell) {
    for (const k in DIRECTION) {
      const key = k as keyof Caches;
      const cache = this.caches[key];
      const address = cell.bounds[key];
      let set = cache.get(address);
      if (set === undefined) {
        set = new Set();
        cache.set(address, set);
      }
      set.add(cell);
    }
  }

  uncache(cell: Cell) {
    for (const k in DIRECTION) {
      const key = k as keyof Caches;
      const cache = this.caches[key];
      const address = cell.bounds[key];
      const set = cache.get(address);
      set.delete(cell);
      if (set.size === 0) {
        cache.delete(address);
      }
    }
  }

  draw(image: ImageData) {
    for (const cell of this.cells) {
      cell.draw(image);
    }
  }

  replace(cells: Cell[], newCells: Cell[]) {
    for (const cell of cells) {
      this.delete(cell);
    }
    for (const newCell of newCells) {
      newCell.birth = shared.clock;
      this.add(newCell);
    }
    return newCells;
  }

  pick(position: [number, number]) {
    const [x, y] = position;
    for (const cell of this.cells) {
      const [left, top] = cell.position;
      const [right, bottom] = [left + cell.dimensions[0], top + cell.dimensions[1]];

      if (x >= left && x <= right && y >= top && y <= bottom) {
        return cell;
      }
    }
    return undefined;
  }
}

