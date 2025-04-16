ELEMENTS.set(YELLOW.splash, {
	name: "Sand",
	key: ["s", "1"],
	update: (cell, world) => {
		const movements = move(cell, world, "bottom", FALL_SPEED)
		if (movements.length > 0) {
			return world.replace(...movements)
		}

		if (cell.dimensions[1] > MIN_SIZE) {
			const [above, me] = split(cell, [2, 1])

			const splitReplacements = [[cell], [above, me]]

			const slideDirection = randomFrom(["left", "right"])
			const movements = move(above, world, slideDirection, FALL_SPEED)
			if (movements.length > 0) {
				const splittings = world.replace(...splitReplacements)
				const movings = world.replace(...movements)
				return [...splittings, ...movings]
			}
		}

		return tryToSleep(cell, world)
	},
})
