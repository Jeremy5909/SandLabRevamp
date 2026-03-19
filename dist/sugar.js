// This file contains functions that help you to work with cells
// They don't add any extra functionality
// They just make your code more readable
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var split = function (cell, _a) {
    var rows = _a[0], columns = _a[1];
    var _b = cell.bounds, left = _b.left, right = _b.right, top = _b.top, bottom = _b.bottom;
    var _c = cell.dimensions, width = _c[0], height = _c[1];
    var splitWidth = width / columns;
    var splitHeight = height / rows;
    var cells = [];
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
            //for (let i = rows - 1; i >= 0; i--) {
            //	for (let j = columns - 1; j >= 0; j--) {
            var splitCell = new Cell({
                bounds: {
                    left: left + j * splitWidth,
                    top: top + i * splitHeight,
                    right: right - (columns - j - 1) * splitWidth,
                    bottom: bottom - (rows - i - 1) * splitHeight,
                },
                colour: cell.colour,
            });
            cells.push(splitCell);
        }
    }
    return cells;
};
// Chop a cell into smaller cells along an axis
// The targets are the positions along the axis where the cells should be chopped
var chop = function (cell, axis, targets) {
    var _a;
    if (targets.length === 0) {
        return [cell];
    }
    var direction = AXIS[axis];
    targets = targets
        .sort(function (a, b) { return a - b; })
        .filter(function (v, i) {
        var previous = targets[i - 1];
        return previous === undefined || v !== previous;
    });
    var cells = [];
    var currentTarget = cell.bounds[direction.min];
    for (var i = 0; i <= targets.length; i++) {
        var target = targets[i] || cell.bounds[direction.max];
        if (target === currentTarget) {
            continue;
        }
        var bounds = (_a = {},
            _a[direction.min] = currentTarget,
            _a[direction.max] = target,
            _a[direction.adjacent.min] = cell.bounds[direction.adjacent.min],
            _a[direction.adjacent.max] = cell.bounds[direction.adjacent.max],
            _a);
        var choppedCell = new Cell({
            bounds: bounds,
            colour: cell.colour,
        });
        cells.push(choppedCell);
        currentTarget = target;
    }
    return cells;
};
// From an array of cells, return a single cell that encompasses all of them
// This assumes that the cells are all connected via touching
// The cells can be in any order and can have different dimensions
var merge = function (cells, colour) {
    if (colour === void 0) { colour = cells[0].colour; }
    if (cells.length === 0) {
        throw new Error("Cannot merge 0 cells");
    }
    var left = Infinity;
    var top = Infinity;
    var right = -Infinity;
    var bottom = -Infinity;
    for (var _i = 0, cells_1 = cells; _i < cells_1.length; _i++) {
        var cell = cells_1[_i];
        var bounds = cell.bounds;
        left = Math.min(left, bounds.left);
        top = Math.min(top, bounds.top);
        right = Math.max(right, bounds.right);
        bottom = Math.max(bottom, bounds.bottom);
    }
    return new Cell({
        colour: colour,
        bounds: {
            left: left,
            top: top,
            right: right,
            bottom: bottom,
        },
    });
};
var reposition = function (cell, bounds) {
    return new Cell({
        colour: cell.colour,
        bounds: __assign(__assign({}, cell.bounds), bounds),
    });
};
var recolour = function (cell, colour) {
    return new Cell({
        colour: colour,
        bounds: cell.bounds,
    });
};
var getNeighbours = function (cell, world) {
    return {
        left: getNeighbour(cell, world, "left"),
        right: getNeighbour(cell, world, "right"),
        top: getNeighbour(cell, world, "top"),
        bottom: getNeighbour(cell, world, "bottom"),
    };
};
var getNeighbour = function (cell, world, edge) {
    var direction = DIRECTION[edge];
    var opposite = direction.opposite;
    var oppositeEdge = opposite.name;
    var front = cell.bounds[edge];
    var min = cell.bounds[direction.min];
    var max = cell.bounds[direction.max];
    var neighbours = pickContacts(cell, world, edge);
    for (var _i = 0, neighbours_1 = neighbours; _i < neighbours_1.length; _i++) {
        var neighbour = neighbours_1[_i];
        if (front !== neighbour.bounds[oppositeEdge])
            continue;
        if (min !== neighbour.bounds[direction.min])
            continue;
        if (max !== neighbour.bounds[direction.max])
            continue;
        return neighbour;
    }
};
// Pick an array of cells that are adjacent and touching the given cell
var pickContacts = function (cell, world, edge) {
    if (edge === void 0) { edge = "right"; }
    var bounds = cell.bounds;
    var direction = DIRECTION[edge];
    var opposite = direction.opposite;
    var oppositeEdge = opposite.name;
    var front = bounds[edge];
    var min = bounds[direction.min];
    var max = bounds[direction.max];
    var cache = world.caches[oppositeEdge];
    var set = cache.get(front);
    if (set === undefined) {
        return [];
    }
    var cells = [];
    for (var _i = 0, set_1 = set; _i < set_1.length; _i++) {
        var other = set_1[_i];
        var otherMin = other.bounds[direction.min];
        var otherMax = other.bounds[direction.max];
        // Check if the cells overlap in any way at all
        if (otherMin >= max || otherMax <= min) {
            continue;
        }
        cells.push(other);
    }
    return cells;
};
// Abstract the logic of isolating contacts from moveDown
var snipContacts = function (cell, contacts, edge, reach) {
    if (reach === void 0) { reach = Infinity; }
    var direction = DIRECTION[edge];
    var opposite = direction.opposite;
    var adjacent = direction.adjacent;
    var oppositeEdge = opposite.name;
    var contactReach = Math.min.apply(Math, __spreadArray([reach], contacts.map(function (contact) { return contact.dimensions[adjacent.dimensionNumber]; }), false));
    var signedReach = contactReach * direction.sign;
    var sizeds = [];
    var excesses = [];
    for (var _i = 0, contacts_1 = contacts; _i < contacts_1.length; _i++) {
        var contact = contacts_1[_i];
        var bounds = contact.bounds;
        var chops = chop(contact, direction.adjacent.axis, [bounds[oppositeEdge] + signedReach]);
        if (direction.sign === 1) {
            var sized = chops[0], excess = chops[1];
            sizeds.push(sized);
            if (excess !== undefined) {
                excesses.push(excess);
            }
        }
        else {
            var head = chops[0], tail = chops[1];
            if (tail !== undefined) {
                sizeds.push(tail);
                excesses.push(head);
            }
            else {
                sizeds.push(head);
            }
        }
    }
    // If any sizedContacts overlap the cell, chop them off
    var cellMin = cell.bounds[direction.min];
    var cellMax = cell.bounds[direction.max];
    var snips = [];
    for (var _a = 0, sizeds_1 = sizeds; _a < sizeds_1.length; _a++) {
        var sized = sizeds_1[_a];
        // If the contact overlaps with the min of the cell, chop it off
        var sizedMin = sized.bounds[direction.min];
        if (sizedMin < cellMin) {
            var _b = chop(sized, direction.axis, [cellMin]), excess = _b[0], snip = _b[1];
            sized = snip;
            excesses.push(excess);
        }
        // If the contact overlaps with the max of the cell, chop it off
        var sizedMax = sized.bounds[direction.max];
        if (sizedMax > cellMax) {
            var _c = chop(sized, direction.axis, [cellMax]), snip = _c[0], excess = _c[1];
            sized = snip;
            excesses.push(excess);
        }
        // Now we're left with a contact that fits perfectly inside the cell
        snips.push(sized);
    }
    return [snips, excesses, contactReach];
};
var pickSnips = function (cell, world, edge, reach) {
    var contacts = pickContacts(cell, world, edge);
    var _a = snipContacts(cell, contacts, edge, reach), snips = _a[0], excesses = _a[1], maxReach = _a[2];
    return { contacts: contacts, snips: snips, excesses: excesses, reach: maxReach };
};
// Edge could technically be determined from the snips, but it's easier to pass them in
var swapSnips = function (cell, snips, edge) {
    var _a, _b;
    var direction = DIRECTION[edge];
    var adjacent = direction.adjacent;
    var opposite = direction.opposite;
    var oppositeEdge = opposite.name;
    //const snipsSize = snips[0].dimensions[adjacent.dimensionNumber] //all snips should be the same size
    var cellSize = cell.dimensions[adjacent.dimensionNumber];
    // front   snip     cell
    // middle  middle   middle
    // back    cell     snip
    var front = snips[0].bounds[edge];
    var back = cell.bounds[oppositeEdge];
    var middle = front - cellSize * direction.sign;
    //const middle2 = back + snipsSize * direction.sign
    //print(middle, middle2)
    var newCell = reposition(cell, (_a = {},
        _a[edge] = direction.sign === 1 ? front : front,
        _a[oppositeEdge] = direction.sign === 1 ? middle : middle,
        _a));
    var newSnips = [];
    for (var _i = 0, snips_1 = snips; _i < snips_1.length; _i++) {
        var snip = snips_1[_i];
        var newSnip = reposition(snip, (_b = {},
            _b[oppositeEdge] = direction.sign === 1 ? back : back,
            _b[edge] = direction.sign === 1 ? middle : middle,
            _b));
        newSnips.push(newSnip);
    }
    return __spreadArray([newCell], newSnips, true);
};
var defaultJudge = function (cells) {
    var areas = cells.map(function (cell) { return cell.dimensions[0] * cell.dimensions[1]; });
    var maxArea = Math.max.apply(Math, areas);
    return maxArea;
};
var defaultCompare = function (a, b) {
    if (b === void 0) { b = -Infinity; }
    return a > b;
};
var defaultFilter = function (cell) {
    var age = shared.clock - cell.birth;
    return age > 0;
};
// 'Sleeping' means merging with a nearby cell so that we don't have to
// update or draw this cell every frame
//
// This function makes a cell look for a nearby cell (of the same colour) to merge with
// If it finds one, it merges with it and returns any cells created
// If it doesn't find one, it returns an empty array
//
// There are some different ways a merge could happen:
// 1. The cell is touching a cell that perfectly lines up with it
// 2. The cell is touching a bigger cell that can be split into multiple cells that line up with it
// 3. Probably more
var tryToSleep = function (cell, world, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.edges, edges = _c === void 0 ? Object.keys(DIRECTION) : _c, _d = _b.judge, judge = _d === void 0 ? defaultJudge : _d, _e = _b.compare, compare = _e === void 0 ? defaultCompare : _e, _f = _b.filter, filter = _f === void 0 ? defaultFilter : _f;
    var winner = undefined;
    var highScore = undefined;
    for (var _i = 0, _g = shuffleArray(edges); _i < _g.length; _i++) {
        var edge = _g[_i];
        var replacement = sleep(cell, world, edge, filter);
        var oldCells_1 = replacement.oldCells, newCells_1 = replacement.newCells;
        if (newCells_1.length === 0)
            continue;
        var newScore = judge(newCells_1);
        var oldScore = judge(oldCells_1);
        if (compare(newScore, oldScore) && compare(newScore, highScore)) {
            highScore = newScore;
            winner = replacement;
        }
    }
    if (winner === undefined) {
        return [];
    }
    var oldCells = winner.oldCells, newCells = winner.newCells;
    return world.replace(oldCells, newCells);
};
var average = function (array) { return array.reduce(function (a, b) { return a + b; }, 0) / array.length; };
var scoresAreBetter = function (a, b) {
    for (var i = 0; i < a.length; i++) {
        if (b[i] === undefined)
            return true;
        if (a[i] === undefined)
            return false;
        if (a[i] === b[i])
            continue;
        return a[i] > b[i];
    }
    return false;
};
var equals = function (a, b) {
    if (a === b)
        return true;
    if (a.length !== b.length)
        return false;
    for (var i = 0; i < a.length; i++) {
        if (a[i] !== b[i])
            return false;
    }
    return true;
};
// Returns a list of replacements that should be done
var move = function (cell, world, edge, speed, minSize) {
    if (minSize === void 0) { minSize = 0; }
    var direction = DIRECTION[edge];
    var below = pickSnips(cell, world, edge, speed);
    if (below.snips.length === 0) {
        return [];
    }
    var water = cell;
    // If there isn't solid below, fall
    if (below.snips.every(function (c) { return !SOLID.has(c.colour.splash) && c.colour.splash !== cell.splash; })) {
        var movedCells = swapSnips(water, below.snips, edge);
        return [
            __spreadArray([cell], below.contacts, true),
            __spreadArray(__spreadArray([], below.excesses, true), movedCells, true),
        ];
    }
    // If there are some gaps below, fall into those bits
    var gaps = below.snips.filter(function (c) { return !SOLID.has(c.colour.splash) && c.colour.splash !== cell.splash; });
    if (gaps.length > 0) {
        // Cut myself up into gap-sized pieces
        var targets = gaps.map(function (v) { return [v.bounds[direction.min], v.bounds[direction.max]]; }).flat();
        var pieces = chop(water, direction.axis, targets);
        for (var _i = 0, pieces_1 = pieces; _i < pieces_1.length; _i++) {
            var piece = pieces_1[_i];
            if (water.dimensions[direction.dimensionNumber] >= minSize &&
                piece.dimensions[direction.dimensionNumber] <= minSize) {
                return [];
            }
        }
        3;
        return [[water], __spreadArray([], pieces, true)];
    }
    return [];
};
var sleep = function (cell, world, edge, filter) {
    var failure = { oldCells: [], newCells: [] };
    var direction = DIRECTION[edge];
    // Get all the cells that are touching this cell (in a randomly ordered array)
    var contacts = pickContacts(cell, world, edge).filter(filter);
    // If there are no contacts, we can't merge with anything
    if (contacts.length === 0) {
        return failure;
    }
    // Shuffle the contacts so that we don't always merge with the same cell
    var candidates = shuffleArray(contacts);
    var splitCandidates = [];
    // Loop through all the candidates
    // If we find a cell that we can merge with, we'll merge with it and return true
    for (var _i = 0, candidates_1 = candidates; _i < candidates_1.length; _i++) {
        var candidate = candidates_1[_i];
        // If the candidate is a different colour, we can't merge with it
        if (!equals(candidate.colour, cell.colour)) {
            continue;
        }
        // TODO: This should chop off more cleverly, rather than just sleep with anything
        // If the candidate is the exact same size as us, we can merge with it
        if (candidate.bounds[direction.min] === cell.bounds[direction.min] &&
            candidate.bounds[direction.max] === cell.bounds[direction.max]) {
            var newCells = [merge([cell, candidate])];
            var oldCells = [cell, candidate];
            return { oldCells: oldCells, newCells: newCells };
        }
        // If the candidate is smaller at either end, we can't merge with it
        if (candidate.bounds[direction.min] > cell.bounds[direction.min] ||
            candidate.bounds[direction.max] < cell.bounds[direction.max]) {
            continue;
        }
        // Otherwise, the candidate is bigger than us
        // We can split the candidate into multiple cells that line up with us
        // Then we can merge with one of those cells
        // (we should use the chop function for this because it allows us more control over the split)
        splitCandidates.push(candidate);
    }
    var _loop_1 = function (candidate) {
        // Where should we split the candidate?
        // We might need to chop in two places, or just one
        var targets = [];
        var mergeIndex = 0;
        if (candidate.bounds[direction.min] < cell.bounds[direction.min]) {
            targets.push(cell.bounds[direction.min]);
            mergeIndex = 1;
        }
        if (candidate.bounds[direction.max] > cell.bounds[direction.max]) {
            targets.push(cell.bounds[direction.max]);
        }
        // Split the candidate into multiple cells
        var splitCells = chop(candidate, direction.axis, targets);
        // Merge with one of the split cells
        var mergedCell = merge([cell, splitCells[mergeIndex]]);
        // Return all the cells we created
        var oldCells = [cell, candidate];
        var newCells = __spreadArray([mergedCell], splitCells.filter(function (c, i) { return i !== mergeIndex; }), true);
        return { value: { oldCells: oldCells, newCells: newCells } };
    };
    // TODO: Remove this loop
    // There should only ever be one candidate that we can merge with
    // so this is a pointless loop
    for (var _a = 0, splitCandidates_1 = splitCandidates; _a < splitCandidates_1.length; _a++) {
        var candidate = splitCandidates_1[_a];
        var state_1 = _loop_1(candidate);
        if (typeof state_1 === "object")
            return state_1.value;
    }
    return failure;
};
// Get the distance from a point to any point on the bounds of a rectangle or inside the rectangle
var distanceToBounds = function (point, bounds) {
    var x = point.x, y = point.y;
    var left = bounds.left, right = bounds.right, top = bounds.top, bottom = bounds.bottom;
    var dx = Math.max(left - x, 0, x - right);
    var dy = Math.max(top - y, 0, y - bottom);
    return Math.sqrt(dx * dx + dy * dy);
};
//# sourceMappingURL=sugar.js.map