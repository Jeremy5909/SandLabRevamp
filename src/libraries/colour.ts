//===========//
// UTILITIES //
//===========//
const wrapSplashNumber = (number: number) => {
  while (number < 0) number += 1000
  while (number > 999) number -= 1000
  return number
}

const getThreeDigits = (number: number) => {
  const chars = number.toString().padStart(3, "0").split("")
  const digits = chars.map((v) => parseInt(v))
  return digits as [number, number, number]
}

//=========//
// CLASSES //
//=========//
export class Colour extends Array<number> {
  get red() { return this[0] }
  get green() { return this[1] }
  get blue() { return this[2] }
  get alpha() { return this[3] }
  splash = 0

  constructor(red: number, green: number, blue: number, alpha = 255) {
    super()
    this.push(red, green, blue)
    this.push(alpha)
  }

  override toString(): string {
    const hex = (v: number) => v.toString(16).padStart(2, "0")
    const r = hex(this.red!)
    const g = hex(this.green!)
    const b = hex(this.blue!)
    if (this.alpha === 255) return `#${r}${g}${b}`
    return `#${r}${g}${b}${hex(this.alpha!)}`
  }
}

export class Splash extends Colour {
  constructor(number: number) {
    const wrappedNumber = wrapSplashNumber(number)
    const [hundreds, tens, ones] = getThreeDigits(wrappedNumber)
    const red = RED_SPLASH_VALUES[hundreds]
    const green = GREEN_SPLASH_VALUES[tens]
    const blue = BLUE_SPLASH_VALUES[ones]
    super(red!, green!, blue!)

    Reflect.defineProperty(this, "splash", {
      value: number,
      enumerable: false,
      writable: false,
      configurable: false
    })
  }
}

//===========//
// CONSTANTS //
//===========//
const RED_SPLASH_VALUES = [23, 55, 70, 98, 128, 159, 174, 204, 242, 255]
const GREEN_SPLASH_VALUES = [29, 67, 98, 128, 159, 174, 204, 222, 245, 255]
const BLUE_SPLASH_VALUES = [40, 70, 98, 128, 159, 174, 204, 222, 247, 255]

export const VOID = new Colour(6, 7, 10)
export const BLACK = new Splash(0)
export const GREY = new Splash(112)
export const SILVER = new Splash(556)
export const WHITE = new Splash(999)

export const GREEN = new Splash(293)
export const CYAN = new Splash(269)
export const BLUE = new Splash(239)
export const PURPLE = new Splash(418)
export const PINK = new Splash(937)
export const CORAL = new Splash(933)
export const RED = new Splash(911)
export const ORANGE = new Splash(931)
export const YELLOW = new Splash(991)

const HUES = [GREEN, CYAN, BLUE, PURPLE, PINK, CORAL, RED, ORANGE, YELLOW]

const SHADES = [VOID, BLACK, GREY, SILVER, WHITE]

const COLOURS = [...SHADES, ...HUES]
