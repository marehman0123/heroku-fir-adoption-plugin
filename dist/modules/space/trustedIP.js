"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrustedIPModule = void 0;
class TrustedIPModule {
    constructor(herokuService) {
        this.herokuService = herokuService;
    }
    checkCompatibility(space) {
        const defaultTrustedIP = '0.0.0.0/0';
        try {
            const trustedIPs = this.herokuService.getSpaceTrustedIps(space.name);
            const trustedRanges = this.parseTrustedIpRanges(trustedIPs);
            const isCompatible = trustedRanges.length === 0 || (trustedRanges.length === 1 && trustedRanges[0] === defaultTrustedIP);
            return [{
                    name: "Trusted IPs",
                    compatibility: isCompatible,
                    type: "`Trusted IPs",
                    severity: "Critical",
                    suggestions: !isCompatible
                        ? `Remove trusted ips ${trustedRanges.filter((range) => !range.includes(defaultTrustedIP))}`
                        : ''
                }];
        }
        catch (error) {
            console.error(`Error fetching VPN connections for space ${space.id}:`, error);
            return [{
                    name: 'Trusted IPs Check',
                    type: 'Error',
                    compatibility: false,
                    suggestions: `Error occurred: ${error.message}`
                }];
        }
    }
    parseTrustedIpRanges(trustedIps) {
        return trustedIps
            .split('\n')
            .filter((line) => line && !line.includes('==='));
    }
}
exports.TrustedIPModule = TrustedIPModule;
