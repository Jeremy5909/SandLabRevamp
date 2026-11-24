export type Edge = "left" | "right" | "top" | "bottom"
export type Axis = "x" | "y"

export interface Direction {
	name: Edge
	// The edges that run perpendicular to this direction
	min: Edge
	max: Edge
	axis: Axis
	dimensionNumber: 0 | 1
	sign: 1 | -1
	opposite: Direction
	adjacent: Direction
}

export interface AxisInfo {
	name: Axis
	min: Edge
	max: Edge
	edges: [Edge, Edge]
	dimensionNumber: 0 | 1
	opposite: AxisInfo
	adjacent: AxisInfo
}

const direction = (name: Edge, min: Edge, max: Edge, axis: Axis, dimensionNumber: 0 | 1, sign: 1 | -1) =>
	({ name, min, max, axis, dimensionNumber, sign }) as Direction

export const DIRECTION: Record<Edge, Direction> = {
	left: direction("left", "top", "bottom", "x", 1, -1),
	right: direction("right", "top", "bottom", "x", 1, 1),
	top: direction("top", "left", "right", "y", 0, -1),
	bottom: direction("bottom", "left", "right", "y", 0, 1),
}

export const EDGES = Object.keys(DIRECTION) as Edge[]

DIRECTION.left.opposite = DIRECTION.right
DIRECTION.right.opposite = DIRECTION.left
DIRECTION.top.opposite = DIRECTION.bottom
DIRECTION.bottom.opposite = DIRECTION.top

DIRECTION.left.adjacent = DIRECTION.top
DIRECTION.right.adjacent = DIRECTION.bottom
DIRECTION.top.adjacent = DIRECTION.right
DIRECTION.bottom.adjacent = DIRECTION.left

const axis = (name: Axis, min: Edge, max: Edge, edges: [Edge, Edge], dimensionNumber: 0 | 1) =>
	({ name, min, max, edges, dimensionNumber }) as AxisInfo

export const AXIS: Record<Axis, AxisInfo> = {
	x: axis("x", "top", "bottom", ["left", "right"], 1),
	y: axis("y", "left", "right", ["top", "bottom"], 0),
}

AXIS.x.opposite = AXIS.x
AXIS.y.opposite = AXIS.y

AXIS.x.adjacent = AXIS.y
AXIS.y.adjacent = AXIS.x
