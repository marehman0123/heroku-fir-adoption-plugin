import { HerokuService } from '../../services/heroku.service';
import { AddonsModule } from './app/addons';
import { DynosModule } from './app/dynos';
import { StacksModule } from './app/stacks';
import { BuildsModule } from './app/builds';
import { Space, App } from '../../types/heroku.types';
import { CompatibilityResult } from '../../types/common.types';

export class AppModule {
    private addonsModule: AddonsModule;
    private dynosModule: DynosModule;
    private stacksModule: StacksModule
    private buildsModule: BuildsModule;

    constructor(private herokuService: HerokuService) {
        this.addonsModule = new AddonsModule(herokuService);
        this.dynosModule = new DynosModule(herokuService);
        this.stacksModule = new StacksModule(herokuService);
        this.buildsModule = new BuildsModule(herokuService);
    }

    async checkCompatibility(space: Space, appName?: string): Promise<any[]> {
        const apps = await this.getApps(space, appName);
        if(apps.length === 0)
            return apps;
        
        const allAddon = await this.herokuService.getAllAddons();
        const allDynos = await this.herokuService.getAllDynoSizes();
        return Promise.all(
            apps.map(async (app) => {
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
            })
        );
    }

    private async getApps(space: Space, appName?: string) {
        return await this.herokuService.getAppsBySpace(space, appName);
    }
    private checkInternalRouting(app: App): CompatibilityResult[] {
        return[ {
            name: "App Internal Routing",
            compatibility: app.internal_routing === null ? true : false,
            type: "App Internal Routing",
            severity: "Critical",
            suggestions: "Remove Internal Routing"
        }]
    }
}
