var ELEMENTS = new Map();
var pointer = getPointer();
on("keydown", function (event) {
    for (var _i = 0, ELEMENTS_1 = ELEMENTS; _i < ELEMENTS_1.length; _i++) {
        var _a = ELEMENTS_1[_i], splash = _a[0], element = _a[1];
        if (element.key.includes(event.key)) {
            shared.brush.colour = new Splash(splash).d;
            return;
        }
    }
}, { passive: false });
var FALL_SPEED = 1 / 128;
var MIN_SIZE = 1 / 256;
var POINTER_RADIUS = 0.0; //0.03
var POINTER_FADE_RADIUS = 0.0; //0.1
var POINTER_CELL_SIZE = 1 / 4; //1 / 256
var AIR_TARGET = 1 / 32;
var getPointerAirTarget = function (cell) {
    if (pointer.position.x === undefined) {
        return AIR_TARGET;
    }
    var pointerPosition = camera.cast(scale(pointer.position, devicePixelRatio));
    var distanceFromPointer = distanceToBounds(pointerPosition, cell.bounds);
    if (distanceFromPointer < POINTER_RADIUS) {
        return POINTER_CELL_SIZE;
    }
    else if (distanceFromPointer < POINTER_FADE_RADIUS) {
        return lerp([POINTER_CELL_SIZE, 1], distanceFromPointer - POINTER_RADIUS);
    }
    return AIR_TARGET;
};
var SOLID = new Set([YELLOW.splash, GREEN.splash, SILVER.splash]);
//# sourceMappingURL=element.js.map