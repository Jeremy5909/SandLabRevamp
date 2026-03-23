import { Habitat } from "./libraries/habitat-embed"
import { View } from "./libraries/camera"
import { AIR_SPLASH } from "./elements/air"
import { recolour } from "./sugar"
import { Splash, VOID, YELLOW } from "./libraries/colour"
import { ELEMENTS } from "./element"
import { World } from "./core/World"

export const shared = {
  clock: 0,
  brush: {
    colour: YELLOW
  },
}

export const global = {
  world: new World({ colour: Habitat.GREY }),
  camera: new View(),
  image: undefined as undefined | ImageData,
}

export const getPixelIndex = (image: ImageData, x: number, y: number) => {
  return (x + y * image.width) * 4
}

// Function that sets the alpha channel of every pixel
const setImageAlpha = (image: ImageData, alpha: number) => {
  for (let i = 3; i < image.data.length; i += 4) {
    image.data[i] = alpha
  }
}

//===========//
// GAME LOOP //
//===========//
const stage = new Habitat.Stage({ speed: 2.0, paused: false })

stage.start = (context: CanvasRenderingContext2D) => {
  const { canvas } = context
  canvas.style.backgroundColor = VOID.toString()
}

stage.resize = (context: CanvasRenderingContext2D) => {
  const { world, camera } = global
  const { canvas } = context

  // Resize camera
  const size = Math.min(canvas.width, canvas.height)
  camera.resize([size, size])

  // Resize image
  const image = context.createImageData(size, size)
  setImageAlpha(image, 255)
  global.image = image

  // Redraw world
  world.draw(image)
  const [x, y] = camera.get([0, 0])
  context.putImageData(image, x, y)
}

stage.tick = (context: CanvasRenderingContext2D) => {
  const { canvas } = context
  const { image, camera } = global
  const [x, y] = camera.get([0, 0])

  // debug: redraw entire world
  //global.world.draw(image)

  context.clearRect(0, 0, canvas.width, canvas.height)
  context.putImageData(image!, x, y)
}

stage.update = (context: CanvasRenderingContext2D) => {
  const { world, image, camera } = global

  shared.clock = Habitat.wrap(shared.clock + 1, 0, 999)

  // Update cells
  for (const cell of world.cells) {
    if (cell.birth === shared.clock) {
      continue
    }

    const element = ELEMENTS.get(cell.colour.splash)

    if (element === undefined) {
      continue
    }

    if (element.update !== undefined) {
      const newCells = element.update(cell, world)
      for (const newCell of newCells) {
        newCell.draw(image)
      }
    }
  }

  // Place cells with the pointer
  const pointer = Habitat.getPointer()
  if (pointer.down) {
    const colour = shared.brush.colour
    const cell = world.pick(camera.cast(Habitat.scale(pointer.position, devicePixelRatio)))
    const canWrite = cell && (colour.splash === AIR_SPLASH || cell.colour.splash === AIR_SPLASH)
    if (canWrite) {
      const newCell = recolour(cell, colour)
      world.replace([cell], [newCell])
      cell.clear(image!)
      newCell.draw(image!)
    }
  }
}

Object.assign(window, global)
Object.assign(window, shared)
