import { HerokuService } from "../../services/heroku.service";
import { CompatibilityResult } from '../../types/common.types';
import { Space } from "../../types/heroku.types";
export class PeeringModule {
    constructor(private herokuService: HerokuService) { }
    async checkCompatibility(space: Space): Promise<CompatibilityResult[]> {
        try {
            const peerings = await this.herokuService.getSpacePeerings(space.id);
            const isCompatible = peerings.length === 0;
            return isCompatible
                ? []
                : [
                    {
                        name: "Peering",
                        type: "IPv4 Peering",
                        severity: "Warning",
                        compatibility: false,
                        suggestions: "Remove existing peerings to ensure compatibility.",
                    },
                ];
        } catch (error: any){
            return [
                {
                    name: "Peering Check",
                    compatibility: false,
                    type: "Error",
                    severity: "Critical",
                    suggestions: `Error occurred: ${error.message}`,
                },
            ];
        }
        
    }

}