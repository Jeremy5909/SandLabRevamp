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
      Object.assign(window, Habitat2);
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
    const clamp2 = (number, min, max) => {
      if (number < min) return min;
      if (number > max) return max;
      return number;
    };
    const wrap2 = (number, min, max) => {
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
    HabitatFrogasaurus["./number.js"].clamp = clamp2;
    HabitatFrogasaurus["./number.js"].wrap = wrap2;
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
    const maxRandomNumberIndex = 2 ** 14;
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
    const randomFrom2 = (array) => {
      const index = random() % array.length;
      return array[index];
    };
    const oneIn2 = (times) => random() % times < 1;
    const maybe = (chance) => oneIn2(1 / chance);
    HabitatFrogasaurus["./random.js"].random = random;
    HabitatFrogasaurus["./random.js"].randomFrom = randomFrom2;
    HabitatFrogasaurus["./random.js"].oneIn = oneIn2;
    HabitatFrogasaurus["./random.js"].maybe = maybe;
  }
  {
    HabitatFrogasaurus["./event.js"] = {};
    const fireEvent2 = (name, options = {}) => {
      const { target = window, bubbles = true, cancelable = true, ...data } = options;
      const event = new Event(name, { bubbles, cancelable });
      for (const key in data) {
        event[key] = data[key];
      }
      target.dispatchEvent(event);
    };
    const on3 = (event, func, options) => {
      return addEventListener(event, func, options);
    };
    HabitatFrogasaurus["./event.js"].fireEvent = fireEvent2;
    HabitatFrogasaurus["./event.js"].on = on3;
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
    const scale3 = (value, scale4) => {
      if (typeof value === "number") return value * scale4;
      return value.map((v) => v * scale4);
    };
    const add3 = (a, b) => {
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
    HabitatFrogasaurus["./vector.js"].scale = scale3;
    HabitatFrogasaurus["./vector.js"].add = add3;
    HabitatFrogasaurus["./vector.js"].subtract = subtract3;
    HabitatFrogasaurus["./vector.js"].crossProduct = crossProduct2;
    HabitatFrogasaurus["./vector.js"].distanceBetween = distanceBetween;
    HabitatFrogasaurus["./vector.js"].angleBetween = angleBetween;
    HabitatFrogasaurus["./vector.js"].registerVectorMethods = registerVectorMethods2;
  }
  {
    HabitatFrogasaurus["./lerp.js"] = {};
    const lerp3 = ([a, b], distance) => {
      const range = subtract2(b, a);
      const displacement = scale2(range, distance);
      return add2(a, displacement);
    };
    const bilerp = ([a, b, c, d], displacement) => {
      const [dx, dy] = displacement;
      const la = lerp3([a, b], dx);
      const lb = lerp3([d, c], dx);
      const line = [la, lb];
      return lerp3(line, dy);
    };
    const ibilerp = ([a, b, c, d], value) => {
      if (typeof value === "number") {
        throw new Error(
          `[Habitat] Sorry, 'ibilerp' doesn't support numbers yet - only vectors... Please contact @todepond :)`
        );
      }
      const e = subtract2(b, a);
      const f = subtract2(d, a);
      const g = add2(subtract2(a, b), subtract2(c, d));
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
    HabitatFrogasaurus["./lerp.js"].lerp = lerp3;
    HabitatFrogasaurus["./lerp.js"].bilerp = bilerp;
    HabitatFrogasaurus["./lerp.js"].ibilerp = ibilerp;
  }
  {
    HabitatFrogasaurus["./array.js"] = {};
    const shuffleArray2 = (array) => {
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
    HabitatFrogasaurus["./array.js"].shuffleArray = shuffleArray2;
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
    const Stage2 = function(properties) {
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
      on2("resize", () => resize(stage2));
      on2(keyDown(" "), () => stage2.paused = !stage2.paused);
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
    HabitatFrogasaurus["./stage.js"].Stage = Stage2;
  }
  {
    HabitatFrogasaurus["./async.js"] = {};
    const sleep = (duration) => {
      new Promise((resolve) => setTimeout(resolve, duration));
    };
    HabitatFrogasaurus["./async.js"].sleep = sleep;
  }
  {
    HabitatFrogasaurus["./pointer.js"] = {};
    let isPointerTracked = false;
    const pointer2 = {
      position: [void 0, void 0],
      down: void 0
    };
    const getPointer2 = () => {
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
    HabitatFrogasaurus["./pointer.js"].getPointer = getPointer2;
  }
  {
    HabitatFrogasaurus["./keyboard.js"] = {};
    const keyboard = {};
    let isKeyboardTracked = false;
    const getKeyboard = () => {
      if (isKeyboardTracked) return keyboard;
      isKeyboardTracked = true;
      on2("keydown", (e) => {
        keyboard[e.key] = true;
      });
      on2("keyup", (e) => {
        keyboard[e.key] = false;
      });
      return keyboard;
    };
    let isKeyDownTracked = false;
    const keyDown2 = (key) => {
      if (!isKeyDownTracked) {
        isKeyDownTracked = true;
        on2("keydown", (e) => fireEvent(`keyDown("${e.key}")`), { passive: false });
      }
      return `keyDown("${key}")`;
    };
    let isKeyUpTracked = false;
    const keyUp = (key) => {
      if (!isKeyUpTracked) {
        isKeyUpTracked = true;
        on2("keyup", (e) => fireEvent(`keyUp("${e.key}")`), { passive: false });
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
      return { ...parameters, ...args };
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
    const Splash2 = class extends Colour {
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
    const VOID2 = new Colour(6, 7, 10);
    const BLACK2 = new Splash2(0);
    const GREY2 = new Splash2(112);
    const SILVER2 = new Splash2(556);
    const WHITE = new Splash2(999);
    const GREEN2 = new Splash2(293);
    const CYAN = new Splash2(269);
    const BLUE2 = new Splash2(239);
    const PURPLE2 = new Splash2(418);
    const PINK = new Splash2(937);
    const CORAL = new Splash2(933);
    const RED2 = new Splash2(911);
    const ORANGE = new Splash2(931);
    const YELLOW2 = new Splash2(991);
    const HUES = [GREEN2, CYAN, BLUE2, PURPLE2, PINK, CORAL, RED2, ORANGE, YELLOW2];
    const SHADES = [VOID2, BLACK2, GREY2, SILVER2, WHITE];
    const COLOURS = [...SHADES, ...HUES];
    HabitatFrogasaurus["./colour.js"].Colour = Colour;
    HabitatFrogasaurus["./colour.js"].Splash = Splash2;
    HabitatFrogasaurus["./colour.js"].showColour = showColour;
    HabitatFrogasaurus["./colour.js"].registerColourMethods = registerColourMethods2;
    HabitatFrogasaurus["./colour.js"].VOID = VOID2;
    HabitatFrogasaurus["./colour.js"].BLACK = BLACK2;
    HabitatFrogasaurus["./colour.js"].GREY = GREY2;
    HabitatFrogasaurus["./colour.js"].SILVER = SILVER2;
    HabitatFrogasaurus["./colour.js"].WHITE = WHITE;
    HabitatFrogasaurus["./colour.js"].GREEN = GREEN2;
    HabitatFrogasaurus["./colour.js"].CYAN = CYAN;
    HabitatFrogasaurus["./colour.js"].BLUE = BLUE2;
    HabitatFrogasaurus["./colour.js"].PURPLE = PURPLE2;
    HabitatFrogasaurus["./colour.js"].PINK = PINK;
    HabitatFrogasaurus["./colour.js"].CORAL = CORAL;
    HabitatFrogasaurus["./colour.js"].RED = RED2;
    HabitatFrogasaurus["./colour.js"].ORANGE = ORANGE;
    HabitatFrogasaurus["./colour.js"].YELLOW = YELLOW2;
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
      on2("mousemove", (e) => {
        mouse.position[0] = e.clientX;
        mouse.position[1] = e.clientY;
      });
      on2("mousedown", (e) => {
        mouse.position[0] = e.clientX;
        mouse.position[1] = e.clientY;
        const buttonName = buttonNames[e.button];
        mouse[buttonName] = true;
      });
      on2("mouseup", (e) => {
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
        on2("mousedown", (e) => fireEvent(`mouseDown("${e.button}")`), { passive: false });
      }
      return `mouseDown("${button}")`;
    };
    let isMouseUpTracked = false;
    const mouseUp = (buttonName) => {
      const button = buttonNames.indexOf(buttonName);
      if (!isMouseUpTracked) {
        isMouseUpTracked = true;
        on2("mouseup", (e) => fireEvent(`mouseUp("${e.button}")`), { passive: false });
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
        return lerp2([start, end], interpolation);
      });
    };
    const ease = (t, { easeIn, easeOut, ratio }) => {
      const f = (t2, slope) => t2 ** (1 + slope);
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
        on2("touchstart", (e) => {
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
        on2("touchmove", (e) => {
          for (const changedTouch of e.changedTouches) {
            const id = changedTouch.identifier;
            const touch = touches[id];
            touch.position[0] = changedTouch.clientX;
            touch.position[1] = changedTouch.clientY;
          }
        });
        on2("touchend", (e) => {
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
  const { registerVectorMethods, add: add2, crossProduct, scale: scale2, subtract: subtract2 } = HabitatFrogasaurus["./vector.js"];
  const { defineGetter, defineAccessor } = HabitatFrogasaurus["./property.js"];
  const { struct } = HabitatFrogasaurus["./struct.js"];
  const { keyDown } = HabitatFrogasaurus["./keyboard.js"];
  const { on: on2, fireEvent } = HabitatFrogasaurus["./event.js"];
  const { lerp: lerp2 } = HabitatFrogasaurus["./lerp.js"];
}
var Habitat2 = {
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

// src/element.js
var ELEMENTS2 = /* @__PURE__ */ new Map();
var pointer = getPointer();
on(
  "keydown",
  (event) => {
    for (const [splash, element] of ELEMENTS2) {
      if (element.key.includes(event.key)) {
        shared.brush.colour = new Splash(splash).d;
        return;
      }
    }
  },
  { passive: false }
);
var FALL_SPEED2 = 1 / 128;
var MIN_SIZE2 = 1 / 256;
var POINTER_CELL_SIZE = 1 / 4;
var AIR_TARGET = 1 / 32;
var SOLID2 = /* @__PURE__ */ new Set([YELLOW.splash, GREEN.splash, SILVER.splash]);

// src/elements/air.js
var AIR_SPLASH2 = GREY.splash;
ELEMENTS.set(AIR_SPLASH2, {
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

// src/elements/fire.js
ELEMENTS.set(RED.splash, {
  name: "Fire",
  key: ["f", "3"],
  update: (cell, world) => {
    if (oneIn(200)) {
      return world.replace([cell], [recolour(cell, GREY)]);
    }
    const movements = move(cell, world, randomFrom(["left", "right", "top"]), FALL_SPEED);
    if (movements.length > 0) {
      return world.replace(...movements);
    }
    return tryToSleep(cell, world, { filter: () => true });
  }
});

// src/elements/plant.js
ELEMENTS.set(GREEN.splash, {
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
      if (contact.colour.splash === BLUE.splash) {
        const recoloured = recolour(contact, GREEN);
        changed.push(...world.replace([contact], [recoloured]));
      }
    }
    return changed;
  }
});

// src/elements/sand.js
ELEMENTS.set(YELLOW.splash, {
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
      const slideDirection = randomFrom(["left", "right"]);
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

// src/elements/stone.js
ELEMENTS.set(SILVER.splash, {
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

// src/elements/water.js
ELEMENTS.set(BLUE.splash, {
  name: "Water",
  key: ["w", "2"],
  update: (cell, world) => {
    const movements = move(cell, world, "bottom", FALL_SPEED);
    if (movements.length > 0) {
      return world.replace(...movements);
    }
    const slideDirection = randomFrom(["left", "right"]);
    const slides = move(cell, world, slideDirection, FALL_SPEED, MIN_SIZE / 2);
    if (slides.length > 0) {
      return world.replace(...slides);
    }
    return tryToSleep(cell, world, { filter: () => true });
  }
});

// src/elements/acid.js
ELEMENTS.set(PURPLE.splash, {
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
      if (contact.colour.splash !== PURPLE.splash) {
        const recoloured = recolour(contact, GREY);
        changed.push(...world.replace([contact], [recoloured]));
      }
    }
    const movements = move(cell, world, "bottom", FALL_SPEED);
    if (movements.length > 0) {
      return world.replace(...movements);
    }
    const slideDirection = randomFrom(["left", "right"]);
    const slides = move(cell, world, slideDirection, FALL_SPEED, MIN_SIZE / 2);
    if (slides.length > 0) {
      return world.replace(...slides);
    }
    return tryToSleep(cell, world, { filter: () => true });
  }
});

// src/script.js
var shared2 = {
  clock: 0,
  brush: {
    colour: YELLOW
  }
};
var Cell2 = class {
  constructor(options = {}) {
    Object.assign(this, {
      bounds: {
        left: 0,
        right: 1,
        top: 0,
        bottom: 1
      },
      colour: BLACK,
      ...options
    });
    this.birth = shared2.clock;
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
    this.colour = VOID;
    this.draw(image);
    this.colour = colour;
  }
  draw(image) {
    const [x, y] = [this.position.x * image.width, this.position.y * image.height];
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
        const colour = isBorder ? VOID : fillColour;
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
  constructor({ colour = BLACK } = {}) {
    this.cells = /* @__PURE__ */ new Set();
    this.caches = {
      left: /* @__PURE__ */ new Map(),
      right: /* @__PURE__ */ new Map(),
      top: /* @__PURE__ */ new Map(),
      bottom: /* @__PURE__ */ new Map()
    };
    this.add(new Cell2({ colour }));
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
    for (const key in DIRECTION2) {
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
    for (const key in DIRECTION2) {
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
      newCell.birth = shared2.clock;
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
var DIRECTION2 = {
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
DIRECTION2.left.opposite = DIRECTION2.right;
DIRECTION2.right.opposite = DIRECTION2.left;
DIRECTION2.top.opposite = DIRECTION2.bottom;
DIRECTION2.bottom.opposite = DIRECTION2.top;
DIRECTION2.left.adjacent = DIRECTION2.top;
DIRECTION2.right.adjacent = DIRECTION2.bottom;
DIRECTION2.top.adjacent = DIRECTION2.right;
DIRECTION2.bottom.adjacent = DIRECTION2.left;
var AXIS2 = {
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
AXIS2.x.opposite = AXIS2.x;
AXIS2.y.opposite = AXIS2.y;
AXIS2.x.adjacent = AXIS2.y;
AXIS2.y.adjacent = AXIS2.x;
var global = {
  world: new World({ colour: GREY }),
  camera: new View(),
  image: void 0
};
var stage = new Stage({ speed: 2, paused: false });
stage.start = (context) => {
  const { canvas } = context;
  canvas.style["background-color"] = VOID;
};
stage.resize = (context) => {
  const { world, camera: camera2 } = global;
  const { canvas } = context;
  const size = Math.min(canvas.width, canvas.height);
  camera2.resize([size, size]);
  const image = context.createImageData(size, size);
  setImageAlpha(image, 255);
  global.image = image;
  world.draw(image);
  const [x, y] = camera2.get([0, 0]);
  context.putImageData(image, x, y);
};
stage.tick = (context) => {
  const { canvas } = context;
  const { image, camera: camera2 } = global;
  const [x, y] = camera2.get([0, 0]);
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.putImageData(image, x, y);
};
stage.update = (context) => {
  const { world, image, camera: camera2 } = global;
  shared2.clock = wrap(shared2.clock + 1, 0, 999);
  for (const cell of world.cells) {
    if (cell.birth === shared2.clock) {
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
  const pointer2 = getPointer();
  if (pointer2.down) {
    const colour = shared2.brush.colour;
    const cell = world.pick(camera2.cast(scale(pointer2.position, devicePixelRatio)));
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
Object.assign(window, shared2);

// src/index.ts
Habitat.registerEverything();
