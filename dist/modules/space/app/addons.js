"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddonsModule = void 0;
class AddonsModule {
    constructor(herokuService) {
        this.herokuService = herokuService;
    }
    async checkCompatibility(app, allAddons) {
        try {
            const appAddons = await this.herokuService.getAppAddons(app.id);
            return appAddons
                .map((addon) => {
                var _a;
                const matchingAddon = allAddons.find((service) => service.id === addon.addon_service.id && service.name === addon.addon_service.name);
                const isCompatible = ((_a = matchingAddon === null || matchingAddon === void 0 ? void 0 : matchingAddon.supported_generations) === null || _a === void 0 ? void 0 : _a.some((gen) => gen.name === 'fir')) || false;
                return {
                    name: addon.name,
                    type: 'Addon',
                    severity: "Warning",
                    compatibility: isCompatible,
                    suggestions: isCompatible
                        ? ""
                        : `Addon "${addon.name}" is not compatible with Fir. Consider using a compatible alternative.`,
                };
            });
        }
        catch (error) {
            return [
                {
                    name: "Addon Check",
                    compatibility: false,
                    type: "Error",
                    severity: "Critical",
                    suggestions: `Error occurred: ${error.message}`,
                },
            ];
        }
    }
}
exports.AddonsModule = AddonsModule;
