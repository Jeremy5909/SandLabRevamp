import { global, shared } from "./game"
import { distanceToBounds } from "./sugar"
import { on } from "./libraries/event"
import { getPointer } from "./libraries/pointer"
import { GREEN, SILVER, Splash, YELLOW } from "./libraries/colour"
import { scale } from "./libraries/vector"
import { lerp } from "./libraries/lerp"
import type { Cell } from "./core/Cell"
import type { World } from "./core/World"

export const ELEMENTS = new Map<number, { name: string, key: [string, string], update: ((cell: Cell, world: World) => any) | undefined }>()
const pointer = getPointer()

on(
  "keydown",
  (event) => {
    for (const [splash, element] of ELEMENTS) {
      if (element.key.includes(event.key)) {
        shared.brush.colour = new Splash(splash)
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
  if (pointer.position[0] === undefined) {
    return AIR_TARGET
  }

  const pointerPosition = global.camera.cast(scale(pointer.position as [number, number], devicePixelRatio) as [number, number])
  const distanceFromPointer = distanceToBounds(pointerPosition, cell.bounds)

  if (distanceFromPointer < POINTER_RADIUS) {
    return POINTER_CELL_SIZE
  } else if (distanceFromPointer < POINTER_FADE_RADIUS) {
    return lerp([POINTER_CELL_SIZE, 1], distanceFromPointer - POINTER_RADIUS)
  }

  return AIR_TARGET
}

export const SOLID = new Set([YELLOW.splash, GREEN.splash, SILVER.splash])
