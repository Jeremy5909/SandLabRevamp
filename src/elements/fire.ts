import { ELEMENTS, FALL_SPEED, MIN_SIZE } from "../element"
import { move, recolour, tryToSleep } from "../sugar"
import { GREY, RED } from "../libraries/colour"
import { oneIn, randomFrom } from "../libraries/random"
import type { Edge } from "../core/Direction"

ELEMENTS.set(RED.splash, {
	name: "Fire",
	key: ["f", "3"],
	update: (cell, world) => {
		// Decay
		if (oneIn(200)) {
			return world.replace([cell], [recolour(cell, GREY)])
		}

		const movements = move(cell, world, randomFrom<Edge>(["left", "right", "top"]), FALL_SPEED, MIN_SIZE / 2)
		if (movements) {
			return world.replace(...movements)
		}

		return tryToSleep(cell, world, { filter: () => true })
	},
})
