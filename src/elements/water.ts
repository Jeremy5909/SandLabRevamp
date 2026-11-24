import { ELEMENTS, FALL_SPEED, MIN_SIZE } from "../element"
import { move, tryToSleep } from "../sugar"
import { BLUE } from "../libraries/colour"
import { randomFrom } from "../libraries/random"
import type { Edge } from "../core/Direction"

ELEMENTS.set(BLUE.splash, {
	name: "Water",
	key: ["w", "2"],
	update: (cell, world) => {
		const movements = move(cell, world, "bottom", FALL_SPEED)
		if (movements) {
			return world.replace(...movements)
		}

		const slides = move(cell, world, randomFrom<Edge>(["left", "right"]), FALL_SPEED, MIN_SIZE / 2)
		if (slides) {
			return world.replace(...slides)
		}

		return tryToSleep(cell, world, { filter: () => true })
	},
})
