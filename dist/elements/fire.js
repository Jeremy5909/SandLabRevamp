ELEMENTS.set(RED.splash, {
    name: "Fire",
    key: ["f", "3"],
    update: function (cell, world) {
        // Decay
        if (oneIn(200)) {
            return world.replace([cell], [recolour(cell, GREY)]);
        }
        var movements = move(cell, world, randomFrom(["left", "right", "top"]), FALL_SPEED);
        if (movements.length > 0) {
            return world.replace.apply(world, movements);
        }
        return tryToSleep(cell, world, { filter: function () { return true; } });
    },
});
//# sourceMappingURL=fire.js.map