var AIR_SPLASH = GREY.splash;
ELEMENTS.set(AIR_SPLASH, {
    name: "Air",
    key: ["0"],
    update: function (cell, world) {
        var target = getPointerAirTarget(cell);
        var dimensionErrorScale = cell.dimensions.map(function (v) { return v / target; });
        // Function that finds the error of all cells from their target size
        var judge = function (cells) {
            var errors = [];
            var _loop_1 = function (cell_1) {
                if (cell_1.dimensions[0] < MIN_SIZE || cell_1.dimensions[1] < MIN_SIZE) {
                    //errors.push(Infinity)
                    //continue
                }
                var target_1 = getPointerAirTarget(cell_1);
                var dimensionErrorScale_1 = cell_1.dimensions.map(function (v) { return v / target_1; });
                var dimensionErrorDiff = dimensionErrorScale_1.map(function (v) { return Math.abs(1 - v); });
                var errorDiff = Math.max(dimensionErrorDiff[0], dimensionErrorDiff[1]);
                errors.push(errorDiff);
            };
            for (var _i = 0, cells_1 = cells; _i < cells_1.length; _i++) {
                var cell_1 = cells_1[_i];
                _loop_1(cell_1);
            }
            var sum = errors.reduce(function (a, b) { return a + b; }, 0);
            var average = sum / errors.length;
            var score = -average;
            return score;
        };
        var compareSplit = function (a, b) {
            if (b === void 0) { b = -Infinity; }
            return a >= b;
        };
        var compare = function (a, b) {
            if (b === void 0) { b = -Infinity; }
            return a >= b;
        };
        // If a cell is too big, try to split it
        var veryTooWide = dimensionErrorScale[0] >= 2.0;
        var veryTooTall = dimensionErrorScale[1] >= 2.0;
        if (veryTooWide || veryTooTall) {
            var columns = veryTooTall ? 2 : 1;
            var rows = veryTooWide ? 2 : 1;
            var splitCells = split(cell, [columns, rows]);
            // Judge the split cells and use them if they're better
            var splitScores = judge(splitCells);
            var originalScores = judge([cell]);
            if (compareSplit(splitScores, originalScores)) {
                return world.replace([cell], splitCells);
            }
        }
        // If a cell is too small, try to sleep it
        var tooThin = dimensionErrorScale[1] < 1.0;
        var tooShort = dimensionErrorScale[0] < 1.0;
        if (tooThin && tooShort) {
            return tryToSleep(cell, world, { judge: judge, compare: compare });
        }
        if (tooThin) {
            var result = tryToSleep(cell, world, { edges: ["top", "bottom"], judge: judge, compare: compare });
            if (result.length > 0) {
                return result;
            }
        }
        if (tooShort) {
            var result = tryToSleep(cell, world, { edges: ["left", "right"], judge: judge, compare: compare });
            if (result.length > 0) {
                return result;
            }
        }
        return [];
    },
});
//# sourceMappingURL=air.js.map