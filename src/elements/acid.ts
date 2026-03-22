import { Habitat } from "../libraries/habitat-embed"
import { FALL_SPEED, MIN_SIZE } from "../element"
import { ELEMENTS } from "../elements"
import { move, pickContacts, recolor, tryToSleep } from "../sugar"
import Color from "color"
import { Cell } from "../script"
ELEMENTS.set(Color("purple"), {
  name: "Acid",
  key: ["a", "6"],
  update: (cell, world) => {
    const allContacts = [
      ...pickContacts(cell, world, "top"),
      ...pickContacts(cell, world, "bottom"),
      ...pickContacts(cell, world, "left"),
      ...pickContacts(cell, world, "right"),
    ]

    const changed: Cell[] = []
    for (const contact of allContacts) {
      if (contact.color !== Habitat.PURPLE) {
        const recolored = recolor(contact, Habitat.GREY)
        changed.push(...world.replace([contact], [recolored]))
      }
    }

    const movements = move(cell, world, "bottom", FALL_SPEED)
    if (movements.length > 0) {
      return world.replace(...movements)
    }

    const slideDirection = Habitat.randomFrom(["left", "right"])
    const slides = move(cell, world, slideDirection, FALL_SPEED, MIN_SIZE / 2)
    if (slides.length > 0) {
      return world.replace(...slides)
    }

    return tryToSleep(cell, world, { filter: () => true })
  },
})
