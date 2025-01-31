"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VpnModule = void 0;
class VpnModule {
    constructor(herokuService) {
        this.herokuService = herokuService;
    }
    async checkCompatibility(space) {
        try {
            const vpnConnections = await this.herokuService.getVPNConnections(space.id);
            return vpnConnections
                .map(vpn => {
                return {
                    name: `${vpn.name} `,
                    type: 'VPN Connection',
                    severity: "Critical",
                    compatibility: false,
                    suggestions: 'Remove VPN Connection'
                };
            });
        }
        catch (error) {
            console.error(`Error fetching VPN connections for space ${space.id}:`, error);
            return [{
                    name: 'VPN Connection Check',
                    type: 'Error',
                    compatibility: false,
                    suggestions: `Error occurred: ${error.message}`
                }];
        }
    }
}
exports.VpnModule = VpnModule;
