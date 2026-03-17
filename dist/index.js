var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __pow = Math.pow;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};

// src/libraries/habitat-embed.ts
var HabitatFrogasaurus = {};
{
  {
    HabitatFrogasaurus["./habitat.js"] = {};
    const registerMethods = () => {
      registerDebugMethods();
      registerColourMethods();
      registerVectorMethods();
    };
    const registerGlobals = () => {
      Object.assign(window, Habitat);
    };
    const registerEverything = () => {
      registerGlobals();
      registerMethods();
    };
    HabitatFrogasaurus["./habitat.js"].registerMethods = registerMethods;
    HabitatFrogasaurus["./habitat.js"].registerGlobals = registerGlobals;
    HabitatFrogasaurus["./habitat.js"].registerEverything = registerEverything;
  }
  {
    HabitatFrogasaurus["./html.js"] = {};
    const HTML = (source) => {
      const template = document.createElement("template");
      template.innerHTML = source;
      const { content } = template;
      if (content.childElementCount === 1) {
        return content.firstChild;
      }
      return template.content;
    };
    HabitatFrogasaurus["./html.js"].HTML = HTML;
  }
  {
    HabitatFrogasaurus["./number.js"] = {};
    const clamp = (number, min, max) => {
      if (number < min) return min;
      if (number > max) return max;
      return number;
    };
    const wrap = (number, min, max) => {
      const range2 = max - min + 1;
      while (number < min) number += range2;
      while (number > max) number -= range2;
      return number;
    };
    const getDigits = (number) => {
      const chars = number.toString().split("");
      const digits = chars.map((v) => parseInt(v)).filter((v) => !isNaN(v));
      return digits;
    };
    const gcd = (...numbers) => {
      const [head, ...tail] = numbers;
      if (numbers.length === 1) return head;
      if (numbers.length > 2) return gcd(head, gcd(...tail));
      let [a, b] = [head, ...tail];
      while (true) {
        if (b === 0) return a;
        a = a % b;
        if (a === 0) return b;
        b = b % a;
      }
    };
    const simplifyRatio = (...numbers) => {
      const divisor = gcd(...numbers);
      return numbers.map((n) => n / divisor);
    };
    const range = function* (start, end) {
      let i = start;
      if (i <= end)
        do {
          yield i;
          i++;
        } while (i <= end);
      else
        while (i >= end) {
          yield i;
          i--;
        }
    };
    HabitatFrogasaurus["./number.js"].clamp = clamp;
    HabitatFrogasaurus["./number.js"].wrap = wrap;
    HabitatFrogasaurus["./number.js"].getDigits = getDigits;
    HabitatFrogasaurus["./number.js"].gcd = gcd;
    HabitatFrogasaurus["./number.js"].simplifyRatio = simplifyRatio;
    HabitatFrogasaurus["./number.js"].range = range;
  }
  {
    HabitatFrogasaurus["./memo.js"] = {};
    const memo = (func, getKey = JSON.stringify) => {
      const cache = /* @__PURE__ */ new Map();
      return (...args) => {
        const key = getKey(args);
        if (cache.has(key)) {
          return cache.get(key);
        }
        const result = func(...args);
        cache.set(key, result);
        return result;
      };
    };
    HabitatFrogasaurus["./memo.js"].memo = memo;
  }
  {
    HabitatFrogasaurus["./random.js"] = {};
    const maxRandomNumberIndex = __pow(2, 14);
    const randomNumbersBuffer = new Uint32Array(maxRandomNumberIndex);
    let randomNumberIndex = Infinity;
    const random = () => {
      if (randomNumberIndex >= maxRandomNumberIndex) {
        crypto.getRandomValues(randomNumbersBuffer);
        randomNumberIndex = 0;
      }
      const result = randomNumbersBuffer[randomNumberIndex];
      randomNumberIndex++;
      return result;
    };
    const randomFrom = (array) => {
      const index = random() % array.length;
      return array[index];
    };
    const oneIn = (times) => random() % times < 1;
    const maybe = (chance) => oneIn(1 / chance);
    HabitatFrogasaurus["./random.js"].random = random;
    HabitatFrogasaurus["./random.js"].randomFrom = randomFrom;
    HabitatFrogasaurus["./random.js"].oneIn = oneIn;
    HabitatFrogasaurus["./random.js"].maybe = maybe;
  }
  {
    HabitatFrogasaurus["./event.js"] = {};
    const fireEvent2 = (name, options = {}) => {
      const _a = options, { target = window, bubbles = true, cancelable = true } = _a, data = __objRest(_a, ["target", "bubbles", "cancelable"]);
      const event = new Event(name, { bubbles, cancelable });
      for (const key in data) {
        event[key] = data[key];
      }
      target.dispatchEvent(event);
    };
    const on2 = (event, func, options) => {
      return addEventListener(event, func, options);
    };
    HabitatFrogasaurus["./event.js"].fireEvent = fireEvent2;
    HabitatFrogasaurus["./event.js"].on = on2;
  }
  {
    HabitatFrogasaurus["./console.js"] = {};
    const print = console.log.bind(console);
    let printCount = 0;
    const print9 = (message) => {
      if (printCount > 9) return;
      printCount++;
      print(message);
    };
    const registerDebugMethods2 = () => {
      defineGetter(Object.prototype, "d", function() {
        const value = this.valueOf();
        print(value);
        return value;
      });
      defineGetter(Object.prototype, "d9", function() {
        const value = this.valueOf();
        print9(value);
        return value;
      });
    };
    HabitatFrogasaurus["./console.js"].print = print;
    HabitatFrogasaurus["./console.js"].print9 = print9;
    HabitatFrogasaurus["./console.js"].registerDebugMethods = registerDebugMethods2;
  }
  {
    HabitatFrogasaurus["./property.js"] = {};
    const defineGetter2 = (object, name, get) => {
      return Reflect.defineProperty(object, name, {
        get,
        set(value) {
          Reflect.defineProperty(this, name, {
            value,
            configurable: true,
            writable: true,
            enumerable: true
          });
        },
        configurable: true,
        enumerable: false
      });
    };
    const defineAccessor2 = (object, name, get, set) => {
      return Reflect.defineProperty(object, name, {
        get,
        set,
        configurable: true,
        enumerable: false
      });
    };
    HabitatFrogasaurus["./property.js"].defineGetter = defineGetter2;
    HabitatFrogasaurus["./property.js"].defineAccessor = defineAccessor2;
  }
  {
    HabitatFrogasaurus["./linked-list.js"] = {};
    const LinkedList = class {
      constructor(iterable = []) {
        this.start = void 0;
        this.end = void 0;
        this.isEmpty = true;
        for (const value of iterable) {
          this.push(value);
        }
      }
      *[Symbol.iterator]() {
        let link = this.start;
        while (link !== void 0) {
          yield link.value;
          link = link.next;
        }
      }
      toString() {
        return [...this].toString();
      }
      push(...values) {
        for (const value of values) {
          const link = makeLink(value);
          if (this.isEmpty) {
            this.start = link;
            this.end = link;
            this.isEmpty = false;
          } else {
            this.end.next = link;
            link.previous = this.end;
            this.end = link;
          }
        }
      }
      pop() {
        if (this.isEmpty) {
          return void 0;
        }
        const value = this.start.value;
        if (this.start === this.end) {
          this.clear();
          return value;
        }
        this.end = this.end.previous;
        this.end.next = void 0;
        return value;
      }
      shift() {
        if (this.isEmpty) {
          return void 0;
        }
        const value = this.start.value;
        if (this.start === this.end) {
          this.clear();
          return value;
        }
        this.start = this.start.next;
        this.start.previous = void 0;
        return value;
      }
      clear() {
        this.start = void 0;
        this.end = void 0;
        this.isEmpty = true;
      }
      setStart(link) {
        this.start = link;
        link.previous = void 0;
      }
    };
    const makeLink = (value) => {
      const previous = void 0;
      const next = void 0;
      const link = { value, previous, next };
      return link;
    };
    HabitatFrogasaurus["./linked-list.js"].LinkedList = LinkedList;
  }
  {
    HabitatFrogasaurus["./vector.js"] = {};
    const scale2 = (value, scale3) => {
      if (typeof value === "number") return value * scale3;
      return value.map((v) => v * scale3);
    };
    const add2 = (a, b) => {
      if (typeof a === "number") {
        return a + b;
      }
      if (a.length === 2) {
        const [ax, ay] = a;
        const [bx, by] = b;
        const x = ax + bx;
        const y = ay + by;
        return [x, y];
      } else {
        const [ax, ay, az] = a;
        const [bx, by, bz] = b;
        const x = ax + bx;
        const y = ay + by;
        const z = az + bz;
        return [x, y, z];
      }
    };
    const subtract3 = (a, b) => {
      if (typeof a === "number") {
        return a - b;
      }
      if (a.length === 2) {
        const [ax, ay] = a;
        const [bx, by] = b;
        const x = ax - bx;
        const y = ay - by;
        return [x, y];
      } else {
        const [ax, ay, az] = a;
        const [bx, by, bz] = b;
        const x = ax - bx;
        const y = ay - by;
        const z = az - bz;
        return [x, y, z];
      }
    };
    const crossProduct2 = (a, b) => {
      if (a.length === 2) {
        const [ax, ay] = a;
        const [bx, by] = b;
        return ax * by - ay * bx;
      } else {
        const [ax, ay, az] = a;
        const [bx, by, bz] = b;
        return [ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx];
      }
    };
    const distanceBetween = (a, b) => {
      if (typeof a === "number") {
        return Math.abs(a - b);
      }
      const displacement = subtract3(a, b);
      const [dx, dy, dz = 0] = displacement;
      const distance = Math.hypot(dx, dy, dz);
      return distance;
    };
    const angleBetween = (a, b) => {
      if (a.length !== 2) {
        throw new Error(
          "[Habitat] Sorry, only 2D vectors are supported at the moment. Please bug @todepond to support other lengths :)"
        );
      }
      const displacement = subtract3(a, b);
      const [dx, dy] = displacement;
      const angle = Math.atan2(dy, dx);
      return angle;
    };
    const registerVectorMethods2 = () => {
      defineAccessor(
        Array.prototype,
        "x",
        function() {
          return this[0];
        },
        function(value) {
          this[0] = value;
        }
      );
      defineAccessor(
        Array.prototype,
        "y",
        function() {
          return this[1];
        },
        function(value) {
          this[1] = value;
        }
      );
      defineAccessor(
        Array.prototype,
        "z",
        function() {
          return this[2];
        },
        function(value) {
          this[2] = value;
        }
      );
    };
    HabitatFrogasaurus["./vector.js"].scale = scale2;
    HabitatFrogasaurus["./vector.js"].add = add2;
    HabitatFrogasaurus["./vector.js"].subtract = subtract3;
    HabitatFrogasaurus["./vector.js"].crossProduct = crossProduct2;
    HabitatFrogasaurus["./vector.js"].distanceBetween = distanceBetween;
    HabitatFrogasaurus["./vector.js"].angleBetween = angleBetween;
    HabitatFrogasaurus["./vector.js"].registerVectorMethods = registerVectorMethods2;
  }
  {
    HabitatFrogasaurus["./lerp.js"] = {};
    const lerp2 = ([a, b], distance) => {
      const range = subtract2(b, a);
      const displacement = scale(range, distance);
      return add(a, displacement);
    };
    const bilerp = ([a, b, c, d], displacement) => {
      const [dx, dy] = displacement;
      const la = lerp2([a, b], dx);
      const lb = lerp2([d, c], dx);
      const line = [la, lb];
      return lerp2(line, dy);
    };
    const ibilerp = ([a, b, c, d], value) => {
      if (typeof value === "number") {
        throw new Error(
          `[Habitat] Sorry, 'ibilerp' doesn't support numbers yet - only vectors... Please contact @todepond :)`
        );
      }
      const e = subtract2(b, a);
      const f = subtract2(d, a);
      const g = add(subtract2(a, b), subtract2(c, d));
      const h = subtract2(value, a);
      const k2 = crossProduct(g, f);
      const k1 = crossProduct(e, f) + crossProduct(h, g);
      const k0 = crossProduct(h, e);
      if (Math.abs(k2) < 1e-4) {
        const x = (h[0] * k1 + f[0] * k0) / (e[0] * k1 - g[0] * k0);
        const y = -k0 / k1;
        return [x, y];
      }
      let w = k1 * k1 - 4 * k0 * k2;
      w = Math.sqrt(w);
      const ik2 = 0.5 / k2;
      let v = (-k1 - w) * ik2;
      let u = (h[0] - f[0] * v) / (e[0] + g[0] * v);
      if (u < 0 || u > 1 || v < 0 || v > 1) {
        v = (-k1 + w) * ik2;
        u = (h[0] - f[0] * v) / (e[0] + g[0] * v);
      }
      return [u, v];
    };
    HabitatFrogasaurus["./lerp.js"].lerp = lerp2;
    HabitatFrogasaurus["./lerp.js"].bilerp = bilerp;
    HabitatFrogasaurus["./lerp.js"].ibilerp = ibilerp;
  }
  {
    HabitatFrogasaurus["./array.js"] = {};
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };
    const trimArray = (array) => {
      if (array.length == 0) return array;
      let start = array.length - 1;
      let end = 0;
      for (let i = 0; i < array.length; i++) {
        const value = array[i];
        if (value !== void 0) {
          start = i;
          break;
        }
      }
      for (let i = array.length - 1; i >= 0; i--) {
        const value = array[i];
        if (value !== void 0) {
          end = i + 1;
          break;
        }
      }
      array.splice(end);
      array.splice(0, start);
      return array;
    };
    const repeatArray = (array, count) => {
      if (count === 0) {
        array.splice(0);
        return array;
      } else if (count < 0) {
        array.reverse();
        count = Math.abs(count);
      }
      const clone = [...array];
      for (let i = 0; i < count - 1; i++) {
        array.push(...clone);
      }
      return array;
    };
    HabitatFrogasaurus["./array.js"].shuffleArray = shuffleArray;
    HabitatFrogasaurus["./array.js"].trimArray = trimArray;
    HabitatFrogasaurus["./array.js"].repeatArray = repeatArray;
  }
  {
    HabitatFrogasaurus["./javascript.js"] = {};
    const JavaScript = (source) => {
      const code = `return ${source}`;
      const value = new Function(code)();
      return value;
    };
    HabitatFrogasaurus["./javascript.js"].JavaScript = JavaScript;
  }
  {
    HabitatFrogasaurus["./string.js"] = {};
    const divideString = (string, length) => {
      const regExp = RegExp(`[^]{1,${length}}`, "g");
      return string.match(regExp);
    };
    HabitatFrogasaurus["./string.js"].divideString = divideString;
  }
  {
    HabitatFrogasaurus["./stage.js"] = {};
    const Stage = function(properties) {
      const template = struct({
        context: void 0,
        scale: 1,
        aspectRatio: void 0,
        speed: 1,
        clock: 0,
        paused: false,
        start: () => {
        },
        resize: () => {
        },
        tick: () => {
        },
        update: () => {
        }
      });
      const stage2 = template(properties);
      if (document.body === null) {
        addEventListener("load", () => {
          requestAnimationFrame(() => start(stage2));
        });
      } else {
        requestAnimationFrame(() => start(stage2));
      }
      return stage2;
    };
    const start = (stage2) => {
      if (stage2.context === void 0) {
        const canvas = document.createElement("canvas");
        canvas.style["background-color"] = "#171d28";
        document.body.style["background-color"] = "#06070a";
        document.body.style["margin"] = "0px";
        document.body.style["overflow"] = "hidden";
        document.body.appendChild(canvas);
        stage2.context = canvas.getContext("2d");
      }
      on("resize", () => resize(stage2));
      on(keyDown(" "), () => stage2.paused = !stage2.paused);
      stage2.start(stage2.context);
      resize(stage2);
      tick(stage2);
    };
    const resize = (stage2) => {
      let width = innerWidth;
      let height = innerHeight;
      if (stage2.aspectRatio !== void 0) {
        const [x, y] = stage2.aspectRatio;
        height = innerWidth * y / x;
        const heightGrowth = height / innerHeight;
        if (heightGrowth > 1) {
          height /= heightGrowth;
          width /= heightGrowth;
        }
      }
      const scaledWidth = width * stage2.scale;
      const scaledHeight = height * stage2.scale;
      const { canvas } = stage2.context;
      canvas.width = Math.round(scaledWidth * devicePixelRatio);
      canvas.height = Math.round(scaledHeight * devicePixelRatio);
      canvas.style["width"] = Math.round(scaledWidth);
      canvas.style["height"] = Math.round(scaledHeight);
      const marginHorizontal = (innerWidth - scaledWidth) / 2;
      const marginVertical = (innerHeight - scaledHeight) / 2;
      canvas.style["margin-left"] = marginHorizontal;
      canvas.style["margin-right"] = marginHorizontal;
      canvas.style["margin-top"] = marginVertical;
      canvas.style["margin-bottom"] = marginVertical;
      stage2.resize(stage2.context);
    };
    const tick = (stage2) => {
      stage2.clock += stage2.speed;
      while (stage2.clock > 0) {
        if (!stage2.paused) stage2.update(stage2.context);
        stage2.tick(stage2.context, stage2);
        stage2.clock--;
      }
      requestAnimationFrame(() => tick(stage2));
    };
    HabitatFrogasaurus["./stage.js"].Stage = Stage;
  }
  {
    HabitatFrogasaurus["./async.js"] = {};
    const sleep2 = (duration) => {
      new Promise((resolve) => setTimeout(resolve, duration));
    };
    HabitatFrogasaurus["./async.js"].sleep = sleep2;
  }
  {
    HabitatFrogasaurus["./pointer.js"] = {};
    let isPointerTracked = false;
    const pointer2 = {
      position: [void 0, void 0],
      down: void 0
    };
    const getPointer = () => {
      if (isPointerTracked) return pointer2;
      isPointerTracked = true;
      addEventListener("pointermove", (e) => {
        pointer2.position[0] = e.clientX;
        pointer2.position[1] = e.clientY;
      });
      addEventListener("pointerdown", (e) => {
        pointer2.position[0] = e.clientX;
        pointer2.position[1] = e.clientY;
        pointer2.down = true;
      });
      addEventListener("pointerup", (e) => {
        pointer2.position[0] = e.clientX;
        pointer2.position[1] = e.clientY;
        pointer2.down = false;
      });
      return pointer2;
    };
    HabitatFrogasaurus["./pointer.js"].getPointer = getPointer;
  }
  {
    HabitatFrogasaurus["./keyboard.js"] = {};
    const keyboard = {};
    let isKeyboardTracked = false;
    const getKeyboard = () => {
      if (isKeyboardTracked) return keyboard;
      isKeyboardTracked = true;
      on("keydown", (e) => {
        keyboard[e.key] = true;
      });
      on("keyup", (e) => {
        keyboard[e.key] = false;
      });
      return keyboard;
    };
    let isKeyDownTracked = false;
    const keyDown2 = (key) => {
      if (!isKeyDownTracked) {
        isKeyDownTracked = true;
        on("keydown", (e) => fireEvent(`keyDown("${e.key}")`), { passive: false });
      }
      return `keyDown("${key}")`;
    };
    let isKeyUpTracked = false;
    const keyUp = (key) => {
      if (!isKeyUpTracked) {
        isKeyUpTracked = true;
        on("keyup", (e) => fireEvent(`keyUp("${e.key}")`), { passive: false });
      }
      return `keyUp("${key}")`;
    };
    HabitatFrogasaurus["./keyboard.js"].getKeyboard = getKeyboard;
    HabitatFrogasaurus["./keyboard.js"].keyDown = keyDown2;
    HabitatFrogasaurus["./keyboard.js"].keyUp = keyUp;
  }
  {
    HabitatFrogasaurus["./struct.js"] = {};
    const struct2 = (parameters) => function(args) {
      return __spreadValues(__spreadValues({}, parameters), args);
    };
    HabitatFrogasaurus["./struct.js"].struct = struct2;
  }
  {
    HabitatFrogasaurus["./colour.js"] = {};
    const wrapSplashNumber = (number) => {
      while (number < 0) number += 1e3;
      while (number > 999) number -= 1e3;
      return number;
    };
    const getThreeDigits = (number) => {
      const chars = number.toString().padStart(3, "0").split("");
      const digits = chars.map((v) => parseInt(v));
      return digits;
    };
    const Colour = class extends Array {
      constructor(red, green, blue, alpha = 255) {
        super();
        this.push(red, green, blue);
        if (alpha !== void 0) {
          this.push(alpha);
        }
      }
      toString() {
        const [red, green, blue, alpha] = this.map((v) => v.toString(16).padStart(2, "0"));
        if (this.alpha === 255) {
          return `#${red}${green}${blue}`;
        }
        return `#${red}${green}${blue}${alpha}`;
      }
    };
    const Splash = class extends Colour {
      constructor(number) {
        const wrappedNumber = wrapSplashNumber(number);
        const [hundreds, tens, ones] = getThreeDigits(wrappedNumber, 3);
        const red = RED_SPLASH_VALUES[hundreds];
        const green = GREEN_SPLASH_VALUES[tens];
        const blue = BLUE_SPLASH_VALUES[ones];
        super(red, green, blue);
        Reflect.defineProperty(this, "splash", {
          value: number,
          enumerable: false
        });
      }
    };
    const showColour = (colour) => {
      console.log("%c   ", `background-color: ${new Colour(...colour)}`);
    };
    const registerColourMethods2 = () => {
      defineGetter(Array.prototype, "red", function() {
        return this[0];
      });
      defineGetter(Array.prototype, "green", function() {
        return this[1];
      });
      defineGetter(Array.prototype, "blue", function() {
        return this[2];
      });
      defineGetter(Array.prototype, "alpha", function() {
        return this[3];
      });
    };
    const RED_SPLASH_VALUES = [23, 55, 70, 98, 128, 159, 174, 204, 242, 255];
    const GREEN_SPLASH_VALUES = [29, 67, 98, 128, 159, 174, 204, 222, 245, 255];
    const BLUE_SPLASH_VALUES = [40, 70, 98, 128, 159, 174, 204, 222, 247, 255];
    const VOID = new Colour(6, 7, 10);
    const BLACK = new Splash(0);
    const GREY = new Splash(112);
    const SILVER = new Splash(556);
    const WHITE = new Splash(999);
    const GREEN = new Splash(293);
    const CYAN = new Splash(269);
    const BLUE = new Splash(239);
    const PURPLE = new Splash(418);
    const PINK = new Splash(937);
    const CORAL = new Splash(933);
    const RED = new Splash(911);
    const ORANGE = new Splash(931);
    const YELLOW = new Splash(991);
    const HUES = [GREEN, CYAN, BLUE, PURPLE, PINK, CORAL, RED, ORANGE, YELLOW];
    const SHADES = [VOID, BLACK, GREY, SILVER, WHITE];
    const COLOURS = [...SHADES, ...HUES];
    HabitatFrogasaurus["./colour.js"].Colour = Colour;
    HabitatFrogasaurus["./colour.js"].Splash = Splash;
    HabitatFrogasaurus["./colour.js"].showColour = showColour;
    HabitatFrogasaurus["./colour.js"].registerColourMethods = registerColourMethods2;
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
  {
    HabitatFrogasaurus["./json.js"] = {};
    const _ = (value) => {
      return JSON.stringify(value);
    };
    HabitatFrogasaurus["./json.js"]._ = _;
  }
  {
    HabitatFrogasaurus["./mouse.js"] = {};
    let isMouseTracked = false;
    const buttonNames = ["Left", "Middle", "Right", "Back", "Forward"];
    const mouse = {
      position: [void 0, void 0]
    };
    const getMouse = () => {
      if (isMouseTracked) return mouse;
      isMouseTracked = true;
      on("mousemove", (e) => {
        mouse.position[0] = e.clientX;
        mouse.position[1] = e.clientY;
      });
      on("mousedown", (e) => {
        mouse.position[0] = e.clientX;
        mouse.position[1] = e.clientY;
        const buttonName = buttonNames[e.button];
        mouse[buttonName] = true;
      });
      on("mouseup", (e) => {
        mouse.position[0] = e.clientX;
        mouse.position[1] = e.clientY;
        const buttonName = buttonNames[e.button];
        mouse[buttonName] = false;
      });
      return mouse;
    };
    let isMouseDownTracked = false;
    const mouseDown = (buttonName) => {
      const button = buttonNames.indexOf(buttonName);
      if (!isMouseDownTracked) {
        isMouseDownTracked = true;
        on("mousedown", (e) => fireEvent(`mouseDown("${e.button}")`), { passive: false });
      }
      return `mouseDown("${button}")`;
    };
    let isMouseUpTracked = false;
    const mouseUp = (buttonName) => {
      const button = buttonNames.indexOf(buttonName);
      if (!isMouseUpTracked) {
        isMouseUpTracked = true;
        on("mouseup", (e) => fireEvent(`mouseUp("${e.button}")`), { passive: false });
      }
      return `mouseUp("${button}")`;
    };
    HabitatFrogasaurus["./mouse.js"].getMouse = getMouse;
    HabitatFrogasaurus["./mouse.js"].mouseDown = mouseDown;
    HabitatFrogasaurus["./mouse.js"].mouseUp = mouseUp;
  }
  {
    HabitatFrogasaurus["./tween.js"] = {};
    const tween = (object, key, options) => {
      const value = object[key];
      const { start = value, end = value, duration = 1e3, easeIn = 0, easeOut = 0, ratio = 0.5 } = options;
      const startTime = performance.now();
      const endTime = startTime + duration;
      defineGetter(object, key, () => {
        const currentTime = performance.now();
        if (currentTime >= endTime) {
          Reflect.defineProperty(object, key, {
            value: end,
            writable: true,
            configurable: true,
            enumerable: true
          });
          return end;
        }
        const time = currentTime - startTime;
        const interpolation = ease(time / duration, {
          easeIn,
          easeOut,
          ratio: 1 - ratio
        });
        return lerp([start, end], interpolation);
      });
    };
    const ease = (t, { easeIn, easeOut, ratio }) => {
      const f = (t2, slope) => __pow(t2, 1 + slope);
      return f(t * ratio * 2, easeIn) / (f(t * ratio * 2, easeIn) + f((1 - t) * (1 - ratio) * 2, easeOut));
    };
    HabitatFrogasaurus["./tween.js"].tween = tween;
  }
  {
    HabitatFrogasaurus["./touch.js"] = {};
    const touches = [];
    let isTouchTracked = false;
    const getTouches = () => {
      if (!isTouchTracked) {
        isTouchTracked = true;
        on("touchstart", (e) => {
          for (const changedTouch of e.changedTouches) {
            const id = changedTouch.identifier;
            if (touches[id] === void 0) {
              touches[id] = { position: [void 0, void 0] };
            }
            const touch = touches[id];
            touch.position[0] = changedTouch.clientX;
            touch.position[1] = changedTouch.clientY;
          }
        });
        on("touchmove", (e) => {
          for (const changedTouch of e.changedTouches) {
            const id = changedTouch.identifier;
            const touch = touches[id];
            touch.position[0] = changedTouch.clientX;
            touch.position[1] = changedTouch.clientY;
          }
        });
        on("touchend", (e) => {
          for (const changedTouch of e.changedTouches) {
            const id = changedTouch.identifier;
            touches[id] = void 0;
          }
        });
      }
      return touches;
    };
    HabitatFrogasaurus["./touch.js"].getTouches = getTouches;
  }
  {
    HabitatFrogasaurus["./document.js"] = {};
    const $ = (...args) => document.querySelector(...args);
    const $$ = (...args) => document.querySelectorAll(...args);
    HabitatFrogasaurus["./document.js"].$ = $;
    HabitatFrogasaurus["./document.js"].$$ = $$;
  }
  const { registerColourMethods } = HabitatFrogasaurus["./colour.js"];
  const { registerDebugMethods } = HabitatFrogasaurus["./console.js"];
  const { registerVectorMethods, add, crossProduct, scale, subtract: subtract2 } = HabitatFrogasaurus["./vector.js"];
  const { defineGetter, defineAccessor } = HabitatFrogasaurus["./property.js"];
  const { struct } = HabitatFrogasaurus["./struct.js"];
  const { keyDown } = HabitatFrogasaurus["./keyboard.js"];
  const { on, fireEvent } = HabitatFrogasaurus["./event.js"];
  const { lerp } = HabitatFrogasaurus["./lerp.js"];
}
var Habitat = {
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
  $$: HabitatFrogasaurus["./document.js"].$$
};

