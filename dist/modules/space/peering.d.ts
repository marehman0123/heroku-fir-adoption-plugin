import { HerokuService } from "../../services/heroku.service";
import { CompatibilityResult } from '../../types/common.types';
import { Space } from "../../types/heroku.types";
export declare class PeeringModule {
    private herokuService;
    constructor(herokuService: HerokuService);
    checkCompatibility(space: Space): Promise<CompatibilityResult[]>;
}
