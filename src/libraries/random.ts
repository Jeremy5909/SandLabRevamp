const maxRandomNumberIndex = 2 ** 14
const randomNumbersBuffer = new Uint32Array(maxRandomNumberIndex)
let randomNumberIndex = Infinity

export function random() {
	if (randomNumberIndex >= maxRandomNumberIndex) {
		crypto.getRandomValues(randomNumbersBuffer)
		randomNumberIndex = 0
	}
	const result = randomNumbersBuffer[randomNumberIndex]!
	randomNumberIndex++
	return result
}

export function randomFrom<T>(array: readonly T[]): T {
	return array[random() % array.length]!
}

export const oneIn = (times: number) => random() % times < 1
