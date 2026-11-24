# SandLab Revamp

A falling-sand toy where the world is made of rectangles that split and merge, instead of one cell per pixel.

## Running it

```sh
npm install
npm run dev     # rebuilds dist/index.js whenever src changes
```

Then open `index.html` in a browser.

Other scripts:

- `npm run build`: one-off build
- `npm run typecheck`: check types with `tsc`
- `npm run format`: format `src` with Prettier

## Controls

Click and drag to draw. Space pauses.

| Key       | Element |
| --------- | ------- |
| `0`       | Air     |
| `s` / `1` | Sand    |
| `w` / `2` | Water   |
| `f` / `3` | Fire    |
| `t` / `4` | Stone   |
| `p` / `5` | Plant   |
| `a` / `6` | Acid    |

## Layout

- `src/core/`: `Cell`, `World` and edge/axis directions
- `src/elements/`: one file per element, each registers itself in `ELEMENTS`
- `src/sugar.ts`: helpers for moving, splitting and merging cells
- `src/game.ts`: game loop, drawing and pointer input
- `src/libraries/`: small standalone utilities (colours, vectors, canvas stage, input)

## Goals

- Move away from the Habitat embed toward something minimal
