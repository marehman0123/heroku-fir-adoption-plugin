"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeeringModule = void 0;
class PeeringModule {
    constructor(herokuService) {
        this.herokuService = herokuService;
    }
    async checkCompatibility(space) {
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
        }
        catch (error) {
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
exports.PeeringModule = PeeringModule;
