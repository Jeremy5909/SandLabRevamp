import { on } from "./event"
import { keyDown } from "./keyboard"
import { struct } from "./struct"

type ContextCallback = (context: CanvasRenderingContext2D) => void

export interface Stage {
	context: CanvasRenderingContext2D | undefined
	scale: number
	aspectRatio: [number, number] | undefined

	speed: number
	clock: number
	paused: boolean

	start: ContextCallback
	resize: ContextCallback
	tick: ContextCallback
	update: ContextCallback
}

export function Stage(properties: Partial<Stage>) {
	const template = struct<Stage>({
		context: undefined,
		scale: 1.0,
		aspectRatio: undefined,

		speed: 1.0,
		clock: 0.0,
		paused: false,

		start: () => {},
		resize: () => {},
		tick: () => {},
		update: () => {},
	})

	const stage = template(properties)

	if (document.body === null) {
		addEventListener("load", () => {
			requestAnimationFrame(() => start(stage))
		})
	} else {
		requestAnimationFrame(() => start(stage))
	}

	return stage
}

const start = (stage: Stage) => {
	// Create a context + canvas if no context was provided
	if (stage.context === undefined) {
		const canvas = document.createElement("canvas")
		canvas.style.backgroundColor = "#171d28"
		document.body.style.backgroundColor = "#06070a"
		document.body.style.margin = "0px"
		document.body.style.overflow = "hidden"
		document.body.appendChild(canvas)
		const context = canvas.getContext("2d")
		if (context === null) throw new Error("Could not create a 2D canvas context")
		stage.context = context
	}
	const context = stage.context

	on("resize", () => resize(stage, context))
	on(keyDown(" "), () => (stage.paused = !stage.paused))

	stage.start(context)
	resize(stage, context)
	tick(stage, context)
}

const resize = (stage: Stage, context: CanvasRenderingContext2D) => {
	let width = innerWidth
	let height = innerHeight

	if (stage.aspectRatio !== undefined) {
		const [x, y] = stage.aspectRatio
		height = (innerWidth * y) / x
		const heightGrowth = height / innerHeight
		if (heightGrowth > 1.0) {
			height /= heightGrowth
			width /= heightGrowth
		}
	}

	const scaledWidth = width * stage.scale
	const scaledHeight = height * stage.scale

	const { canvas } = context
	canvas.width = Math.round(scaledWidth * devicePixelRatio)
	canvas.height = Math.round(scaledHeight * devicePixelRatio)
	canvas.style.width = `${Math.round(scaledWidth)}px`
	canvas.style.height = `${Math.round(scaledHeight)}px`

	const marginHorizontal = `${(innerWidth - scaledWidth) / 2}px`
	const marginVertical = `${(innerHeight - scaledHeight) / 2}px`
	canvas.style.marginLeft = marginHorizontal
	canvas.style.marginRight = marginHorizontal
	canvas.style.marginTop = marginVertical
	canvas.style.marginBottom = marginVertical
	stage.resize(context)
}

const tick = (stage: Stage, context: CanvasRenderingContext2D) => {
	stage.clock += stage.speed
	while (stage.clock > 0) {
		if (!stage.paused) stage.update(context)
		stage.tick(context)
		stage.clock--
	}

	requestAnimationFrame(() => tick(stage, context))
}
