import type { Vector2 } from "./vector"

const pointer = {
	position: undefined as Vector2 | undefined,
	down: false,
}

let isPointerTracked = false
export const getPointer = () => {
	if (isPointerTracked) return pointer
	isPointerTracked = true

	addEventListener("pointermove", (e) => {
		pointer.position = [e.clientX, e.clientY]
	})

	addEventListener("pointerdown", (e) => {
		pointer.position = [e.clientX, e.clientY]
		pointer.down = true
	})

	addEventListener("pointerup", (e) => {
		pointer.position = [e.clientX, e.clientY]
		pointer.down = false
	})

	return pointer
}
