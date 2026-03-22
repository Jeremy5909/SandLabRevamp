import Color from "color"
import { ELEMENTS } from "../elements"
import { Habitat } from "../libraries/habitat-embed"
import { pickContacts, recolor } from "../sugar"
ELEMENTS.set(Color("green"), {
  name: "Plant",
  key: ["p", "5"],
  update: (cell, world) => {
    const allContacts = [
      ...pickContacts(cell, world, "top"),
      ...pickContacts(cell, world, "bottom"),
      ...pickContacts(cell, world, "left"),
      ...pickContacts(cell, world, "right"),
    ]

    const changed = []
    for (const contact of allContacts) {
      if (contact.color === Color("blue")) {
        const recolored = recolor(contact, Habitat.GREEN)
        changed.push(...world.replace([contact], [recolored]))
      }
    }
    return changed
  },
})
