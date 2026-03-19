ELEMENTS.set(SILVER.splash, {
    name: "Stone",
    key: ["t", "4"],
    update: function (cell, world) {
        var movements = move(cell, world, "bottom", FALL_SPEED);
        if (movements.length > 0) {
            return world.replace.apply(world, movements);
        }
        return tryToSleep(cell, world);
    },
});
//# sourceMappingURL=stone.js.map