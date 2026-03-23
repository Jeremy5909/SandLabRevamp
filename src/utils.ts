import type { Splash } from "./libraries/colour"
import { clamp } from "./libraries/math"
import { randomFrom } from "./libraries/random"

// Math

const wrapSplashNumber = (number) => {
  while (number < 0) number += 1000
  while (number > 999) number -= 1000
  return number
}

const getThreeDigits = (number) => {
  const chars = number.toString().padStart(3, "0").split("")
  const digits = chars.map((v) => parseInt(v))
  return digits
}

const getSplashDigits = (splash: Splash) => {
  const chars = splash.toString().padStart(3, "0").split("")
  const digits = chars.map((v) => parseInt(v))
  return digits
}

const mutateSplash = (splash: Splash) => {
  const digits = getSplashDigits(splash)
  digits[0] = clamp(digits[0] + randomFrom([0, -1, -1]), 0, 9)
  digits[1] = clamp(digits[1] + randomFrom([-1, 0, 1]), 0, 9)
  digits[2] = clamp(digits[2] + randomFrom([-1, 0, 1]), 0, 9)
  return parseInt(digits.join(""))
}
