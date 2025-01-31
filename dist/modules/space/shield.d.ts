import { Space } from '../../types/heroku.types';
import { CompatibilityResult } from '../../types/common.types';
export declare class ShieldModule {
    constructor();
    checkCompatibility(space: Space): CompatibilityResult[];
}
