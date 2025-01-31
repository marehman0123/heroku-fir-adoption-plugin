import { HerokuService } from "../../services/heroku.service";
import { CompatibilityResult } from '../../types/common.types';
import { Space } from "../../types/heroku.types";

export class TopologyModule {
    constructor(private herokuService: HerokuService) { }
    async checkCompatibility(space: Space): Promise<CompatibilityResult[]> {
        try {
            const topology = await this.herokuService.getSpaceTopology(space.id);
            return (
                topology.apps?.map(app => {
                    const isIncompatible = app.formations?.some(formation =>
                        formation.dynos?.some(dyno => dyno.hostname.endsWith("localspace"))
                    );

                    return {
                        name: `Topology for App: ${app.id}`,
                        compatibility: !isIncompatible,
                        type: "Topology",
                        severity: "Warning",
                        suggestions: isIncompatible
                            ? `Disable spaces-dns-discovery and restart your app`
                            : ''
                    };
                }) || []
            );
        } catch (error: any) {
            console.error(`Error fetching topology for space ${space.id}:`, error.message);

            return [
                {
                    name: "Topology Check",
                    compatibility: false,
                    type: "Error",
                    severity: "Critical",
                    suggestions: `Error occurred: ${error.message}`,
                },
            ];
        }

    }
}