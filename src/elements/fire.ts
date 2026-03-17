import { Habitat } from "../libraries/habitat-embed"
import { FALL_SPEED } from "../element"
import { ELEMENTS } from "../elements"
import { move, recolour, tryToSleep } from "../sugar"
ELEMENTS.set(Habitat.RED.splash, {
  name: "Fire",
  key: ["f", "3"],
  update: (cell, world) => {
    // Decay
    if (Habitat.oneIn(200)) {
      return world.replace([cell], [recolour(cell, Habitat.GREY)])
    }

    const movements = move(cell, world, Habitat.randomFrom(["left", "right", "top"]), FALL_SPEED)
    if (movements.length > 0) {
      return world.replace(...movements)
    }
    return tryToSleep(cell, world, { filter: () => true })
  },
})
