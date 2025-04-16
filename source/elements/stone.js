ELEMENTS.set(SILVER.splash, {
	name: "Stone",
	key: ["t", "6"],
	update: (cell, world) => {
		const movements = move(cell, world, "bottom", FALL_SPEED)
		if (movements.length > 0) {
			return world.replace(...movements)
		}

		return tryToSleep(cell, world)
	},
})
