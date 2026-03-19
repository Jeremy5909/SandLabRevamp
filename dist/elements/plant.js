var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
ELEMENTS.set(GREEN.splash, {
    name: "Plant",
    key: ["p", "5"],
    update: function (cell, world) {
        var allContacts = __spreadArray(__spreadArray(__spreadArray(__spreadArray([], pickContacts(cell, world, "top"), true), pickContacts(cell, world, "bottom"), true), pickContacts(cell, world, "left"), true), pickContacts(cell, world, "right"), true);
        var changed = [];
        for (var _i = 0, allContacts_1 = allContacts; _i < allContacts_1.length; _i++) {
            var contact = allContacts_1[_i];
            if (contact.colour.splash === BLUE.splash) {
                var recoloured = recolour(contact, GREEN);
                changed.push.apply(changed, world.replace([contact], [recoloured]));
            }
        }
        return changed;
    },
});
//# sourceMappingURL=plant.js.map