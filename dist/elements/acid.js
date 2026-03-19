var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
ELEMENTS.set(PURPLE.splash, {
    name: "Acid",
    key: ["a", "6"],
    update: function (cell, world) {
        var allContacts = __spreadArray(__spreadArray(__spreadArray(__spreadArray([], pickContacts(cell, world, "top"), true), pickContacts(cell, world, "bottom"), true), pickContacts(cell, world, "left"), true), pickContacts(cell, world, "right"), true);
        var changed = [];
        for (var _i = 0, allContacts_1 = allContacts; _i < allContacts_1.length; _i++) {
            var contact = allContacts_1[_i];
            if (contact.colour.splash !== PURPLE.splash) {
                var recoloured = recolour(contact, GREY);
                changed.push.apply(changed, world.replace([contact], [recoloured]));
            }
        }
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
//# sourceMappingURL=acid.js.map