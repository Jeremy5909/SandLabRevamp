import { ELEMENTS, FALL_SPEED } from "../element"
import { SILVER } from "../libraries/colour"
import { move, tryToSleep } from "../sugar"
ELEMENTS.set(SILVER.splash, {
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
