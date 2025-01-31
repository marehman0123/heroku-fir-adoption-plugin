import { HerokuService } from "../../../services/heroku.service";
import { CompatibilityResult } from "../../../types/common.types";
import { App } from "../../../types/heroku.types";
export declare class BuildsModule {
    private herokuService;
    constructor(herokuService: HerokuService);
    checkCompatibility(app: App): Promise<CompatibilityResult[]>;
}
