var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
ELEMENTS.set(YELLOW.splash, {
    name: "Sand",
    key: ["s", "1"],
    update: function (cell, world) {
        var movements = move(cell, world, "bottom", FALL_SPEED);
        if (movements.length > 0) {
            return world.replace.apply(world, movements);
        }
        if (cell.dimensions[1] > MIN_SIZE) {
            var _a = split(cell, [2, 1]), above = _a[0], me = _a[1];
            var splitReplacements = [[cell], [above, me]];
            var slideDirection = randomFrom(["left", "right"]);
            var movements_1 = move(above, world, slideDirection, FALL_SPEED);
            if (movements_1.length > 0) {
                var splittings = world.replace.apply(world, splitReplacements);
                var movings = world.replace.apply(world, movements_1);
                return __spreadArray(__spreadArray([], splittings, true), movings, true);
            }
        }
        return tryToSleep(cell, world);
    },
});
//# sourceMappingURL=sand.js.map