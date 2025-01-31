"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutboundIPModule = void 0;
class OutboundIPModule {
    constructor(herokuService) {
        this.herokuService = herokuService;
    }
    async checkCompatibility(space) {
        try {
            const outboundIPs = await this.herokuService.getSpaceOutboundIps(space.id);
            const isCompatible = outboundIPs.sources.some((source) => source.includes(':'));
            return [{
                    name: 'NAT Configuration',
                    type: 'Outbound IPs',
                    severity: "Warning",
                    compatibility: isCompatible,
                    suggestions: !isCompatible ? 'The NAT configuration only includes IPv4, Ensure that IPv6 CIDR ranges are also included for compatibility' : ''
                }];
        }
        catch (error) {
            return [{
                    name: "Outbound IPs Check",
                    compatibility: false,
                    type: "Error",
                    severity: "Critical",
                    suggestions: `Error occurred: ${error.message}`,
                }];
        }
    }
}
exports.OutboundIPModule = OutboundIPModule;
