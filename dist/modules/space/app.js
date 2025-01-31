"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const addons_1 = require("./app/addons");
const dynos_1 = require("./app/dynos");
const stacks_1 = require("./app/stacks");
const builds_1 = require("./app/builds");
class AppModule {
    constructor(herokuService) {
        this.herokuService = herokuService;
        this.addonsModule = new addons_1.AddonsModule(herokuService);
        this.dynosModule = new dynos_1.DynosModule(herokuService);
        this.stacksModule = new stacks_1.StacksModule(herokuService);
        this.buildsModule = new builds_1.BuildsModule(herokuService);
    }
    async checkCompatibility(space, appName) {
        const apps = await this.getApps(space, appName);
        if (apps.length === 0)
            return apps;
        const allAddon = await this.herokuService.getAllAddons();
        const allDynos = await this.herokuService.getAllDynoSizes();
        return Promise.all(apps.map(async (app) => {
            const internalRouting = this.checkInternalRouting(app);
            const addons = await this.addonsModule.checkCompatibility(app, allAddon);
            const dynos = await this.dynosModule.checkCompatibility(app, allDynos);
            const stack = await this.stacksModule.checkCompatibility(app);
            const builds = await this.buildsModule.checkCompatibility(app);
            return {
                name: app.name,
                addons,
                dynos,
                stack,
                builds,
                internalRouting
            };
        }));
    }
    async getApps(space, appName) {
        return await this.herokuService.getAppsBySpace(space, appName);
    }
    checkInternalRouting(app) {
        return [{
                name: "App Internal Routing",
                compatibility: app.internal_routing === null ? true : false,
                type: "App Internal Routing",
                severity: "Critical",
                suggestions: "Remove Internal Routing"
            }];
    }
}
exports.AppModule = AppModule;
