import { Colour, BLACK, VOID } from "../libraries/colour";
import { shared, getPixelIndex } from "../game";

export interface Bounds { left: number, right: number, top: number, bottom: number }

export class Cell {
  birth: number;
  colour: Colour = BLACK;
  splash = BLACK.splash;
  bounds: Bounds = { left: 0, right: 1, top: 0, bottom: 1 };
  position: [number, number];
  dimensions: [number, number];

  constructor(options: Partial<Pick<Cell, "colour" | "bounds">> = {}) {
    // Properties
    Object.assign(this, options);

    this.birth = shared.clock;
    this.splash = this.colour.splash;
    this.position = [(this.bounds.left), (this.bounds.top)];

    const width = this.bounds.right - this.bounds.left;
    const height = this.bounds.bottom - this.bounds.top;
    this.dimensions = [width, height];

    // Check for rounding errors
    if (this.bounds.left + width !== this.bounds.right)
      console.error("Cell bounds are not consistent with dimensions", this.bounds.left + width, this.bounds.right);

    if (this.bounds.right - width !== this.bounds.left)
      console.error("Cell bounds are not consistent with dimensions", this.bounds.right - width, this.bounds.left);

    if (this.bounds.top + height !== this.bounds.bottom)
      console.error(
        "Cell bounds are not consistent with dimensions",
        this.bounds.top + height,
        this.bounds.bottom
      );
    if (this.bounds.bottom - height !== this.bounds.top)
      console.error(
        "Cell bounds are not consistent with dimensions",
        this.bounds.bottom - height,
        this.bounds.top
      );
  }

  clear(image: ImageData) {
    const { colour } = this;
    this.colour = VOID;
    this.draw(image);
    this.colour = colour;
  }

  draw(image: ImageData) {
    const [x, y] = [this.position[0] * image.width, this.position[1] * image.height];
    const [width, height] = [this.dimensions[0] * image.width, this.dimensions[1] * image.height];

    const left = Math.floor(x);
    const right = Math.floor(x + width);
    const top = Math.floor(y);
    const bottom = Math.floor(y + height);

    const drawnWidth = right - left;
    const drawnHeight = bottom - top;

    let i = getPixelIndex(image, left, top);

    // Set the image data of every pixel in the cell
    // The border is 1 pixel thick and void coloured
    let BORDER_WIDTH = Math.min(1, Math.min(drawnWidth, drawnHeight) / 10);
    if (BORDER_WIDTH < 1) {
      if (BORDER_WIDTH > 0.4) {
        BORDER_WIDTH = 1;
      } else {
        BORDER_WIDTH = 1;
      }
    }

    const fillColour = this.colour;

    for (let y = top; y <= bottom; y++) {
      for (let x = left; x <= right; x++) {
        const isBorder = BORDER_WIDTH > 0 &&
          (x < left + BORDER_WIDTH ||
            x > right - BORDER_WIDTH ||
            y < top + BORDER_WIDTH ||
            y > bottom - BORDER_WIDTH);

        const colour = isBorder ? VOID : fillColour;

        image.data[i + 0] = colour[0]!;
        image.data[i + 1] = colour[1]!;
        image.data[i + 2] = colour[2]!;
        i += 4;
      }
      i += (image.width - drawnWidth - 1) * 4;
    }
  }
}