// src/libraries/camera.ts
var View = class {
  constructor(options = {}) {
    Object.assign(this, __spreadValues({
      position: [0, 0],
      dimensions: [1, 1]
    }, options));
  }
  // world position -> view position
  cast(position) {
    const [x, y] = Habitat.add(position, this.position);
    const [width, height] = this.dimensions;
    return [x / width, y / height];
  }
  // view position -> world position
  get(position) {
    const [x, y] = position;
    const [width, height] = this.dimensions;
    return Habitat.subtract([x * width, y * height], this.position);
  }
  // World position at center of view
  getCenter() {
    return this.get([0.5, 0.5]);
  }
  // World bounds of the view
  getBounds() {
    const a = this.position;
    const b = Habitat.add(this.position, this.dimensions);
    return {
      left: Math.min(a[0], b[0]),
      right: Math.max(a[0], b[0]),
      top: Math.min(a[1], b[1]),
      bottom: Math.max(a[1], b[1])
    };
  }
  // Pan the view by a given amount
  pan(displacement) {
    this.position = Habitat.add(this.position, displacement);
  }
  // Zoom the view by a given amount, centered at a given point
  zoom(scale, center = this.getCenter()) {
    const [x, y] = this.position;
    const [width, height] = this.dimensions;
    this.position = Habitat.add(this.position, multiply(subtract(center, this.position), 1 - scale));
    this.dimensions = multiply([width, height], scale);
  }
  // Is a given world position within the view?
  contains(position) {
    const { left, right, top, bottom } = this.getBounds();
    const [x, y] = position;
    return x >= left && x <= right && y >= top && y <= bottom;
  }
  resize(dimensions) {
    this.dimensions = dimensions;
  }
};

