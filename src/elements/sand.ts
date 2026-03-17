import { FALL_SPEED, MIN_SIZE } from "../element"
import { ELEMENTS } from "../elements"
import { Habitat } from "../libraries/habitat-embed"
import { move, split, tryToSleep } from "../sugar"

ELEMENTS.set(Habitat.YELLOW.splash, {
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

      const slideDirection = Habitat.randomFrom(["left", "right"])
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
