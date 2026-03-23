//===========//
// DIRECTION //
//===========//

export const DIRECTION = {
  left: {
    name: "left", min: "top", max: "bottom",
    axis: "x", dimensionNumber: 1, sign: -1,
    opposite: undefined as any,
    adjacent: undefined as any
  },
  right: {
    name: "right", min: "top", max: "bottom",
    axis: "x", dimensionNumber: 1, sign: 1,
    opposite: undefined as any,
    adjacent: undefined as any
  },
  top: {
    name: "top", min: "left", max: "right",
    axis: "y", dimensionNumber: 0, sign: -1,
    opposite: undefined as any,
    adjacent: undefined as any
  },
  bottom: {
    name: "bottom", min: "left", max: "right",
    axis: "y", dimensionNumber: 0, sign: 1,
    opposite: undefined as any,
    adjacent: undefined as any
  },
};

DIRECTION.left.opposite = DIRECTION.right
DIRECTION.right.opposite = DIRECTION.left
DIRECTION.top.opposite = DIRECTION.bottom
DIRECTION.bottom.opposite = DIRECTION.top

DIRECTION.left.adjacent = DIRECTION.top
DIRECTION.right.adjacent = DIRECTION.bottom
DIRECTION.top.adjacent = DIRECTION.right
DIRECTION.bottom.adjacent = DIRECTION.left



export const AXIS = {
  x: {
    name: "x", min: "top", max: "bottom",
    edges: ["left", "right"], dimensionNumber: 1, sign: 1,
    opposite: undefined as any,
    adjacent: undefined as any
  },
  y: {
    name: "y", min: "left", max: "right",
    edges: ["top", "bottom"], dimensionNumber: 0, sign: 1,
    opposite: undefined as any,
    adjacent: undefined as any
  },
}
AXIS.x.opposite = AXIS.x
AXIS.y.opposite = AXIS.y

AXIS.x.adjacent = AXIS.y
AXIS.y.adjacent = AXIS.x