// src/elements.ts
var ELEMENTS = /* @__PURE__ */ new Map();

// src/sugar.ts
var split = (cell, [rows, columns]) => {
  const { left, right, top, bottom } = cell.bounds;
  const [width, height] = cell.dimensions;
  const splitWidth = width / columns;
  const splitHeight = height / rows;
  const cells = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const splitCell = new Cell({
        bounds: {
          left: left + j * splitWidth,
          top: top + i * splitHeight,
          right: right - (columns - j - 1) * splitWidth,
          bottom: bottom - (rows - i - 1) * splitHeight
        },
        colour: cell.colour
      });
      cells.push(splitCell);
    }
  }
  return cells;
};
var chop = (cell, axis, targets) => {
  if (targets.length === 0) {
    return [cell];
  }
  const direction = AXIS[axis];
  targets = targets.sort((a, b) => a - b).filter((v, i) => {
    const previous = targets[i - 1];
    return previous === void 0 || v !== previous;
  });
  const cells = [];
  let currentTarget = cell.bounds[direction.min];
  for (let i = 0; i <= targets.length; i++) {
    const target = targets[i] || cell.bounds[direction.max];
    if (target === currentTarget) {
      continue;
    }
    const bounds = {
      [direction.min]: currentTarget,
      [direction.max]: target,
      [direction.adjacent.min]: cell.bounds[direction.adjacent.min],
      [direction.adjacent.max]: cell.bounds[direction.adjacent.max]
    };
    const choppedCell = new Cell({
      bounds,
      colour: cell.colour
    });
    cells.push(choppedCell);
    currentTarget = target;
  }
  return cells;
};
var merge = (cells, colour = cells[0].colour) => {
  if (cells.length === 0) {
    throw new Error("Cannot merge 0 cells");
  }
  let left = Infinity;
  let top = Infinity;
  let right = -Infinity;
  let bottom = -Infinity;
  for (const cell of cells) {
    const { bounds } = cell;
    left = Math.min(left, bounds.left);
    top = Math.min(top, bounds.top);
    right = Math.max(right, bounds.right);
    bottom = Math.max(bottom, bounds.bottom);
  }
  return new Cell({
    colour,
    bounds: {
      left,
      top,
      right,
      bottom
    }
  });
};
var reposition = (cell, bounds) => {
  return new Cell({
    colour: cell.colour,
    bounds: __spreadValues(__spreadValues({}, cell.bounds), bounds)
  });
};
var recolour = (cell, colour) => {
  return new Cell({
    colour,
    bounds: cell.bounds
  });
};
var pickContacts = (cell, world, edge = "right") => {
  const { bounds } = cell;
  const direction = DIRECTION[edge];
  const opposite = direction.opposite;
  const oppositeEdge = opposite.name;
  const front = bounds[edge];
  const min = bounds[direction.min];
  const max = bounds[direction.max];
  const cache = world.caches[oppositeEdge];
  const set = cache.get(front);
  if (set === void 0) {
    return [];
  }
  const cells = [];
  for (const other of set) {
    const otherMin = other.bounds[direction.min];
    const otherMax = other.bounds[direction.max];
    if (otherMin >= max || otherMax <= min) {
      continue;
    }
    cells.push(other);
  }
  return cells;
};
var snipContacts = (cell, contacts, edge, reach = Infinity) => {
  const direction = DIRECTION[edge];
  const opposite = direction.opposite;
  const adjacent = direction.adjacent;
  const oppositeEdge = opposite.name;
  const contactReach = Math.min(reach, ...contacts.map((contact) => contact.dimensions[adjacent.dimensionNumber]));
  const signedReach = contactReach * direction.sign;
  const sizeds = [];
  const excesses = [];
  for (const contact of contacts) {
    const { bounds } = contact;
    const chops = chop(contact, direction.adjacent.axis, [bounds[oppositeEdge] + signedReach]);
    if (direction.sign === 1) {
      const [sized, excess] = chops;
      sizeds.push(sized);
      if (excess !== void 0) {
        excesses.push(excess);
      }
    } else {
      const [head, tail] = chops;
      if (tail !== void 0) {
        sizeds.push(tail);
        excesses.push(head);
      } else {
        sizeds.push(head);
      }
    }
  }
  const cellMin = cell.bounds[direction.min];
  const cellMax = cell.bounds[direction.max];
  const snips = [];
  for (let sized of sizeds) {
    const sizedMin = sized.bounds[direction.min];
    if (sizedMin < cellMin) {
      const [excess, snip] = chop(sized, direction.axis, [cellMin]);
      sized = snip;
      excesses.push(excess);
    }
    const sizedMax = sized.bounds[direction.max];
    if (sizedMax > cellMax) {
      const [snip, excess] = chop(sized, direction.axis, [cellMax]);
      sized = snip;
      excesses.push(excess);
    }
    snips.push(sized);
  }
  return [snips, excesses, contactReach];
};
var pickSnips = (cell, world, edge, reach) => {
  const contacts = pickContacts(cell, world, edge);
  const [snips, excesses, maxReach] = snipContacts(cell, contacts, edge, reach);
  return { contacts, snips, excesses, reach: maxReach };
};
var swapSnips = (cell, snips, edge) => {
  const direction = DIRECTION[edge];
  const adjacent = direction.adjacent;
  const opposite = direction.opposite;
  const oppositeEdge = opposite.name;
  const cellSize = cell.dimensions[adjacent.dimensionNumber];
  const front = snips[0].bounds[edge];
  const back = cell.bounds[oppositeEdge];
  const middle = front - cellSize * direction.sign;
  const newCell = reposition(cell, {
    [edge]: direction.sign === 1 ? front : front,
    [oppositeEdge]: direction.sign === 1 ? middle : middle
  });
  const newSnips = [];
  for (const snip of snips) {
    const newSnip = reposition(snip, {
      [oppositeEdge]: direction.sign === 1 ? back : back,
      [edge]: direction.sign === 1 ? middle : middle
    });
    newSnips.push(newSnip);
  }
  return [newCell, ...newSnips];
};
var defaultJudge = (cells) => {
  const areas = cells.map((cell) => cell.dimensions[0] * cell.dimensions[1]);
  const maxArea = Math.max(...areas);
  return maxArea;
};
var defaultCompare = (a, b = -Infinity) => a > b;
var defaultFilter = (cell) => {
  const age = shared.clock - cell.birth;
  return age > 0;
};
var tryToSleep = (cell, world, { edges = Object.keys(DIRECTION), judge = defaultJudge, compare = defaultCompare, filter = defaultFilter } = {}) => {
  let winner = void 0;
  let highScore = void 0;
  for (const edge of Habitat.shuffleArray(edges)) {
    const replacement = sleep(cell, world, edge, filter);
    const { oldCells: oldCells2, newCells: newCells2 } = replacement;
    if (newCells2.length === 0) continue;
    const newScore = judge(newCells2);
    const oldScore = judge(oldCells2);
    if (compare(newScore, oldScore) && compare(newScore, highScore)) {
      highScore = newScore;
      winner = replacement;
    }
  }
  if (winner === void 0) {
    return [];
  }
  const { oldCells, newCells } = winner;
  return world.replace(oldCells, newCells);
};
var equals = (a, b) => {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};
var move = (cell, world, edge, speed, minSize = 0) => {
  const direction = DIRECTION[edge];
  const below = pickSnips(cell, world, edge, speed);
  if (below.snips.length === 0) {
    return [];
  }
  const water = cell;
  if (below.snips.every((c) => !SOLID.has(c.colour.splash) && c.colour.splash !== cell.splash)) {
    const movedCells = swapSnips(water, below.snips, edge);
    return [
      [cell, ...below.contacts],
      [...below.excesses, ...movedCells]
    ];
  }
  const gaps = below.snips.filter((c) => !SOLID.has(c.colour.splash) && c.colour.splash !== cell.splash);
  if (gaps.length > 0) {
    const targets = gaps.map((v) => [v.bounds[direction.min], v.bounds[direction.max]]).flat();
    const pieces = chop(water, direction.axis, targets);
    for (const piece of pieces) {
      if (water.dimensions[direction.dimensionNumber] >= minSize && piece.dimensions[direction.dimensionNumber] <= minSize) {
        return [];
      }
    }
    3;
    return [[water], [...pieces]];
  }
  return [];
};
var sleep = (cell, world, edge, filter) => {
  const failure = { oldCells: [], newCells: [] };
  const direction = DIRECTION[edge];
  const contacts = pickContacts(cell, world, edge).filter(filter);
  if (contacts.length === 0) {
    return failure;
  }
  const candidates = Habitat.shuffleArray(contacts);
  const splitCandidates = [];
  for (const candidate of candidates) {
    if (!equals(candidate.colour, cell.colour)) {
      continue;
    }
    if (candidate.bounds[direction.min] === cell.bounds[direction.min] && candidate.bounds[direction.max] === cell.bounds[direction.max]) {
      const newCells = [merge([cell, candidate])];
      const oldCells = [cell, candidate];
      return { oldCells, newCells };
    }
    if (candidate.bounds[direction.min] > cell.bounds[direction.min] || candidate.bounds[direction.max] < cell.bounds[direction.max]) {
      continue;
    }
    splitCandidates.push(candidate);
  }
  for (const candidate of splitCandidates) {
    const targets = [];
    let mergeIndex = 0;
    if (candidate.bounds[direction.min] < cell.bounds[direction.min]) {
      targets.push(cell.bounds[direction.min]);
      mergeIndex = 1;
    }
    if (candidate.bounds[direction.max] > cell.bounds[direction.max]) {
      targets.push(cell.bounds[direction.max]);
    }
    const splitCells = chop(candidate, direction.axis, targets);
    const mergedCell = merge([cell, splitCells[mergeIndex]]);
    const oldCells = [cell, candidate];
    const newCells = [mergedCell, ...splitCells.filter((c, i) => i !== mergeIndex)];
    return { oldCells, newCells };
  }
  return failure;
};
var distanceToBounds = (point, bounds) => {
  const { x, y } = point;
  const { left, right, top, bottom } = bounds;
  const dx = Math.max(left - x, 0, x - right);
  const dy = Math.max(top - y, 0, y - bottom);
  return Math.sqrt(dx * dx + dy * dy);
};

