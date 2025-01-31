import { HerokuService } from '../../services/heroku.service';
import { Space } from '../../types/heroku.types';
export declare class AppModule {
    private herokuService;
    private addonsModule;
    private dynosModule;
    private stacksModule;
    private buildsModule;
    constructor(herokuService: HerokuService);
    checkCompatibility(space: Space, appName?: string): Promise<any[]>;
    private getApps;
    private checkInternalRouting;
}
