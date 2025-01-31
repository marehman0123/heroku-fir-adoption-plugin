"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShieldModule = void 0;
class ShieldModule {
    constructor() { }
    checkCompatibility(space) {
        const shieldStatus = space.shield;
        return [{
                name: 'Shield',
                type: 'Shield',
                severity: "Critical",
                compatibility: shieldStatus ? false : true,
                suggestions: shieldStatus ? 'Disable Shield' : ""
            }];
    }
}
exports.ShieldModule = ShieldModule;