// src/elements/air.ts
var AIR_SPLASH = Habitat.GREY.splash;
ELEMENTS.set(AIR_SPLASH, {
  name: "Air",
  key: ["0"],
  update: (cell, world) => {
    const target = getPointerAirTarget(cell);
    const dimensionErrorScale = cell.dimensions.map((v) => v / target);
    const judge = (cells) => {
      let errors = [];
      for (const cell2 of cells) {
        if (cell2.dimensions[0] < MIN_SIZE || cell2.dimensions[1] < MIN_SIZE) {
        }
        const target2 = getPointerAirTarget(cell2);
        const dimensionErrorScale2 = cell2.dimensions.map((v) => v / target2);
        const dimensionErrorDiff = dimensionErrorScale2.map((v) => Math.abs(1 - v));
        const errorDiff = Math.max(dimensionErrorDiff[0], dimensionErrorDiff[1]);
        errors.push(errorDiff);
      }
      const sum = errors.reduce((a, b) => a + b, 0);
      const average = sum / errors.length;
      const score = -average;
      return score;
    };
    const compareSplit = (a, b = -Infinity) => {
      return a >= b;
    };
    const compare = (a, b = -Infinity) => {
      return a >= b;
    };
    const veryTooWide = dimensionErrorScale[0] >= 2;
    const veryTooTall = dimensionErrorScale[1] >= 2;
    if (veryTooWide || veryTooTall) {
      const columns = veryTooTall ? 2 : 1;
      const rows = veryTooWide ? 2 : 1;
      const splitCells = split(cell, [columns, rows]);
      const splitScores = judge(splitCells);
      const originalScores = judge([cell]);
      if (compareSplit(splitScores, originalScores)) {
        return world.replace([cell], splitCells);
      }
    }
    const tooThin = dimensionErrorScale[1] < 1;
    const tooShort = dimensionErrorScale[0] < 1;
    if (tooThin && tooShort) {
      return tryToSleep(cell, world, { judge, compare });
    }
    if (tooThin) {
      const result = tryToSleep(cell, world, { edges: ["top", "bottom"], judge, compare });
      if (result.length > 0) {
        return result;
      }
    }
    if (tooShort) {
      const result = tryToSleep(cell, world, { edges: ["left", "right"], judge, compare });
      if (result.length > 0) {
        return result;
      }
    }
    return [];
  }
});

