const AIR_SPLASH = GREY.splash
ELEMENTS.set(AIR_SPLASH, {
	name: "Air",
	key: ["0"],
	update: (cell, world) => {
		const target = getPointerAirTarget(cell)
		const dimensionErrorScale = cell.dimensions.map((v) => v / target)

		// Function that finds the error of all cells from their target size
		const judge = (cells) => {
			let errors = []

			for (const cell of cells) {
				if (cell.dimensions[0] < MIN_SIZE || cell.dimensions[1] < MIN_SIZE) {
					//errors.push(Infinity)
					//continue
				}

				const target = getPointerAirTarget(cell)
				const dimensionErrorScale = cell.dimensions.map((v) => v / target)
				const dimensionErrorDiff = dimensionErrorScale.map((v) => Math.abs(1 - v))
				const errorDiff = Math.max(dimensionErrorDiff[0], dimensionErrorDiff[1])
				errors.push(errorDiff)
			}

			const sum = errors.reduce((a, b) => a + b, 0)
			const average = sum / errors.length
			const score = -average
			return score
		}

		const compareSplit = (a, b = -Infinity) => {
			return a >= b
		}

		const compare = (a, b = -Infinity) => {
			return a >= b
		}

		// If a cell is too big, try to split it
		const veryTooWide = dimensionErrorScale[0] >= 2.0
		const veryTooTall = dimensionErrorScale[1] >= 2.0
		if (veryTooWide || veryTooTall) {
			const columns = veryTooTall ? 2 : 1
			const rows = veryTooWide ? 2 : 1
			const splitCells = split(cell, [columns, rows])

			// Judge the split cells and use them if they're better
			const splitScores = judge(splitCells)
			const originalScores = judge([cell])
			if (compareSplit(splitScores, originalScores)) {
				return world.replace([cell], splitCells)
			}
		}

		// If a cell is too small, try to sleep it
		const tooThin = dimensionErrorScale[1] < 1.0
		const tooShort = dimensionErrorScale[0] < 1.0
		if (tooThin && tooShort) {
			return tryToSleep(cell, world, { judge, compare })
		}

		if (tooThin) {
			const result = tryToSleep(cell, world, { edges: ["top", "bottom"], judge, compare })
			if (result.length > 0) {
				return result
			}
		}

		if (tooShort) {
			const result = tryToSleep(cell, world, { edges: ["left", "right"], judge, compare })
			if (result.length > 0) {
				return result
			}
		}

		return []
	},
})
