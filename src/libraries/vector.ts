export function scale(value: number | [number, number], scale: number) {
  if (typeof value === "number") return value * scale
  return value.map((v: any) => v * scale)
}

export function add(a: number | number[], b: number | number[]) {
  if (typeof a === "number") {
    return a + (b as number)
  }

  if (a.length === 2) {
    const [ax, ay] = a as [number, number]
    const [bx, by] = b as [number, number]
    const x = ax + bx
    const y = ay + by
    return [x, y]
  } else {
    const [ax, ay, az] = a as [number, number, number]
    const [bx, by, bz] = b as [number, number, number]
    const x = ax + bx
    const y = ay + by
    const z = az + bz
    return [x, y, z]
  }
}

export const subtract = (a: number | number[], b: number | number[]) => {
  if (typeof a === "number") {
    return a - (b as number)
  }

  if (a.length === 2) {
    const [ax, ay] = a as [number, number]
    const [bx, by] = b as [number, number]
    const x = ax - bx
    const y = ay - by
    return [x, y]
  } else {
    const [ax, ay, az] = a as [number, number, number]
    const [bx, by, bz] = b as [number, number, number]

    const x = ax - bx
    const y = ay - by
    const z = az - bz
    return [x, y, z]
  }
}

export const crossProduct = (a: number[], b: number[]) => {
  if (a.length === 2) {
    const [ax, ay] = a as [number, number]
    const [bx, by] = b as [number, number]
    return ax * by - ay * bx
  } else {
    const [ax, ay, az] = a as [number, number, number]
    const [bx, by, bz] = b as [number, number, number]
    return [ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx]
  }
}

export const distanceBetween = (a: number | number[], b: number | number[]) => {
  if (typeof a === "number") {
    return Math.abs(a - (b as number))
  }

  const displacement = subtract(a, b)
  const [dx, dy, dz = 0] = displacement as [number, number, number]
  const distance = Math.hypot(dx, dy, dz)
  return distance
}

export const angleBetween = (a: [number, number], b: number[]) => {
  const displacement = subtract(a, b) as [number, number]
  const [dx, dy] = displacement
  const angle = Math.atan2(dy, dx)
  return angle
}
