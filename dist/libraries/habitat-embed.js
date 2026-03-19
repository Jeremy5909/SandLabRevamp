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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
//=============//
// FROGASAURUS //
//=============//
var HabitatFrogasaurus = {};
//========//
// SOURCE //
//========//
{
    //====== ./habitat.js ======
    {
        HabitatFrogasaurus["./habitat.js"] = {};
        var registerMethods_1 = function () {
            registerDebugMethods_1();
            registerColourMethods_1();
            registerVectorMethods_1();
        };
        var registerGlobals_1 = function () {
            Object.assign(window, Habitat);
        };
        var registerEverything = function () {
            registerGlobals_1();
            registerMethods_1();
        };
        HabitatFrogasaurus["./habitat.js"].registerMethods = registerMethods_1;
        HabitatFrogasaurus["./habitat.js"].registerGlobals = registerGlobals_1;
        HabitatFrogasaurus["./habitat.js"].registerEverything = registerEverything;
    }
    //====== ./html.js ======
    {
        HabitatFrogasaurus["./html.js"] = {};
        var HTML = function (source) {
            var template = document.createElement("template");
            template.innerHTML = source;
            var content = template.content;
            if (content.childElementCount === 1) {
                return content.firstChild;
            }
            return template.content;
        };
        HabitatFrogasaurus["./html.js"].HTML = HTML;
    }
    //====== ./number.js ======
    {
        HabitatFrogasaurus["./number.js"] = {};
        var clamp = function (number, min, max) {
            if (number < min)
                return min;
            if (number > max)
                return max;
            return number;
        };
        var wrap = function (number, min, max) {
            var range = max - min + 1;
            while (number < min)
                number += range;
            while (number > max)
                number -= range;
            return number;
        };
        var getDigits = function (number) {
            var chars = number.toString().split("");
            var digits = chars.map(function (v) { return parseInt(v); }).filter(function (v) { return !isNaN(v); });
            return digits;
        };
        var gcd_1 = function () {
            var numbers = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                numbers[_i] = arguments[_i];
            }
            var head = numbers[0], tail = numbers.slice(1);
            if (numbers.length === 1)
                return head;
            if (numbers.length > 2)
                return gcd_1(head, gcd_1.apply(void 0, tail));
            var _a = __spreadArray([head], tail, true), a = _a[0], b = _a[1];
            while (true) {
                if (b === 0)
                    return a;
                a = a % b;
                if (a === 0)
                    return b;
                b = b % a;
            }
        };
        var simplifyRatio = function () {
            var numbers = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                numbers[_i] = arguments[_i];
            }
            var divisor = gcd_1.apply(void 0, numbers);
            return numbers.map(function (n) { return n / divisor; });
        };
        var range = function (start, end) {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = start;
                        if (!(i <= end)) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1: return [4 /*yield*/, i];
                    case 2:
                        _a.sent();
                        i++;
                        _a.label = 3;
                    case 3:
                        if (i <= end) return [3 /*break*/, 1];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        if (!(i >= end)) return [3 /*break*/, 7];
                        return [4 /*yield*/, i];
                    case 6:
                        _a.sent();
                        i--;
                        return [3 /*break*/, 5];
                    case 7: return [2 /*return*/];
                }
            });
        };
        HabitatFrogasaurus["./number.js"].clamp = clamp;
        HabitatFrogasaurus["./number.js"].wrap = wrap;
        HabitatFrogasaurus["./number.js"].getDigits = getDigits;
        HabitatFrogasaurus["./number.js"].gcd = gcd_1;
        HabitatFrogasaurus["./number.js"].simplifyRatio = simplifyRatio;
        HabitatFrogasaurus["./number.js"].range = range;
    }
    //====== ./memo.js ======
    {
        HabitatFrogasaurus["./memo.js"] = {};
        var memo = function (func, getKey) {
            if (getKey === void 0) { getKey = JSON.stringify; }
            var cache = new Map();
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var key = getKey(args);
                if (cache.has(key)) {
                    return cache.get(key);
                }
                var result = func.apply(void 0, args);
                cache.set(key, result);
                return result;
            };
        };
        HabitatFrogasaurus["./memo.js"].memo = memo;
    }
    //====== ./random.js ======
    {
        HabitatFrogasaurus["./random.js"] = {};
        var maxRandomNumberIndex_1 = Math.pow(2, 14);
        var randomNumbersBuffer_1 = new Uint32Array(maxRandomNumberIndex_1);
        var randomNumberIndex_1 = Infinity;
        var random_1 = function () {
            if (randomNumberIndex_1 >= maxRandomNumberIndex_1) {
                crypto.getRandomValues(randomNumbersBuffer_1);
                randomNumberIndex_1 = 0;
            }
            var result = randomNumbersBuffer_1[randomNumberIndex_1];
            randomNumberIndex_1++;
            return result;
        };
        var randomFrom = function (array) {
            var index = random_1() % array.length;
            return array[index];
        };
        var oneIn_1 = function (times) { return random_1() % times < 1; };
        var maybe = function (chance) { return oneIn_1(1 / chance); };
        HabitatFrogasaurus["./random.js"].random = random_1;
        HabitatFrogasaurus["./random.js"].randomFrom = randomFrom;
        HabitatFrogasaurus["./random.js"].oneIn = oneIn_1;
        HabitatFrogasaurus["./random.js"].maybe = maybe;
    }
    //====== ./event.js ======
    {
        HabitatFrogasaurus["./event.js"] = {};
        var fireEvent_1 = function (name, options) {
            if (options === void 0) { options = {}; }
            var _a = options.target, target = _a === void 0 ? window : _a, _b = options.bubbles, bubbles = _b === void 0 ? true : _b, _c = options.cancelable, cancelable = _c === void 0 ? true : _c, data = __rest(options, ["target", "bubbles", "cancelable"]);
            var event = new Event(name, { bubbles: bubbles, cancelable: cancelable });
            for (var key in data) {
                event[key] = data[key];
            }
            target.dispatchEvent(event);
        };
        var on_1 = function (event, func, options) {
            return addEventListener(event, func, options);
        };
        HabitatFrogasaurus["./event.js"].fireEvent = fireEvent_1;
        HabitatFrogasaurus["./event.js"].on = on_1;
    }
    //====== ./console.js ======
    {
        HabitatFrogasaurus["./console.js"] = {};
        var print_1 = console.log.bind(console);
        var printCount_1 = 0;
        var print9_1 = function (message) {
            if (printCount_1 > 9)
                return;
            printCount_1++;
            print_1(message);
        };
        var registerDebugMethods_2 = function () {
            defineGetter_1(Object.prototype, "d", function () {
                var value = this.valueOf();
                print_1(value);
                return value;
            });
            defineGetter_1(Object.prototype, "d9", function () {
                var value = this.valueOf();
                print9_1(value);
                return value;
            });
        };
        HabitatFrogasaurus["./console.js"].print = print_1;
        HabitatFrogasaurus["./console.js"].print9 = print9_1;
        HabitatFrogasaurus["./console.js"].registerDebugMethods = registerDebugMethods_2;
    }
    //====== ./property.js ======
    {
        HabitatFrogasaurus["./property.js"] = {};
        var defineGetter_2 = function (object, name, get) {
            return Reflect.defineProperty(object, name, {
                get: get,
                set: function (value) {
                    Reflect.defineProperty(this, name, {
                        value: value,
                        configurable: true,
                        writable: true,
                        enumerable: true,
                    });
                },
                configurable: true,
                enumerable: false,
            });
        };
        var defineAccessor_1 = function (object, name, get, set) {
            return Reflect.defineProperty(object, name, {
                get: get,
                set: set,
                configurable: true,
                enumerable: false,
            });
        };
        HabitatFrogasaurus["./property.js"].defineGetter = defineGetter_2;
        HabitatFrogasaurus["./property.js"].defineAccessor = defineAccessor_1;
    }
    //====== ./linked-list.js ======
    {
        HabitatFrogasaurus["./linked-list.js"] = {};
        var LinkedList = /** @class */ (function () {
            function LinkedList(iterable) {
                if (iterable === void 0) { iterable = []; }
                this.start = undefined;
                this.end = undefined;
                this.isEmpty = true;
                for (var _i = 0, iterable_1 = iterable; _i < iterable_1.length; _i++) {
                    var value = iterable_1[_i];
                    this.push(value);
                }
            }
            LinkedList.prototype[Symbol.iterator] = function () {
                var link;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            link = this.start;
                            _a.label = 1;
                        case 1:
                            if (!(link !== undefined)) return [3 /*break*/, 3];
                            return [4 /*yield*/, link.value];
                        case 2:
                            _a.sent();
                            link = link.next;
                            return [3 /*break*/, 1];
                        case 3: return [2 /*return*/];
                    }
                });
            };
            LinkedList.prototype.toString = function () {
                return __spreadArray([], this, true).toString();
            };
            LinkedList.prototype.push = function () {
                var values = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    values[_i] = arguments[_i];
                }
                for (var _a = 0, values_1 = values; _a < values_1.length; _a++) {
                    var value = values_1[_a];
                    var link = makeLink_1(value);
                    if (this.isEmpty) {
                        this.start = link;
                        this.end = link;
                        this.isEmpty = false;
                    }
                    else {
                        this.end.next = link;
                        link.previous = this.end;
                        this.end = link;
                    }
                }
            };
            LinkedList.prototype.pop = function () {
                if (this.isEmpty) {
                    return undefined;
                }
                var value = this.start.value;
                if (this.start === this.end) {
                    this.clear();
                    return value;
                }
                this.end = this.end.previous;
                this.end.next = undefined;
                return value;
            };
            LinkedList.prototype.shift = function () {
                if (this.isEmpty) {
                    return undefined;
                }
                var value = this.start.value;
                if (this.start === this.end) {
                    this.clear();
                    return value;
                }
                this.start = this.start.next;
                this.start.previous = undefined;
                return value;
            };
            LinkedList.prototype.clear = function () {
                this.start = undefined;
                this.end = undefined;
                this.isEmpty = true;
            };
            LinkedList.prototype.setStart = function (link) {
                this.start = link;
                link.previous = undefined;
            };
            return LinkedList;
        }());
        var makeLink_1 = function (value) {
            var previous = undefined;
            var next = undefined;
            var link = { value: value, previous: previous, next: next };
            return link;
        };
        HabitatFrogasaurus["./linked-list.js"].LinkedList = LinkedList;
    }
    //====== ./vector.js ======
    {
        HabitatFrogasaurus["./vector.js"] = {};
        var scale_1 = function (value, scale) {
            if (typeof value === "number")
                return value * scale;
            return value.map(function (v) { return v * scale; });
        };
        var add_1 = function (a, b) {
            if (typeof a === "number") {
                return a + b;
            }
            if (a.length === 2) {
                var ax = a[0], ay = a[1];
                var bx = b[0], by = b[1];
                var x = ax + bx;
                var y = ay + by;
                return [x, y];
            }
            else {
                var ax = a[0], ay = a[1], az = a[2];
                var bx = b[0], by = b[1], bz = b[2];
                var x = ax + bx;
                var y = ay + by;
                var z = az + bz;
                return [x, y, z];
            }
        };
        var subtract_1 = function (a, b) {
            if (typeof a === "number") {
                return a - b;
            }
            if (a.length === 2) {
                var ax = a[0], ay = a[1];
                var bx = b[0], by = b[1];
                var x = ax - bx;
                var y = ay - by;
                return [x, y];
            }
            else {
                var ax = a[0], ay = a[1], az = a[2];
                var bx = b[0], by = b[1], bz = b[2];
                var x = ax - bx;
                var y = ay - by;
                var z = az - bz;
                return [x, y, z];
            }
        };
        var crossProduct_1 = function (a, b) {
            if (a.length === 2) {
                var ax = a[0], ay = a[1];
                var bx = b[0], by = b[1];
                return ax * by - ay * bx;
            }
            else {
                var ax = a[0], ay = a[1], az = a[2];
                var bx = b[0], by = b[1], bz = b[2];
                return [ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx];
            }
        };
        var distanceBetween = function (a, b) {
            if (typeof a === "number") {
                return Math.abs(a - b);
            }
            var displacement = subtract_1(a, b);
            var dx = displacement[0], dy = displacement[1], _a = displacement[2], dz = _a === void 0 ? 0 : _a;
            var distance = Math.hypot(dx, dy, dz);
            return distance;
        };
        var angleBetween = function (a, b) {
            if (a.length !== 2) {
                throw new Error("[Habitat] Sorry, only 2D vectors are supported at the moment. Please bug @todepond to support other lengths :)");
            }
            var displacement = subtract_1(a, b);
            var dx = displacement[0], dy = displacement[1];
            var angle = Math.atan2(dy, dx);
            return angle;
        };
        var registerVectorMethods_2 = function () {
            defineAccessor_2(Array.prototype, "x", function () {
                return this[0];
            }, function (value) {
                this[0] = value;
            });
            defineAccessor_2(Array.prototype, "y", function () {
                return this[1];
            }, function (value) {
                this[1] = value;
            });
            defineAccessor_2(Array.prototype, "z", function () {
                return this[2];
            }, function (value) {
                this[2] = value;
            });
        };
        HabitatFrogasaurus["./vector.js"].scale = scale_1;
        HabitatFrogasaurus["./vector.js"].add = add_1;
        HabitatFrogasaurus["./vector.js"].subtract = subtract_1;
        HabitatFrogasaurus["./vector.js"].crossProduct = crossProduct_1;
        HabitatFrogasaurus["./vector.js"].distanceBetween = distanceBetween;
        HabitatFrogasaurus["./vector.js"].angleBetween = angleBetween;
        HabitatFrogasaurus["./vector.js"].registerVectorMethods = registerVectorMethods_2;
    }
    //====== ./lerp.js ======
    {
        HabitatFrogasaurus["./lerp.js"] = {};
        var lerp_1 = function (_a, distance) {
            var a = _a[0], b = _a[1];
            var range = subtract_2(b, a);
            var displacement = scale_2(range, distance);
            return add_2(a, displacement);
        };
        var bilerp = function (_a, displacement) {
            var a = _a[0], b = _a[1], c = _a[2], d = _a[3];
            var dx = displacement[0], dy = displacement[1];
            var la = lerp_1([a, b], dx);
            var lb = lerp_1([d, c], dx);
            var line = [la, lb];
            return lerp_1(line, dy);
        };
        // based on https://iquilezles.org/articles/ibilinear
        // adapted by Magnogen https://magnogen.net
        var ibilerp = function (_a, value) {
            var a = _a[0], b = _a[1], c = _a[2], d = _a[3];
            if (typeof value === "number") {
                throw new Error("[Habitat] Sorry, 'ibilerp' doesn't support numbers yet - only vectors... Please contact @todepond :)");
            }
            var e = subtract_2(b, a);
            var f = subtract_2(d, a);
            var g = add_2(subtract_2(a, b), subtract_2(c, d));
            var h = subtract_2(value, a);
            var k2 = crossProduct_2(g, f);
            var k1 = crossProduct_2(e, f) + crossProduct_2(h, g);
            var k0 = crossProduct_2(h, e);
            if (Math.abs(k2) < 0.0001) {
                var x = (h[0] * k1 + f[0] * k0) / (e[0] * k1 - g[0] * k0);
                var y = -k0 / k1;
                return [x, y];
            }
            var w = k1 * k1 - 4 * k0 * k2;
            w = Math.sqrt(w);
            var ik2 = 0.5 / k2;
            var v = (-k1 - w) * ik2;
            var u = (h[0] - f[0] * v) / (e[0] + g[0] * v);
            if (u < 0.0 || u > 1.0 || v < 0.0 || v > 1.0) {
                v = (-k1 + w) * ik2;
                u = (h[0] - f[0] * v) / (e[0] + g[0] * v);
            }
            return [u, v];
        };
        HabitatFrogasaurus["./lerp.js"].lerp = lerp_1;
        HabitatFrogasaurus["./lerp.js"].bilerp = bilerp;
        HabitatFrogasaurus["./lerp.js"].ibilerp = ibilerp;
    }
    //====== ./array.js ======
    {
        HabitatFrogasaurus["./array.js"] = {};
        var shuffleArray = function (array) {
            var _a;
            // Go backwards through the array
            for (var i = array.length - 1; i > 0; i--) {
                // Swap each value with a random value before it (which might include itself)
                var j = Math.floor(Math.random() * (i + 1));
                _a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1];
            }
            return array;
        };
        var trimArray = function (array) {
            // If the array is empty just return it
            if (array.length == 0)
                return array;
            var start = array.length - 1;
            var end = 0;
            // Find the first non-undefined index
            for (var i = 0; i < array.length; i++) {
                var value = array[i];
                if (value !== undefined) {
                    start = i;
                    break;
                }
            }
            // Find the last non-undefined index
            for (var i = array.length - 1; i >= 0; i--) {
                var value = array[i];
                if (value !== undefined) {
                    end = i + 1;
                    break;
                }
            }
            // Cut off the start and end of the array
            array.splice(end);
            array.splice(0, start);
            return array;
        };
        var repeatArray = function (array, count) {
            // If count is zero, empty the array
            if (count === 0) {
                array.splice(0);
                return array;
            }
            // If count is less than zero, reverse the array
            else if (count < 0) {
                array.reverse();
                count = Math.abs(count);
            }
            // Otherwise repeat the array
            var clone = __spreadArray([], array, true);
            for (var i = 0; i < count - 1; i++) {
                array.push.apply(array, clone);
            }
            return array;
        };
        HabitatFrogasaurus["./array.js"].shuffleArray = shuffleArray;
        HabitatFrogasaurus["./array.js"].trimArray = trimArray;
        HabitatFrogasaurus["./array.js"].repeatArray = repeatArray;
    }
    //====== ./javascript.js ======
    {
        HabitatFrogasaurus["./javascript.js"] = {};
        var JavaScript = function (source) {
            var code = "return ".concat(source);
            var value = new Function(code)();
            return value;
        };
        HabitatFrogasaurus["./javascript.js"].JavaScript = JavaScript;
    }
    //====== ./string.js ======
    {
        HabitatFrogasaurus["./string.js"] = {};
        var divideString = function (string, length) {
            var regExp = RegExp("[^]{1,".concat(length, "}"), "g");
            return string.match(regExp);
        };
        HabitatFrogasaurus["./string.js"].divideString = divideString;
    }
    //====== ./stage.js ======
    {
        HabitatFrogasaurus["./stage.js"] = {};
        var Stage = function (properties) {
            var template = struct_1({
                context: undefined,
                scale: 1.0,
                aspectRatio: undefined,
                speed: 1.0,
                clock: 0.0,
                paused: false,
                start: function () { },
                resize: function () { },
                tick: function () { },
                update: function () { },
            });
            var stage = template(properties);
            if (document.body === null) {
                addEventListener("load", function () {
                    requestAnimationFrame(function () { return start_1(stage); });
                });
            }
            else {
                requestAnimationFrame(function () { return start_1(stage); });
            }
            return stage;
        };
        var start_1 = function (stage) {
            // Create a context + canvas if no context was provided
            if (stage.context === undefined) {
                var canvas = document.createElement("canvas");
                canvas.style["background-color"] = "#171d28";
                document.body.style["background-color"] = "#06070a";
                document.body.style["margin"] = "0px";
                document.body.style["overflow"] = "hidden";
                document.body.appendChild(canvas);
                stage.context = canvas.getContext("2d");
            }
            on_2("resize", function () { return resize_1(stage); });
            on_2(keyDown_1(" "), function () { return (stage.paused = !stage.paused); });
            stage.start(stage.context);
            resize_1(stage);
            tick_1(stage);
        };
        var resize_1 = function (stage) {
            var width = innerWidth;
            var height = innerHeight;
            if (stage.aspectRatio !== undefined) {
                var _a = stage.aspectRatio, x = _a[0], y = _a[1];
                height = (innerWidth * y) / x;
                var heightGrowth = height / innerHeight;
                if (heightGrowth > 1.0) {
                    height /= heightGrowth;
                    width /= heightGrowth;
                }
            }
            var scaledWidth = width * stage.scale;
            var scaledHeight = height * stage.scale;
            /*
             */
            var canvas = stage.context.canvas;
            canvas.width = Math.round(scaledWidth * devicePixelRatio);
            canvas.height = Math.round(scaledHeight * devicePixelRatio);
            canvas.style["width"] = Math.round(scaledWidth);
            canvas.style["height"] = Math.round(scaledHeight);
            var marginHorizontal = (innerWidth - scaledWidth) / 2;
            var marginVertical = (innerHeight - scaledHeight) / 2;
            canvas.style["margin-left"] = marginHorizontal;
            canvas.style["margin-right"] = marginHorizontal;
            canvas.style["margin-top"] = marginVertical;
            canvas.style["margin-bottom"] = marginVertical;
            stage.resize(stage.context);
        };
        var tick_1 = function (stage) {
            stage.clock += stage.speed;
            while (stage.clock > 0) {
                if (!stage.paused)
                    stage.update(stage.context);
                stage.tick(stage.context, stage);
                stage.clock--;
            }
            requestAnimationFrame(function () { return tick_1(stage); });
        };
        HabitatFrogasaurus["./stage.js"].Stage = Stage;
    }
    //====== ./async.js ======
    {
        HabitatFrogasaurus["./async.js"] = {};
        var sleep_1 = function (duration) {
            new Promise(function (resolve) { return setTimeout(resolve, duration); });
        };
        HabitatFrogasaurus["./async.js"].sleep = sleep_1;
    }
    //====== ./pointer.js ======
    {
        HabitatFrogasaurus["./pointer.js"] = {};
        var isPointerTracked_1 = false;
        var pointer_1 = {
            position: [undefined, undefined],
            down: undefined,
        };
        var getPointer = function () {
            if (isPointerTracked_1)
                return pointer_1;
            isPointerTracked_1 = true;
            addEventListener("pointermove", function (e) {
                pointer_1.position[0] = e.clientX;
                pointer_1.position[1] = e.clientY;
            });
            addEventListener("pointerdown", function (e) {
                pointer_1.position[0] = e.clientX;
                pointer_1.position[1] = e.clientY;
                pointer_1.down = true;
            });
            addEventListener("pointerup", function (e) {
                pointer_1.position[0] = e.clientX;
                pointer_1.position[1] = e.clientY;
                pointer_1.down = false;
            });
            return pointer_1;
        };
        HabitatFrogasaurus["./pointer.js"].getPointer = getPointer;
    }
    //====== ./keyboard.js ======
    {
        HabitatFrogasaurus["./keyboard.js"] = {};
        var keyboard_1 = {};
        var isKeyboardTracked_1 = false;
        var getKeyboard = function () {
            if (isKeyboardTracked_1)
                return keyboard_1;
            isKeyboardTracked_1 = true;
            on_2("keydown", function (e) {
                keyboard_1[e.key] = true;
            });
            on_2("keyup", function (e) {
                keyboard_1[e.key] = false;
            });
            return keyboard_1;
        };
        var isKeyDownTracked_1 = false;
        var keyDown_2 = function (key) {
            if (!isKeyDownTracked_1) {
                isKeyDownTracked_1 = true;
                on_2("keydown", function (e) { return fireEvent_2("keyDown(\"".concat(e.key, "\")")); }, { passive: false });
            }
            return "keyDown(\"".concat(key, "\")");
        };
        var isKeyUpTracked_1 = false;
        var keyUp = function (key) {
            if (!isKeyUpTracked_1) {
                isKeyUpTracked_1 = true;
                on_2("keyup", function (e) { return fireEvent_2("keyUp(\"".concat(e.key, "\")")); }, { passive: false });
            }
            return "keyUp(\"".concat(key, "\")");
        };
        HabitatFrogasaurus["./keyboard.js"].getKeyboard = getKeyboard;
        HabitatFrogasaurus["./keyboard.js"].keyDown = keyDown_2;
        HabitatFrogasaurus["./keyboard.js"].keyUp = keyUp;
    }
    //====== ./struct.js ======
    {
        HabitatFrogasaurus["./struct.js"] = {};
        var struct_2 = function (parameters) {
            return function (args) {
                return __assign(__assign({}, parameters), args);
            };
        };
        HabitatFrogasaurus["./struct.js"].struct = struct_2;
    }
    //====== ./colour.js ======
    {
        HabitatFrogasaurus["./colour.js"] = {};
        //===========//
        // UTILITIES //
        //===========//
        var wrapSplashNumber_1 = function (number) {
            while (number < 0)
                number += 1000;
            while (number > 999)
                number -= 1000;
            return number;
        };
        var getThreeDigits_1 = function (number) {
            var chars = number.toString().padStart(3, "0").split("");
            var digits = chars.map(function (v) { return parseInt(v); });
            return digits;
        };
        //=========//
        // CLASSES //
        //=========//
        var Colour_1 = /** @class */ (function (_super) {
            __extends(Colour, _super);
            function Colour(red, green, blue, alpha) {
                if (alpha === void 0) { alpha = 255; }
                var _this = _super.call(this) || this;
                _this.push(red, green, blue);
                if (alpha !== undefined) {
                    _this.push(alpha);
                }
                return _this;
            }
            Colour.prototype.toString = function () {
                var _a = this.map(function (v) { return v.toString(16).padStart(2, "0"); }), red = _a[0], green = _a[1], blue = _a[2], alpha = _a[3];
                if (this.alpha === 255) {
                    return "#".concat(red).concat(green).concat(blue);
                }
                return "#".concat(red).concat(green).concat(blue).concat(alpha);
            };
            return Colour;
        }(Array));
        var Splash = /** @class */ (function (_super) {
            __extends(Splash, _super);
            function Splash(number) {
                var _this = this;
                var wrappedNumber = wrapSplashNumber_1(number);
                var _a = getThreeDigits_1(wrappedNumber, 3), hundreds = _a[0], tens = _a[1], ones = _a[2];
                var red = RED_SPLASH_VALUES_1[hundreds];
                var green = GREEN_SPLASH_VALUES_1[tens];
                var blue = BLUE_SPLASH_VALUES_1[ones];
                _this = _super.call(this, red, green, blue) || this;
                Reflect.defineProperty(_this, "splash", {
                    value: number,
                    enumerable: false,
                });
                return _this;
            }
            return Splash;
        }(Colour_1));
        //===========//
        // FUNCTIONS //
        //===========//
        var showColour = function (colour) {
            console.log("%c   ", "background-color: ".concat(new (Colour_1.bind.apply(Colour_1, __spreadArray([void 0], colour, false)))()));
        };
        //=========//
        // METHODS //
        //=========//
        var registerColourMethods_2 = function () {
            defineGetter_1(Array.prototype, "red", function () {
                return this[0];
            });
            defineGetter_1(Array.prototype, "green", function () {
                return this[1];
            });
            defineGetter_1(Array.prototype, "blue", function () {
                return this[2];
            });
            defineGetter_1(Array.prototype, "alpha", function () {
                return this[3];
            });
        };
        //===========//
        // CONSTANTS //
        //===========//
        var RED_SPLASH_VALUES_1 = [23, 55, 70, 98, 128, 159, 174, 204, 242, 255];
        var GREEN_SPLASH_VALUES_1 = [29, 67, 98, 128, 159, 174, 204, 222, 245, 255];
        var BLUE_SPLASH_VALUES_1 = [40, 70, 98, 128, 159, 174, 204, 222, 247, 255];
        var VOID = new Colour_1(6, 7, 10);
        var BLACK = new Splash(0);
        var GREY = new Splash(112);
        var SILVER = new Splash(556);
        var WHITE = new Splash(999);
        var GREEN = new Splash(293);
        var CYAN = new Splash(269);
        var BLUE = new Splash(239);
        var PURPLE = new Splash(418);
        var PINK = new Splash(937);
        var CORAL = new Splash(933);
        var RED = new Splash(911);
        var ORANGE = new Splash(931);
        var YELLOW = new Splash(991);
        var HUES = [GREEN, CYAN, BLUE, PURPLE, PINK, CORAL, RED, ORANGE, YELLOW];
        var SHADES = [VOID, BLACK, GREY, SILVER, WHITE];
        var COLOURS = __spreadArray(__spreadArray([], SHADES, true), HUES, true);
        HabitatFrogasaurus["./colour.js"].Colour = Colour_1;
        HabitatFrogasaurus["./colour.js"].Splash = Splash;
        HabitatFrogasaurus["./colour.js"].showColour = showColour;
        HabitatFrogasaurus["./colour.js"].registerColourMethods = registerColourMethods_2;
        HabitatFrogasaurus["./colour.js"].VOID = VOID;
        HabitatFrogasaurus["./colour.js"].BLACK = BLACK;
        HabitatFrogasaurus["./colour.js"].GREY = GREY;
        HabitatFrogasaurus["./colour.js"].SILVER = SILVER;
        HabitatFrogasaurus["./colour.js"].WHITE = WHITE;
        HabitatFrogasaurus["./colour.js"].GREEN = GREEN;
        HabitatFrogasaurus["./colour.js"].CYAN = CYAN;
        HabitatFrogasaurus["./colour.js"].BLUE = BLUE;
        HabitatFrogasaurus["./colour.js"].PURPLE = PURPLE;
        HabitatFrogasaurus["./colour.js"].PINK = PINK;
        HabitatFrogasaurus["./colour.js"].CORAL = CORAL;
        HabitatFrogasaurus["./colour.js"].RED = RED;
        HabitatFrogasaurus["./colour.js"].ORANGE = ORANGE;
        HabitatFrogasaurus["./colour.js"].YELLOW = YELLOW;
        HabitatFrogasaurus["./colour.js"].HUES = HUES;
        HabitatFrogasaurus["./colour.js"].SHADES = SHADES;
        HabitatFrogasaurus["./colour.js"].COLOURS = COLOURS;
    }
    //====== ./json.js ======
    {
        HabitatFrogasaurus["./json.js"] = {};
        var _ = function (value) {
            return JSON.stringify(value);
        };
        HabitatFrogasaurus["./json.js"]._ = _;
    }
    //====== ./mouse.js ======
    {
        HabitatFrogasaurus["./mouse.js"] = {};
        var isMouseTracked_1 = false;
        var buttonNames_1 = ["Left", "Middle", "Right", "Back", "Forward"];
        var mouse_1 = {
            position: [undefined, undefined],
        };
        var getMouse = function () {
            if (isMouseTracked_1)
                return mouse_1;
            isMouseTracked_1 = true;
            on_2("mousemove", function (e) {
                mouse_1.position[0] = e.clientX;
                mouse_1.position[1] = e.clientY;
            });
            on_2("mousedown", function (e) {
                mouse_1.position[0] = e.clientX;
                mouse_1.position[1] = e.clientY;
                var buttonName = buttonNames_1[e.button];
                mouse_1[buttonName] = true;
            });
            on_2("mouseup", function (e) {
                mouse_1.position[0] = e.clientX;
                mouse_1.position[1] = e.clientY;
                var buttonName = buttonNames_1[e.button];
                mouse_1[buttonName] = false;
            });
            return mouse_1;
        };
        var isMouseDownTracked_1 = false;
        var mouseDown = function (buttonName) {
            var button = buttonNames_1.indexOf(buttonName);
            if (!isMouseDownTracked_1) {
                isMouseDownTracked_1 = true;
                on_2("mousedown", function (e) { return fireEvent_2("mouseDown(\"".concat(e.button, "\")")); }, { passive: false });
            }
            return "mouseDown(\"".concat(button, "\")");
        };
        var isMouseUpTracked_1 = false;
        var mouseUp = function (buttonName) {
            var button = buttonNames_1.indexOf(buttonName);
            if (!isMouseUpTracked_1) {
                isMouseUpTracked_1 = true;
                on_2("mouseup", function (e) { return fireEvent_2("mouseUp(\"".concat(e.button, "\")")); }, { passive: false });
            }
            return "mouseUp(\"".concat(button, "\")");
        };
        HabitatFrogasaurus["./mouse.js"].getMouse = getMouse;
        HabitatFrogasaurus["./mouse.js"].mouseDown = mouseDown;
        HabitatFrogasaurus["./mouse.js"].mouseUp = mouseUp;
    }
    //====== ./tween.js ======
    {
        HabitatFrogasaurus["./tween.js"] = {};
        var tween = function (object, key, options) {
            var value = object[key];
            var _a = options.start, start = _a === void 0 ? value : _a, _b = options.end, end = _b === void 0 ? value : _b, _c = options.duration, duration = _c === void 0 ? 1000 : _c, _d = options.easeIn, easeIn = _d === void 0 ? 0.0 : _d, _e = options.easeOut, easeOut = _e === void 0 ? 0.0 : _e, _f = options.ratio, ratio = _f === void 0 ? 0.5 : _f;
            var startTime = performance.now();
            var endTime = startTime + duration;
            defineGetter_1(object, key, function () {
                var currentTime = performance.now();
                if (currentTime >= endTime) {
                    Reflect.defineProperty(object, key, {
                        value: end,
                        writable: true,
                        configurable: true,
                        enumerable: true,
                    });
                    return end;
                }
                var time = currentTime - startTime;
                var interpolation = ease_1(time / duration, {
                    easeIn: easeIn,
                    easeOut: easeOut,
                    ratio: 1 - ratio,
                });
                return lerp_2([start, end], interpolation);
            });
        };
        var ease_1 = function (t, _a) {
            var easeIn = _a.easeIn, easeOut = _a.easeOut, ratio = _a.ratio;
            var f = function (t, slope) { return Math.pow(t, (1.0 + slope)); };
            return f(t * ratio * 2, easeIn) / (f(t * ratio * 2, easeIn) + f((1 - t) * (1 - ratio) * 2, easeOut));
        };
        HabitatFrogasaurus["./tween.js"].tween = tween;
    }
    //====== ./touch.js ======
    {
        HabitatFrogasaurus["./touch.js"] = {};
        var touches_1 = [];
        var isTouchTracked_1 = false;
        var getTouches = function () {
            if (!isTouchTracked_1) {
                isTouchTracked_1 = true;
                on_2("touchstart", function (e) {
                    for (var _i = 0, _a = e.changedTouches; _i < _a.length; _i++) {
                        var changedTouch = _a[_i];
                        var id = changedTouch.identifier;
                        if (touches_1[id] === undefined) {
                            touches_1[id] = { position: [undefined, undefined] };
                        }
                        var touch = touches_1[id];
                        touch.position[0] = changedTouch.clientX;
                        touch.position[1] = changedTouch.clientY;
                    }
                });
                on_2("touchmove", function (e) {
                    for (var _i = 0, _a = e.changedTouches; _i < _a.length; _i++) {
                        var changedTouch = _a[_i];
                        var id = changedTouch.identifier;
                        var touch = touches_1[id];
                        touch.position[0] = changedTouch.clientX;
                        touch.position[1] = changedTouch.clientY;
                    }
                });
                on_2("touchend", function (e) {
                    for (var _i = 0, _a = e.changedTouches; _i < _a.length; _i++) {
                        var changedTouch = _a[_i];
                        var id = changedTouch.identifier;
                        touches_1[id] = undefined;
                    }
                });
            }
            return touches_1;
        };
        HabitatFrogasaurus["./touch.js"].getTouches = getTouches;
    }
    //====== ./document.js ======
    {
        HabitatFrogasaurus["./document.js"] = {};
        var $ = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return document.querySelector.apply(document, args);
        };
        var $$ = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return document.querySelectorAll.apply(document, args);
        };
        HabitatFrogasaurus["./document.js"].$ = $;
        HabitatFrogasaurus["./document.js"].$$ = $$;
    }
    var registerColourMethods_1 = HabitatFrogasaurus["./colour.js"].registerColourMethods;
    var registerDebugMethods_1 = HabitatFrogasaurus["./console.js"].registerDebugMethods;
    var _a = HabitatFrogasaurus["./vector.js"], registerVectorMethods_1 = _a.registerVectorMethods, add_2 = _a.add, crossProduct_2 = _a.crossProduct, scale_2 = _a.scale, subtract_2 = _a.subtract;
    var _b = HabitatFrogasaurus["./property.js"], defineGetter_1 = _b.defineGetter, defineAccessor_2 = _b.defineAccessor;
    var struct_1 = HabitatFrogasaurus["./struct.js"].struct;
    var keyDown_1 = HabitatFrogasaurus["./keyboard.js"].keyDown;
    var _c = HabitatFrogasaurus["./event.js"], on_2 = _c.on, fireEvent_2 = _c.fireEvent;
    var lerp_2 = HabitatFrogasaurus["./lerp.js"].lerp;
}
//=========//
// EXPORTS //
//=========//
export var Habitat = {
    registerMethods: HabitatFrogasaurus["./habitat.js"].registerMethods,
    registerGlobals: HabitatFrogasaurus["./habitat.js"].registerGlobals,
    registerEverything: HabitatFrogasaurus["./habitat.js"].registerEverything,
    HTML: HabitatFrogasaurus["./html.js"].HTML,
    clamp: HabitatFrogasaurus["./number.js"].clamp,
    wrap: HabitatFrogasaurus["./number.js"].wrap,
    getDigits: HabitatFrogasaurus["./number.js"].getDigits,
    gcd: HabitatFrogasaurus["./number.js"].gcd,
    simplifyRatio: HabitatFrogasaurus["./number.js"].simplifyRatio,
    range: HabitatFrogasaurus["./number.js"].range,
    memo: HabitatFrogasaurus["./memo.js"].memo,
    random: HabitatFrogasaurus["./random.js"].random,
    randomFrom: HabitatFrogasaurus["./random.js"].randomFrom,
    oneIn: HabitatFrogasaurus["./random.js"].oneIn,
    maybe: HabitatFrogasaurus["./random.js"].maybe,
    fireEvent: HabitatFrogasaurus["./event.js"].fireEvent,
    on: HabitatFrogasaurus["./event.js"].on,
    print: HabitatFrogasaurus["./console.js"].print,
    print9: HabitatFrogasaurus["./console.js"].print9,
    registerDebugMethods: HabitatFrogasaurus["./console.js"].registerDebugMethods,
    defineGetter: HabitatFrogasaurus["./property.js"].defineGetter,
    defineAccessor: HabitatFrogasaurus["./property.js"].defineAccessor,
    LinkedList: HabitatFrogasaurus["./linked-list.js"].LinkedList,
    scale: HabitatFrogasaurus["./vector.js"].scale,
    add: HabitatFrogasaurus["./vector.js"].add,
    subtract: HabitatFrogasaurus["./vector.js"].subtract,
    crossProduct: HabitatFrogasaurus["./vector.js"].crossProduct,
    distanceBetween: HabitatFrogasaurus["./vector.js"].distanceBetween,
    angleBetween: HabitatFrogasaurus["./vector.js"].angleBetween,
    registerVectorMethods: HabitatFrogasaurus["./vector.js"].registerVectorMethods,
    lerp: HabitatFrogasaurus["./lerp.js"].lerp,
    bilerp: HabitatFrogasaurus["./lerp.js"].bilerp,
    ibilerp: HabitatFrogasaurus["./lerp.js"].ibilerp,
    shuffleArray: HabitatFrogasaurus["./array.js"].shuffleArray,
    trimArray: HabitatFrogasaurus["./array.js"].trimArray,
    repeatArray: HabitatFrogasaurus["./array.js"].repeatArray,
    JavaScript: HabitatFrogasaurus["./javascript.js"].JavaScript,
    divideString: HabitatFrogasaurus["./string.js"].divideString,
    Stage: HabitatFrogasaurus["./stage.js"].Stage,
    sleep: HabitatFrogasaurus["./async.js"].sleep,
    getPointer: HabitatFrogasaurus["./pointer.js"].getPointer,
    getKeyboard: HabitatFrogasaurus["./keyboard.js"].getKeyboard,
    keyDown: HabitatFrogasaurus["./keyboard.js"].keyDown,
    keyUp: HabitatFrogasaurus["./keyboard.js"].keyUp,
    struct: HabitatFrogasaurus["./struct.js"].struct,
    Colour: HabitatFrogasaurus["./colour.js"].Colour,
    Splash: HabitatFrogasaurus["./colour.js"].Splash,
    showColour: HabitatFrogasaurus["./colour.js"].showColour,
    registerColourMethods: HabitatFrogasaurus["./colour.js"].registerColourMethods,
    VOID: HabitatFrogasaurus["./colour.js"].VOID,
    BLACK: HabitatFrogasaurus["./colour.js"].BLACK,
    GREY: HabitatFrogasaurus["./colour.js"].GREY,
    SILVER: HabitatFrogasaurus["./colour.js"].SILVER,
    WHITE: HabitatFrogasaurus["./colour.js"].WHITE,
    GREEN: HabitatFrogasaurus["./colour.js"].GREEN,
    CYAN: HabitatFrogasaurus["./colour.js"].CYAN,
    BLUE: HabitatFrogasaurus["./colour.js"].BLUE,
    PURPLE: HabitatFrogasaurus["./colour.js"].PURPLE,
    PINK: HabitatFrogasaurus["./colour.js"].PINK,
    CORAL: HabitatFrogasaurus["./colour.js"].CORAL,
    RED: HabitatFrogasaurus["./colour.js"].RED,
    ORANGE: HabitatFrogasaurus["./colour.js"].ORANGE,
    YELLOW: HabitatFrogasaurus["./colour.js"].YELLOW,
    HUES: HabitatFrogasaurus["./colour.js"].HUES,
    SHADES: HabitatFrogasaurus["./colour.js"].SHADES,
    COLOURS: HabitatFrogasaurus["./colour.js"].COLOURS,
    _: HabitatFrogasaurus["./json.js"]._,
    getMouse: HabitatFrogasaurus["./mouse.js"].getMouse,
    mouseDown: HabitatFrogasaurus["./mouse.js"].mouseDown,
    mouseUp: HabitatFrogasaurus["./mouse.js"].mouseUp,
    tween: HabitatFrogasaurus["./tween.js"].tween,
    getTouches: HabitatFrogasaurus["./touch.js"].getTouches,
    $: HabitatFrogasaurus["./document.js"].$,
    $$: HabitatFrogasaurus["./document.js"].$$,
};
//# sourceMappingURL=habitat-embed.js.map