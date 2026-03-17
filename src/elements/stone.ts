import { FALL_SPEED } from "../element"
import { ELEMENTS } from "../elements"
import { Habitat } from "../libraries/habitat-embed"
import { move, tryToSleep } from "../sugar"
ELEMENTS.set(Habitat.SILVER.splash, {
  name: "Stone",
  key: ["t", "4"],
  update: (cell, world) => {
    const movements = move(cell, world, "bottom", FALL_SPEED)
    if (movements.length > 0) {
      return world.replace(...movements)
    }

    return tryToSleep(cell, world)
  },
})
