import { add, subtract, type Vector2 } from "./vector"

// A view maps between world positions (0 to 1) and screen positions
export class View {
	position: Vector2 = [0, 0]
	dimensions: Vector2 = [1, 1]

	// world position -> view position
	cast(position: Vector2): Vector2 {
		const [x, y] = add(position, this.position)
		const [width, height] = this.dimensions
		return [x / width, y / height]
	}

	// view position -> world position
	get([x, y]: Vector2): Vector2 {
		const [width, height] = this.dimensions
		return subtract([x * width, y * height], this.position)
	}

	resize(dimensions: Vector2) {
		this.dimensions = dimensions
	}
}
