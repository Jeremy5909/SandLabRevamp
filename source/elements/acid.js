ELEMENTS.set(PURPLE.splash, {
	name: "Acid",
	key: ["a", "6"],
	update: (cell, world) => {
		const allContacts = [
			...pickContacts(cell, world, "top"),
			...pickContacts(cell, world, "bottom"),
			...pickContacts(cell, world, "left"),
			...pickContacts(cell, world, "right"),
		]

		const changed = []
		for (const contact of allContacts) {
			if (contact.colour.splash !== PURPLE.splash) {
				const recoloured = recolour(contact, GREY)
				changed.push(...world.replace([contact], [recoloured]))
			}
		}

		const movements = move(cell, world, "bottom", FALL_SPEED)
		if (movements.length > 0) {
			return world.replace(...movements)
		}

		const slideDirection = randomFrom(["left", "right"])
		const slides = move(cell, world, slideDirection, FALL_SPEED, MIN_SIZE / 2)
		if (slides.length > 0) {
			return world.replace(...slides)
		}

		return tryToSleep(cell, world, { filter: () => true })
	},
})
