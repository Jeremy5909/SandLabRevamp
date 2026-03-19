var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
//========//
// SHARED //
//========//
var shared = {
    clock: 0,
    brush: {
        colour: YELLOW,
    },
};
//------ NO SHARED CREATED BELOW THIS LINE ------//
//======//
// CELL //
//======//
var Cell = /** @class */ (function () {
    function class_1(options) {
        if (options === void 0) { options = {}; }
        // Properties
        Object.assign(this, __assign({ bounds: {
                left: 0.0,
                right: 1.0,
                top: 0.0,
                bottom: 1.0,
            }, colour: BLACK }, options));
        // Internal
        this.birth = shared.clock;
        // Caches
        this.splash = this.colour.splash;
        var x = this.bounds.left;
        var y = this.bounds.top;
        this.position = [x, y];
        var width = this.bounds.right - this.bounds.left;
        var height = this.bounds.bottom - this.bounds.top;
        this.dimensions = [width, height];
        // Check for rounding errors
        var widthTest1 = this.bounds.left + width === this.bounds.right;
        var widthTest2 = this.bounds.right - width === this.bounds.left;
        var heightTest1 = this.bounds.top + height === this.bounds.bottom;
        var heightTest2 = this.bounds.bottom - height === this.bounds.top;
        if (!widthTest1) {
            console.error("Cell bounds are not consistent with dimensions", this.bounds.left + width, this.bounds.right);
        }
        if (!widthTest2) {
            console.error("Cell bounds are not consistent with dimensions", this.bounds.right - width, this.bounds.left);
        }
        if (!heightTest1) {
            console.error("Cell bounds are not consistent with dimensions", this.bounds.top + height, this.bounds.bottom);
        }
        if (!heightTest2) {
            console.error("Cell bounds are not consistent with dimensions", this.bounds.bottom - height, this.bounds.top);
        }
    }
    class_1.prototype.clear = function (image) {
        var colour = this.colour;
        this.colour = VOID;
        this.draw(image);
        this.colour = colour;
    };
    class_1.prototype.draw = function (image) {
        var _a = [this.position.x * image.width, this.position.y * image.height], x = _a[0], y = _a[1];
        var _b = [this.dimensions[0] * image.width, this.dimensions[1] * image.height], width = _b[0], height = _b[1];
        var left = Math.floor(x);
        var right = Math.floor(x + width);
        var top = Math.floor(y);
        var bottom = Math.floor(y + height);
        var drawnWidth = right - left;
        var drawnHeight = bottom - top;
        var i = getPixelIndex(image, left, top);
        // Set the image data of every pixel in the cell
        // The border is 1 pixel thick and void coloured
        var BORDER_WIDTH = Math.min(1, Math.min(drawnWidth, drawnHeight) / 10);
        if (BORDER_WIDTH < 1) {
            if (BORDER_WIDTH > 0.4) {
                BORDER_WIDTH = 1;
            }
            else {
                BORDER_WIDTH = 1;
            }
        }
        var area = this.dimensions[0] * this.dimensions[1];
        //const fillColour = lerp([[0, 0, 0], GREEN], area ** 0.25).map((v) => Math.floor(v))
        var fillColour = this.colour;
        for (var y_1 = top; y_1 <= bottom; y_1++) {
            for (var x_1 = left; x_1 <= right; x_1++) {
                var isBorder = BORDER_WIDTH > 0 &&
                    (x_1 < left + BORDER_WIDTH ||
                        x_1 > right - BORDER_WIDTH ||
                        y_1 < top + BORDER_WIDTH ||
                        y_1 > bottom - BORDER_WIDTH);
                var colour = isBorder ? VOID : fillColour;
                image.data[i + 0] = colour[0];
                image.data[i + 1] = colour[1];
                image.data[i + 2] = colour[2];
                i += 4;
            }
            i += (image.width - drawnWidth - 1) * 4;
        }
    };
    return class_1;
}());
//=======//
// IMAGE //
//=======//
var getPixelIndex = function (image, x, y) {
    return (x + y * image.width) * 4;
};
// Function that sets the alpha channel of every pixel
var setImageAlpha = function (image, alpha) {
    for (var i = 3; i < image.data.length; i += 4) {
        image.data[i] = alpha;
    }
};
//=======//
// WORLD //
//=======//
var World = /** @class */ (function () {
    function World(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.colour, colour = _c === void 0 ? BLACK : _c;
        // Properties
        this.cells = new Set();
        // Caches
        this.caches = {
            left: new Map(),
            right: new Map(),
            top: new Map(),
            bottom: new Map(),
        };
        // Setup
        this.add(new Cell({ colour: colour }));
    }
    World.prototype.add = function (cell) {
        this.cells.add(cell);
        this.cache(cell);
    };
    World.prototype.delete = function (cell) {
        this.cells.delete(cell);
        this.uncache(cell);
    };
    World.prototype.cache = function (cell) {
        for (var key in DIRECTION) {
            var cache = this.caches[key];
            var address = cell.bounds[key];
            var set = cache.get(address);
            if (set === undefined) {
                set = new Set();
                cache.set(address, set);
            }
            set.add(cell);
        }
    };
    World.prototype.uncache = function (cell) {
        for (var key in DIRECTION) {
            var cache = this.caches[key];
            var address = cell.bounds[key];
            var set = cache.get(address);
            set.delete(cell);
            if (set.size === 0) {
                cache.delete(address);
            }
        }
    };
    World.prototype.draw = function (image) {
        for (var _i = 0, _a = this.cells; _i < _a.length; _i++) {
            var cell = _a[_i];
            cell.draw(image);
        }
    };
    World.prototype.replace = function (cells, newCells) {
        for (var _i = 0, cells_1 = cells; _i < cells_1.length; _i++) {
            var cell = cells_1[_i];
            this.delete(cell);
        }
        for (var _a = 0, newCells_1 = newCells; _a < newCells_1.length; _a++) {
            var newCell = newCells_1[_a];
            newCell.birth = shared.clock;
            this.add(newCell);
        }
        return newCells;
    };
    World.prototype.pick = function (position) {
        var x = position[0], y = position[1];
        for (var _i = 0, _a = this.cells; _i < _a.length; _i++) {
            var cell = _a[_i];
            var _b = cell.position, left = _b[0], top_1 = _b[1];
            var _c = [left + cell.dimensions[0], top_1 + cell.dimensions[1]], right = _c[0], bottom = _c[1];
            if (x >= left && x <= right && y >= top_1 && y <= bottom) {
                return cell;
            }
        }
    };
    return World;
}());
//========//
// COLOUR //
//========//
var getSplashDigits = function (splash) {
    var chars = splash.toString().padStart(3, "0").split("");
    var digits = chars.map(function (v) { return parseInt(v); });
    return digits;
};
var mutateSplash = function (splash) {
    var digits = getSplashDigits(splash);
    digits[0] = clamp(digits[0] + randomFrom([0, -1, -1]), 0, 9);
    digits[1] = clamp(digits[1] + randomFrom([-1, 0, 1]), 0, 9);
    digits[2] = clamp(digits[2] + randomFrom([-1, 0, 1]), 0, 9);
    return parseInt(digits.join(""));
};
//===========//
// DIRECTION //
//===========//
var DIRECTION = {
    left: {
        name: "left",
        min: "top",
        max: "bottom",
        axis: "x",
        dimensionNumber: 1,
        sign: -1,
    },
    right: {
        name: "right",
        min: "top",
        max: "bottom",
        axis: "x",
        dimensionNumber: 1,
        sign: 1,
    },
    top: {
        name: "top",
        min: "left",
        max: "right",
        axis: "y",
        dimensionNumber: 0,
        sign: -1,
    },
    bottom: {
        name: "bottom",
        min: "left",
        max: "right",
        axis: "y",
        dimensionNumber: 0,
        sign: 1,
    },
};
DIRECTION.left.opposite = DIRECTION.right;
DIRECTION.right.opposite = DIRECTION.left;
DIRECTION.top.opposite = DIRECTION.bottom;
DIRECTION.bottom.opposite = DIRECTION.top;
DIRECTION.left.adjacent = DIRECTION.top;
DIRECTION.right.adjacent = DIRECTION.bottom;
DIRECTION.top.adjacent = DIRECTION.right;
DIRECTION.bottom.adjacent = DIRECTION.left;
var AXIS = {
    x: {
        name: "x",
        min: "top",
        max: "bottom",
        edges: ["left", "right"],
        dimensionNumber: 1,
        sign: 1,
    },
    y: {
        name: "y",
        min: "left",
        max: "right",
        edges: ["top", "bottom"],
        dimensionNumber: 0,
        sign: 1,
    },
};
AXIS.x.opposite = AXIS.x;
AXIS.y.opposite = AXIS.y;
AXIS.x.adjacent = AXIS.y;
AXIS.y.adjacent = AXIS.x;
//------ NO GLOBALS USED ABOVE THIS LINE ------//
//========//
// GLOBAL //
//========//
var global = {
    world: new World({ colour: GREY }),
    camera: new View(),
    image: undefined,
};
//===========//
// GAME LOOP //
//===========//
var stage = new Stage({ speed: 2.0, paused: false });
stage.start = function (context) {
    var canvas = context.canvas;
    canvas.style["background-color"] = VOID;
};
stage.resize = function (context) {
    var world = global.world, camera = global.camera;
    var canvas = context.canvas;
    // Resize camera
    var size = Math.min(canvas.width, canvas.height);
    camera.resize([size, size]);
    // Resize image
    var image = context.createImageData(size, size);
    setImageAlpha(image, 255);
    global.image = image;
    // Redraw world
    world.draw(image);
    var _a = camera.get([0, 0]), x = _a[0], y = _a[1];
    context.putImageData(image, x, y);
};
stage.tick = function (context) {
    var canvas = context.canvas;
    var image = global.image, camera = global.camera;
    var _a = camera.get([0, 0]), x = _a[0], y = _a[1];
    // debug: redraw entire world
    //global.world.draw(image)
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.putImageData(image, x, y);
};
stage.update = function (context) {
    var world = global.world, image = global.image, camera = global.camera;
    shared.clock = wrap(shared.clock + 1, 0, 999);
    // Update cells
    for (var _i = 0, _a = world.cells; _i < _a.length; _i++) {
        var cell = _a[_i];
        if (cell.birth === shared.clock) {
            continue;
        }
        var element = ELEMENTS.get(cell.colour.splash);
        if (element === undefined) {
            continue;
        }
        if (element.update !== undefined) {
            var newCells = element.update(cell, world);
            for (var _b = 0, newCells_2 = newCells; _b < newCells_2.length; _b++) {
                var newCell = newCells_2[_b];
                newCell.draw(image);
            }
        }
    }
    // Place cells with the pointer
    var pointer = getPointer();
    if (pointer.down) {
        var colour = shared.brush.colour;
        var cell = world.pick(camera.cast(scale(pointer.position, devicePixelRatio)));
        var canWrite = cell && (colour.splash === AIR_SPLASH || cell.colour.splash === AIR_SPLASH);
        if (canWrite) {
            var newCell = recolour(cell, colour);
            world.replace([cell], [newCell]);
            cell.clear(image);
            newCell.draw(image);
        }
    }
};
Object.assign(window, global);
Object.assign(window, shared);
//# sourceMappingURL=script.js.map