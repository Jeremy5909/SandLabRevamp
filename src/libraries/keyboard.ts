import { fireEvent, on } from "./event"

const keyboard = {}
let isKeyboardTracked = false
const getKeyboard = () => {
  if (isKeyboardTracked) return keyboard
  isKeyboardTracked = true
  on("keydown", (e: KeyboardEvent) => {
    keyboard[e.key] = true
  })

  on("keyup", (e: KeyboardEvent) => {
    keyboard[e.key] = false
  })

  return keyboard
}

let isKeyDownTracked = false
export const keyDown = (key: string) => {
  if (!isKeyDownTracked) {
    isKeyDownTracked = true
    on("keydown", (e: KeyboardEvent) => fireEvent(`keyDown("${e.key}")`), { passive: false })
  }
  return `keyDown("${key}")`
}

let isKeyUpTracked = false
const keyUp = (key: string) => {
  if (!isKeyUpTracked) {
    isKeyUpTracked = true
    on("keyup", (e: KeyboardEvent) => fireEvent(`keyUp("${e.key}")`), { passive: false })
  }
  return `keyUp("${key}")`
}
