import { fireEvent, on } from "./event"

// Returns the name of an event that fires whenever the given key is pressed
let isKeyDownTracked = false
export const keyDown = (key: string) => {
	if (!isKeyDownTracked) {
		isKeyDownTracked = true
		on("keydown", (e) => fireEvent(`keyDown("${e.key}")`), { passive: false })
	}
	return `keyDown("${key}")`
}
