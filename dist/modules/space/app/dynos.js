"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynosModule = void 0;
class DynosModule {
    constructor(herokuService) {
        this.herokuService = herokuService;
    }
    async checkCompatibility(app, allDynos) {
        try {
            const appDynos = await this.herokuService.getAppDynos(app.id);
            return appDynos
                .map((dyno) => {
                var _a;
                const matchingDyno = allDynos.find((d) => d.name === dyno.size);
                const bestSuggestion = (_a = allDynos
                    .filter((d) => d.generation.name === "fir" && d.memory >= ((matchingDyno === null || matchingDyno === void 0 ? void 0 : matchingDyno.memory) || 0))
                    .sort((a, b) => a.memory - b.memory)[0]) === null || _a === void 0 ? void 0 : _a.name;
                return {
                    name: dyno.size,
                    type: "Dyno",
                    severity: "Warning",
                    compatibility: false,
                    suggestions: `Fir Dyno: ${bestSuggestion}` || "No suitable Fir dyno available.",
                };
            });
        }
        catch (error) {
            return [
                {
                    name: "Dynos Check",
                    compatibility: false,
                    type: "Error",
                    severity: "Critical",
                    suggestions: `Error occurred: ${error.message}`,
                },
            ];
        }
    }
}
exports.DynosModule = DynosModule;
