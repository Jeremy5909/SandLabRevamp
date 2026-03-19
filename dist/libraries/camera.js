var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
// CAMERA //
//========//
export var View = /** @class */ (function () {
    function class_1(options) {
        if (options === void 0) { options = {}; }
        Object.assign(this, __assign({ position: [0.0, 0.0], dimensions: [1.0, 1.0] }, options));
    }
    // world position -> view position
    class_1.prototype.cast = function (position) {
        var _a = add(position, this.position), x = _a[0], y = _a[1];
        var _b = this.dimensions, width = _b[0], height = _b[1];
        return [x / width, y / height];
    };
    // view position -> world position
    class_1.prototype.get = function (position) {
        var x = position[0], y = position[1];
        var _a = this.dimensions, width = _a[0], height = _a[1];
        return subtract([x * width, y * height], this.position);
    };
    // World position at center of view
    class_1.prototype.getCenter = function () {
        return this.get([0.5, 0.5]);
    };
    // World bounds of the view
    class_1.prototype.getBounds = function () {
        var a = this.position;
        var b = add(this.position, this.dimensions);
        return {
            left: Math.min(a[0], b[0]),
            right: Math.max(a[0], b[0]),
            top: Math.min(a[1], b[1]),
            bottom: Math.max(a[1], b[1]),
        };
    };
    // Pan the view by a given amount
    class_1.prototype.pan = function (displacement) {
        this.position = add(this.position, displacement);
    };
    // Zoom the view by a given amount, centered at a given point
    class_1.prototype.zoom = function (scale, center) {
        if (center === void 0) { center = this.getCenter(); }
        var _a = this.position, x = _a[0], y = _a[1];
        var _b = this.dimensions, width = _b[0], height = _b[1];
        this.position = add(this.position, multiply(subtract(center, this.position), 1 - scale));
        this.dimensions = multiply([width, height], scale);
    };
    // Is a given world position within the view?
    class_1.prototype.contains = function (position) {
        var _a = this.getBounds(), left = _a.left, right = _a.right, top = _a.top, bottom = _a.bottom;
        var x = position[0], y = position[1];
        return x >= left && x <= right && y >= top && y <= bottom;
    };
    class_1.prototype.resize = function (dimensions) {
        this.dimensions = dimensions;
    };
    return class_1;
}());
// Camera is a view that can be moved and zoomed smoothly by the user
export var Camera = /** @class */ (function (_super) {
    __extends(Camera, _super);
    function Camera(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.registerControls();
        return _this;
    }
    Camera.prototype.registerControls = function () {
        var _this = this;
        // Register keyboard event listeners
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); }, { passive: false });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); }, { passive: false });
        // Register pointer event listeners
        window.addEventListener("pointerdown", function (e) { return _this.onPointerDown(e); }, { passive: false });
        window.addEventListener("pointermove", function (e) { return _this.onPointerMove(e); }, { passive: false });
        window.addEventListener("pointerup", function (e) { return _this.onPointerUp(e); }, { passive: false });
        window.addEventListener("pointercancel", function (e) { return _this.onPointerUp(e); }, { passive: false });
        window.addEventListener("pointerleave", function (e) { return _this.onPointerUp(e); }, { passive: false });
        // Register wheel event listener
        window.addEventListener("wheel", function (e) { return _this.onWheel(e); }, { passive: false });
    };
    return Camera;
}(View));
//# sourceMappingURL=camera.js.map