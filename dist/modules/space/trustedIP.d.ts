import { HerokuService } from "../../services/heroku.service";
import { CompatibilityResult } from '../../types/common.types';
import { Space } from "../../types/heroku.types";
export declare class TrustedIPModule {
    private herokuService;
    constructor(herokuService: HerokuService);
    checkCompatibility(space: Space): CompatibilityResult[];
    private parseTrustedIpRanges;
}
