import { ELEMENTS, FALL_SPEED, MIN_SIZE } from "../element"
import { YELLOW } from "../libraries/colour"
import { randomFrom } from "../libraries/random"
import { move, split, tryToSleep } from "../sugar"
import type { Edge } from "../core/Direction"

ELEMENTS.set(YELLOW.splash, {
	name: "Sand",
	key: ["s", "1"],
	update: (cell, world) => {
		const movements = move(cell, world, "bottom", FALL_SPEED)
		if (movements) {
			return world.replace(...movements)
		}

		// Split in half and try to slide the top half off to one side
		if (cell.dimensions[1] > MIN_SIZE) {
			const halves = split(cell, [2, 1])
			const above = halves[0]!

			const slides = move(above, world, randomFrom<Edge>(["left", "right"]), FALL_SPEED)
			if (slides) {
				return [...world.replace([cell], halves), ...world.replace(...slides)]
			}
		}

		return tryToSleep(cell, world)
	},
})
