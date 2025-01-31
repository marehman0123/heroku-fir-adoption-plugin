import { Space } from '../../types/heroku.types';
import { HerokuService } from '../../services/heroku.service';
import { CompatibilityResult } from '../../types/common.types';
export declare class VpnModule {
    private herokuService;
    constructor(herokuService: HerokuService);
    checkCompatibility(space: Space): Promise<CompatibilityResult[]>;
}
