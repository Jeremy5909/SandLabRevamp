ELEMENTS.set(GREEN.splash, {
	name: "Plant",
	key: ["p", "7"],
	update: (cell, world) => {
		const allContacts = [
			...pickContacts(cell, world, "top"),
			...pickContacts(cell, world, "bottom"),
			...pickContacts(cell, world, "left"),
			...pickContacts(cell, world, "right"),
		]

		const changed = []
		for (const contact of allContacts) {
			if (contact.colour.splash === BLUE.splash) {
				const recoloured = recolour(contact, GREEN)
				changed.push(...world.replace([contact], [recoloured]))
			}
		}
		return changed
	},
})
