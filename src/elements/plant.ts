import { ELEMENTS } from "../element"
import { BLUE, GREEN } from "../libraries/colour"
import { pickContacts, recolour } from "../sugar"
import { EDGES } from "../core/Direction"
import type { Cell } from "../core/Cell"

ELEMENTS.set(GREEN.splash, {
	name: "Plant",
	key: ["p", "5"],
	update: (cell, world) => {
		// Grow into any water we touch
		const grown: Cell[] = []
		for (const contact of EDGES.flatMap((edge) => pickContacts(cell, world, edge))) {
			if (contact.colour.splash === BLUE.splash) {
				grown.push(...world.replace([contact], [recolour(contact, GREEN)]))
			}
		}
		return grown
	},
})
