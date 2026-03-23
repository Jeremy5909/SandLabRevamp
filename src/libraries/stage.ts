import { on } from "./event"
import { keyDown } from "./keyboard"
import { struct } from "./struct"

export interface Stage {
  context: CanvasRenderingContext2D | undefined | null,
  scale: number,
  aspectRatio: [number, number],

  speed: number,
  clock: number,
  paused: boolean,

  start: (canvas: CanvasRenderingContext2D | null) => void,
  resize: (canvas: CanvasRenderingContext2D | null) => void,
  tick: (canvas: CanvasRenderingContext2D | null, stage: Stage) => void,
  update: (canvas: CanvasRenderingContext2D | null) => void,
}

export function Stage(properties: Partial<Stage>) {
  const template = struct<Stage>({
    context: undefined,
    scale: 1.0,
    aspectRatio: undefined,

    speed: 1.0,
    clock: 0.0,
    paused: false,

    start: () => { },
    resize: () => { },
    tick: () => { },
    update: () => { },
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
    stage.context = canvas.getContext("2d")
  }

  on("resize", () => resize(stage))
  on(keyDown(" "), () => (stage.paused = !stage.paused))

  stage.start(stage.context)
  resize(stage)
  tick(stage)
}

const resize = (stage: Stage) => {
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

  const { canvas } = stage.context!
  canvas.width = Math.round(scaledWidth * devicePixelRatio)
  canvas.height = Math.round(scaledHeight * devicePixelRatio)
  canvas.style["width"] = Math.round(scaledWidth).toString()
  canvas.style["height"] = Math.round(scaledHeight).toString()

  const marginHorizontal = ((innerWidth - scaledWidth) / 2).toString()
  const marginVertical = ((innerHeight - scaledHeight) / 2).toString()
  canvas.style.marginLeft = marginHorizontal
  canvas.style.marginRight = marginHorizontal
  canvas.style.marginTop = marginVertical
  canvas.style.marginBottom = marginVertical
  stage.resize(stage.context!)
}
const tick = (stage: Stage) => {
  stage.clock += stage.speed
  while (stage.clock > 0) {
    if (!stage.paused) stage.update(stage.context!)
    stage.tick(stage.context!, stage)
    stage.clock--
  }

  requestAnimationFrame(() => tick(stage))
}
