export type Vector2 = [number, number]

export const add = ([ax, ay]: Vector2, [bx, by]: Vector2): Vector2 => [ax + bx, ay + by]

export const subtract = ([ax, ay]: Vector2, [bx, by]: Vector2): Vector2 => [ax - bx, ay - by]

export const scale = ([x, y]: Vector2, amount: number): Vector2 => [x * amount, y * amount]
