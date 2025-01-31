"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildsModule = void 0;
class BuildsModule {
    constructor(herokuService) {
        this.herokuService = herokuService;
    }
    async checkCompatibility(app) {
        try {
            const builds = await this.herokuService.getBuilds(app.id);
            return builds
                .map((build) => {
                const { buildpacks, stack } = build;
                let isCompatible = false;
                let suggestion = "";
                let name = "Unknown Build";
                let severity = "Info";
                if (!buildpacks.length && stack === 'cnb') {
                    name = `CloudNative Buildpacks id : ${build.id} `;
                    isCompatible = true;
                }
                else if (buildpacks.length > 0 && stack !== 'cnb') {
                    name = `Classic Builtpacks id : ${build.id}`;
                    suggestion = "Redeploy the application in a Fir environment.";
                    severity = "Warning";
                }
                return {
                    name,
                    type: "Build",
                    severity: severity,
                    compatibility: isCompatible,
                    suggestions: suggestion,
                };
            });
        }
        catch (error) {
            return [
                {
                    name: "Build Check",
                    compatibility: false,
                    type: "Error",
                    severity: "Critical",
                    suggestions: `Error occurred: ${error.message}`,
                },
            ];
        }
    }
}
exports.BuildsModule = BuildsModule;
