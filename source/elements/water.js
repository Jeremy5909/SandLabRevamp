ELEMENTS.set(BLUE.splash, {
	name: "Water",
	key: ["w", "3"],
	update: (cell, world) => {
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