// src/script.ts
var shared = {
  clock: 0,
  brush: {
    colour: Habitat.YELLOW
  }
};
var Cell = class {
  constructor(options = {}) {
    Object.assign(this, __spreadValues({
      bounds: {
        left: 0,
        right: 1,
        top: 0,
        bottom: 1
      },
      colour: Habitat.BLACK
    }, options));
    this.birth = shared.clock;
    this.splash = this.colour.splash;
    const x = this.bounds.left;
    const y = this.bounds.top;
    this.position = [x, y];
    const width = this.bounds.right - this.bounds.left;
    const height = this.bounds.bottom - this.bounds.top;
    this.dimensions = [width, height];
    const widthTest1 = this.bounds.left + width === this.bounds.right;
    const widthTest2 = this.bounds.right - width === this.bounds.left;
    const heightTest1 = this.bounds.top + height === this.bounds.bottom;
    const heightTest2 = this.bounds.bottom - height === this.bounds.top;
    if (!widthTest1) {
      console.error("Cell bounds are not consistent with dimensions", this.bounds.left + width, this.bounds.right);
    }
    if (!widthTest2) {
      console.error("Cell bounds are not consistent with dimensions", this.bounds.right - width, this.bounds.left);
    }
    if (!heightTest1) {
      console.error(
        "Cell bounds are not consistent with dimensions",
        this.bounds.top + height,
        this.bounds.bottom
      );
    }
    if (!heightTest2) {
      console.error(
        "Cell bounds are not consistent with dimensions",
        this.bounds.bottom - height,
        this.bounds.top
      );
    }
  }
  clear(image) {
    const { colour } = this;
    this.colour = Habitat.VOID;
    this.draw(image);
    this.colour = colour;
  }
  draw(image) {
    const [x, y] = [this.position[0] * image.width, this.position[1] * image.height];
    const [width, height] = [this.dimensions[0] * image.width, this.dimensions[1] * image.height];
    const left = Math.floor(x);
    const right = Math.floor(x + width);
    const top = Math.floor(y);
    const bottom = Math.floor(y + height);
    const drawnWidth = right - left;
    const drawnHeight = bottom - top;
    let i = getPixelIndex(image, left, top);
    let BORDER_WIDTH = Math.min(1, Math.min(drawnWidth, drawnHeight) / 10);
    if (BORDER_WIDTH < 1) {
      if (BORDER_WIDTH > 0.4) {
        BORDER_WIDTH = 1;
      } else {
        BORDER_WIDTH = 1;
      }
    }
    const area = this.dimensions[0] * this.dimensions[1];
    const fillColour = this.colour;
    for (let y2 = top; y2 <= bottom; y2++) {
      for (let x2 = left; x2 <= right; x2++) {
        const isBorder = BORDER_WIDTH > 0 && (x2 < left + BORDER_WIDTH || x2 > right - BORDER_WIDTH || y2 < top + BORDER_WIDTH || y2 > bottom - BORDER_WIDTH);
        const colour = isBorder ? Habitat.VOID : fillColour;
        image.data[i + 0] = colour[0];
        image.data[i + 1] = colour[1];
        image.data[i + 2] = colour[2];
        i += 4;
      }
      i += (image.width - drawnWidth - 1) * 4;
    }
  }
};
var getPixelIndex = (image, x, y) => {
  return (x + y * image.width) * 4;
};
var setImageAlpha = (image, alpha) => {
  for (let i = 3; i < image.data.length; i += 4) {
    image.data[i] = alpha;
  }
};
var World = class {
  constructor({ colour = Habitat.BLACK } = {}) {
    this.cells = /* @__PURE__ */ new Set();
    this.caches = {
      left: /* @__PURE__ */ new Map(),
      right: /* @__PURE__ */ new Map(),
      top: /* @__PURE__ */ new Map(),
      bottom: /* @__PURE__ */ new Map()
    };
    this.add(new Cell({ colour }));
  }
  add(cell) {
    this.cells.add(cell);
    this.cache(cell);
  }
  delete(cell) {
    this.cells.delete(cell);
    this.uncache(cell);
  }
  cache(cell) {
    for (const key in DIRECTION) {
      const cache = this.caches[key];
      const address = cell.bounds[key];
      let set = cache.get(address);
      if (set === void 0) {
        set = /* @__PURE__ */ new Set();
        cache.set(address, set);
      }
      set.add(cell);
    }
  }
  uncache(cell) {
    for (const key in DIRECTION) {
      const cache = this.caches[key];
      const address = cell.bounds[key];
      const set = cache.get(address);
      set.delete(cell);
      if (set.size === 0) {
        cache.delete(address);
      }
    }
  }
  draw(image) {
    for (const cell of this.cells) {
      cell.draw(image);
    }
  }
  replace(cells, newCells) {
    for (const cell of cells) {
      this.delete(cell);
    }
    for (const newCell of newCells) {
      newCell.birth = shared.clock;
      this.add(newCell);
    }
    return newCells;
  }
  pick(position) {
    const [x, y] = position;
    for (const cell of this.cells) {
      const [left, top] = cell.position;
      const [right, bottom] = [left + cell.dimensions[0], top + cell.dimensions[1]];
      if (x >= left && x <= right && y >= top && y <= bottom) {
        return cell;
      }
    }
  }
};
var DIRECTION = {
  left: {
    name: "left",
    min: "top",
    max: "bottom",
    axis: "x",
    dimensionNumber: 1,
    sign: -1
  },
  right: {
    name: "right",
    min: "top",
    max: "bottom",
    axis: "x",
    dimensionNumber: 1,
    sign: 1
  },
  top: {
    name: "top",
    min: "left",
    max: "right",
    axis: "y",
    dimensionNumber: 0,
    sign: -1
  },
  bottom: {
    name: "bottom",
    min: "left",
    max: "right",
    axis: "y",
    dimensionNumber: 0,
    sign: 1
  }
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
    sign: 1
  },
  y: {
    name: "y",
    min: "left",
    max: "right",
    edges: ["top", "bottom"],
    dimensionNumber: 0,
    sign: 1
  }
};
AXIS.x.opposite = AXIS.x;
AXIS.y.opposite = AXIS.y;
AXIS.x.adjacent = AXIS.y;
AXIS.y.adjacent = AXIS.x;
var global = {
  world: new World({ colour: Habitat.GREY }),
  camera: new View(),
  image: void 0
};
var stage = new Habitat.Stage({ speed: 2, paused: false });
stage.start = (context) => {
  const { canvas } = context;
  canvas.style["background-color"] = Habitat.VOID;
};
stage.resize = (context) => {
  const { world, camera } = global;
  const { canvas } = context;
  const size = Math.min(canvas.width, canvas.height);
  camera.resize([size, size]);
  const image = context.createImageData(size, size);
  setImageAlpha(image, 255);
  global.image = image;
  world.draw(image);
  const [x, y] = camera.get([0, 0]);
  context.putImageData(image, x, y);
};
stage.tick = (context) => {
  const { canvas } = context;
  const { image, camera } = global;
  const [x, y] = camera.get([0, 0]);
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.putImageData(image, x, y);
};
stage.update = (context) => {
  const { world, image, camera } = global;
  shared.clock = Habitat.wrap(shared.clock + 1, 0, 999);
  for (const cell of world.cells) {
    if (cell.birth === shared.clock) {
      continue;
    }
    const element = ELEMENTS.get(cell.colour.splash);
    if (element === void 0) {
      continue;
    }
    if (element.update !== void 0) {
      const newCells = element.update(cell, world);
      for (const newCell of newCells) {
        newCell.draw(image);
      }
    }
  }
  const pointer2 = Habitat.getPointer();
  if (pointer2.down) {
    const colour = shared.brush.colour;
    const cell = world.pick(camera.cast(Habitat.scale(pointer2.position, devicePixelRatio)));
    const canWrite = cell && (colour.splash === AIR_SPLASH || cell.colour.splash === AIR_SPLASH);
    if (canWrite) {
      const newCell = recolour(cell, colour);
      world.replace([cell], [newCell]);
      cell.clear(image);
      newCell.draw(image);
    }
  }
};
Object.assign(window, global);
Object.assign(window, shared);

