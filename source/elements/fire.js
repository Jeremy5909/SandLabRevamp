ELEMENTS.set(RED.splash, {
	name: "Fire",
	key: ["f", "3"],
	update: (cell, world) => {
		// Decay
		if (oneIn(200)) {
			return world.replace([cell], [recolour(cell, GREY)])
		}

		const movements = move(cell, world, randomFrom(["left", "right", "top"]), FALL_SPEED)
		if (movements.length > 0) {
			return world.replace(...movements)
		}
		return tryToSleep(cell, world, { filter: () => true })
	},
})
