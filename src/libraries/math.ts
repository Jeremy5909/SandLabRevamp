export function clamp(number: number, min: number, max: number) {
	if (number < min) return min
	if (number > max) return max
	return number
}

// Wrap a number into the inclusive range [min, max]
export function wrap(number: number, min: number, max: number) {
	const range = max - min + 1
	while (number < min) number += range
	while (number > max) number -= range
	return number
}