// src/element.ts
var pointer = Habitat.getPointer();
Habitat.on(
  "keydown",
  (event) => {
    for (const [splash, element] of ELEMENTS) {
      if (element.key.includes(event.key)) {
        shared.brush.colour = new Habitat.Splash(splash).d;
        return;
      }
    }
  },
  { passive: false }
);
var FALL_SPEED = 1 / 128;
var MIN_SIZE = 1 / 256;
var POINTER_RADIUS = 0;
var POINTER_FADE_RADIUS = 0;
var POINTER_CELL_SIZE = 1 / 4;
var AIR_TARGET = 1 / 32;
var getPointerAirTarget = (cell) => {
  if (pointer.position.x === void 0) {
    return AIR_TARGET;
  }
  const pointerPosition = global.camera.cast(Habitat.scale(pointer.position, devicePixelRatio));
  const distanceFromPointer = distanceToBounds(pointerPosition, cell.bounds);
  if (distanceFromPointer < POINTER_RADIUS) {
    return POINTER_CELL_SIZE;
  } else if (distanceFromPointer < POINTER_FADE_RADIUS) {
    return Habitat.lerp([POINTER_CELL_SIZE, 1], distanceFromPointer - POINTER_RADIUS);
  }
  return AIR_TARGET;
};
var SOLID = /* @__PURE__ */ new Set([Habitat.YELLOW.splash, Habitat.GREEN.splash, Habitat.SILVER.splash]);

