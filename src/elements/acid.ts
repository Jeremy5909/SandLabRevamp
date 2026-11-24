import { ELEMENTS, FALL_SPEED, MIN_SIZE } from "../element"
import { move, pickContacts, recolour, tryToSleep } from "../sugar"
import { GREY, PURPLE } from "../libraries/colour"
import { randomFrom } from "../libraries/random"
import { EDGES, type Edge } from "../core/Direction"
import type { Cell } from "../core/Cell"

ELEMENTS.set(PURPLE.splash, {
	name: "Acid",
	key: ["a", "6"],
	update: (cell, world) => {
		// Dissolve everything we touch into air
		const dissolved: Cell[] = []
		for (const contact of EDGES.flatMap((edge) => pickContacts(cell, world, edge))) {
			if (contact.colour.splash !== PURPLE.splash) {
				dissolved.push(...world.replace([contact], [recolour(contact, GREY)]))
			}
		}

		const movements = move(cell, world, "bottom", FALL_SPEED)
		if (movements) {
			return [...dissolved, ...world.replace(...movements)]
		}

		const slides = move(cell, world, randomFrom<Edge>(["left", "right"]), FALL_SPEED, MIN_SIZE / 2)
		if (slides) {
			return [...dissolved, ...world.replace(...slides)]
		}

		return [...dissolved, ...tryToSleep(cell, world, { filter: () => true })]
	},
})
