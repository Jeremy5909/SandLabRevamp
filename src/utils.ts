import type { Splash } from "./libraries/colour"
import { Habitat } from "./libraries/habitat-embed"

const getSplashDigits = (splash: Splash) => {
  const chars = splash.toString().padStart(3, "0").split("")
  const digits = chars.map((v) => parseInt(v))
  return digits
}

const mutateSplash = (splash: Splash) => {
  const digits = getSplashDigits(splash)
  digits[0] = Habitat.clamp(digits[0] + Habitat.randomFrom([0, -1, -1]), 0, 9)
  digits[1] = Habitat.clamp(digits[1] + Habitat.randomFrom([-1, 0, 1]), 0, 9)
  digits[2] = Habitat.clamp(digits[2] + Habitat.randomFrom([-1, 0, 1]), 0, 9)
  return parseInt(digits.join(""))
}
