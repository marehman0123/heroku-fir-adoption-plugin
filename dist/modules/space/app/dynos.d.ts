import { HerokuService } from '../../../services/heroku.service';
import { App } from '../../../types/heroku.types';
import { CompatibilityResult } from '../../../types/common.types';
export declare class DynosModule {
    private herokuService;
    constructor(herokuService: HerokuService);
    checkCompatibility(app: App, allDynos: any[]): Promise<CompatibilityResult[]>;
}
