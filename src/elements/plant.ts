import { ELEMENTS } from "../elements"
import { Habitat } from "../libraries/habitat-embed"
import { pickContacts, recolour } from "../sugar"
ELEMENTS.set(Habitat.GREEN.splash, {
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
      if (contact.colour.splash === Habitat.BLUE.splash) {
        const recoloured = recolour(contact, Habitat.GREEN)
        changed.push(...world.replace([contact], [recoloured]))
      }
    }
    return changed
  },
})
