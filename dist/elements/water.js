ELEMENTS.set(BLUE.splash, {
    name: "Water",
    key: ["w", "2"],
    update: function (cell, world) {
        var movements = move(cell, world, "bottom", FALL_SPEED);
        if (movements.length > 0) {
            return world.replace.apply(world, movements);
        }
        var slideDirection = randomFrom(["left", "right"]);
        var slides = move(cell, world, slideDirection, FALL_SPEED, MIN_SIZE / 2);
        if (slides.length > 0) {
            return world.replace.apply(world, slides);
        }
        return tryToSleep(cell, world, { filter: function () { return true; } });
    },
});
//# sourceMappingURL=water.js.map