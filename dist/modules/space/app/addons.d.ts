import { HerokuService } from "../../../services/heroku.service";
import { CompatibilityResult } from "../../../types/common.types";
import { App, AddonService } from "../../../types/heroku.types";
export declare class AddonsModule {
    private herokuService;
    constructor(herokuService: HerokuService);
    checkCompatibility(app: App, allAddons: AddonService[]): Promise<CompatibilityResult[]>;
}
