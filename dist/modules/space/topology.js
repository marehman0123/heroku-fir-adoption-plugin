"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopologyModule = void 0;
class TopologyModule {
    constructor(herokuService) {
        this.herokuService = herokuService;
    }
    async checkCompatibility(space) {
        var _a;
        try {
            const topology = await this.herokuService.getSpaceTopology(space.id);
            return (((_a = topology.apps) === null || _a === void 0 ? void 0 : _a.map(app => {
                var _a;
                const isIncompatible = (_a = app.formations) === null || _a === void 0 ? void 0 : _a.some(formation => { var _a; return (_a = formation.dynos) === null || _a === void 0 ? void 0 : _a.some(dyno => dyno.hostname.endsWith("localspace")); });
                return {
                    name: `Topology for App: ${app.id}`,
                    compatibility: !isIncompatible,
                    type: "Topology",
                    severity: "Warning",
                    suggestions: isIncompatible
                        ? `Disable spaces-dns-discovery and restart your app`
                        : ''
                };
            })) || []);
        }
        catch (error) {
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
exports.TopologyModule = TopologyModule;