// src/elements/fire.ts
ELEMENTS.set(Habitat.RED.splash, {
  name: "Fire",
  key: ["f", "3"],
  update: (cell, world) => {
    if (Habitat.oneIn(200)) {
      return world.replace([cell], [recolour(cell, Habitat.GREY)]);
    }
    const movements = move(cell, world, Habitat.randomFrom(["left", "right", "top"]), FALL_SPEED);
    if (movements.length > 0) {
      return world.replace(...movements);
    }
    return tryToSleep(cell, world, { filter: () => true });
  }
});

// src/elements/plant.ts
ELEMENTS.set(Habitat.GREEN.splash, {
  name: "Plant",
  key: ["p", "5"],
  update: (cell, world) => {
    const allContacts = [
      ...pickContacts(cell, world, "top"),
      ...pickContacts(cell, world, "bottom"),
      ...pickContacts(cell, world, "left"),
      ...pickContacts(cell, world, "right")
    ];
    const changed = [];
    for (const contact of allContacts) {
      if (contact.colour.splash === Habitat.BLUE.splash) {
        const recoloured = recolour(contact, Habitat.GREEN);
        changed.push(...world.replace([contact], [recoloured]));
      }
    }
    return changed;
  }
});

// src/elements/sand.ts
ELEMENTS.set(Habitat.YELLOW.splash, {
  name: "Sand",
  key: ["s", "1"],
  update: (cell, world) => {
    const movements = move(cell, world, "bottom", FALL_SPEED);
    if (movements.length > 0) {
      return world.replace(...movements);
    }
    if (cell.dimensions[1] > MIN_SIZE) {
      const [above, me] = split(cell, [2, 1]);
      const splitReplacements = [[cell], [above, me]];
      const slideDirection = Habitat.randomFrom(["left", "right"]);
      const movements2 = move(above, world, slideDirection, FALL_SPEED);
      if (movements2.length > 0) {
        const splittings = world.replace(...splitReplacements);
        const movings = world.replace(...movements2);
        return [...splittings, ...movings];
      }
    }
    return tryToSleep(cell, world);
  }
});

