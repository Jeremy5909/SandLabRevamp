import { Habitat } from "./libraries/habitat-embed"
import { shared, global } from "./script"
import { distanceToBounds } from "./sugar"
import { ELEMENTS } from "./elements"

const pointer = Habitat.getPointer()

Habitat.on(
  "keydown",
  (event) => {
    for (const [splash, element] of ELEMENTS) {
      if (element.key.includes(event.key)) {
        shared.brush.colour = new Habitat.Splash(splash).d
        return
      }
    }
  },
  { passive: false },
)

export const FALL_SPEED = 1 / 128
export const MIN_SIZE = 1 / 256

export const POINTER_RADIUS = 0.0 //0.03
export const POINTER_FADE_RADIUS = 0.0 //0.1
export const POINTER_CELL_SIZE = 1 / 4 //1 / 256
let AIR_TARGET = 1 / 32

export const getPointerAirTarget = (cell) => {
  if (pointer.position.x === undefined) {
    return AIR_TARGET
  }

  const pointerPosition = global.camera.cast(Habitat.scale(pointer.position, devicePixelRatio))
  const distanceFromPointer = distanceToBounds(pointerPosition, cell.bounds)

  if (distanceFromPointer < POINTER_RADIUS) {
    return POINTER_CELL_SIZE
  } else if (distanceFromPointer < POINTER_FADE_RADIUS) {
    return Habitat.lerp([POINTER_CELL_SIZE, 1], distanceFromPointer - POINTER_RADIUS)
  }

  return AIR_TARGET
}

export const SOLID = new Set([Habitat.YELLOW.splash, Habitat.GREEN.splash, Habitat.SILVER.splash])
