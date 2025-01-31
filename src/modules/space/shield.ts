import { Space } from '../../types/heroku.types';
import { CompatibilityResult } from '../../types/common.types'

export class ShieldModule {
    constructor() { }
    checkCompatibility(space: Space): CompatibilityResult[] {
        const shieldStatus = space.shield;
            return [{
                name: 'Shield',
                type: 'Shield',
                severity: "Critical",
                compatibility: shieldStatus ? false : true,
                suggestions: shieldStatus ? 'Disable Shield' : ""
            }]
    }
}