// src/elements/stone.ts
ELEMENTS.set(Habitat.SILVER.splash, {
  name: "Stone",
  key: ["t", "4"],
  update: (cell, world) => {
    const movements = move(cell, world, "bottom", FALL_SPEED);
    if (movements.length > 0) {
      return world.replace(...movements);
    }
    return tryToSleep(cell, world);
  }
});

// src/elements/water.ts
ELEMENTS.set(Habitat.BLUE.splash, {
  name: "Water",
  key: ["w", "2"],
  update: (cell, world) => {
    const movements = move(cell, world, "bottom", FALL_SPEED);
    if (movements.length > 0) {
      return world.replace(...movements);
    }
    const slideDirection = Habitat.randomFrom(["left", "right"]);
    const slides = move(cell, world, slideDirection, FALL_SPEED, MIN_SIZE / 2);
    if (slides.length > 0) {
      return world.replace(...slides);
    }
    return tryToSleep(cell, world, { filter: () => true });
  }
});

// src/elements/acid.ts
ELEMENTS.set(Habitat.PURPLE.splash, {
  name: "Acid",
  key: ["a", "6"],
  update: (cell, world) => {
    const allContacts = [
      ...pickContacts(cell, world, "top"),
      ...pickContacts(cell, world, "bottom"),
      ...pickContacts(cell, world, "left"),
      ...pickContacts(cell, world, "right")
    ];
    const changed = [];
    for (const contact of allContacts) {
      if (contact.colour.splash !== Habitat.PURPLE.splash) {
        const recoloured = recolour(contact, Habitat.GREY);
        changed.push(...world.replace([contact], [recoloured]));
      }
    }
    const movements = move(cell, world, "bottom", FALL_SPEED);
    if (movements.length > 0) {
      return world.replace(...movements);
    }
    const slideDirection = Habitat.randomFrom(["left", "right"]);
    const slides = move(cell, world, slideDirection, FALL_SPEED, MIN_SIZE / 2);
    if (slides.length > 0) {
      return world.replace(...slides);
    }
    return tryToSleep(cell, world, { filter: () => true });
  }
});
