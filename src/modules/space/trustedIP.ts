import { HerokuService } from "../../services/heroku.service";
import { CompatibilityResult } from '../../types/common.types';
import { Space } from "../../types/heroku.types";

export class TrustedIPModule {
    constructor(private herokuService: HerokuService) { }
    checkCompatibility(space: Space): CompatibilityResult[] {
        const defaultTrustedIP: string = '0.0.0.0/0';
        try {
            const trustedIPs = this.herokuService.getSpaceTrustedIps(space.name);

            const trustedRanges = this.parseTrustedIpRanges(trustedIPs);
    
            const isCompatible = trustedRanges.length === 0 || (trustedRanges.length === 1 && trustedRanges[0] === defaultTrustedIP);
    
            return[{
                name: "Trusted IPs",
                compatibility: isCompatible,
                type: "`Trusted IPs",
                severity: "Critical",
                suggestions: !isCompatible
                    ? `Remove trusted ips ${trustedRanges.filter((range: string) => !range.includes(defaultTrustedIP))}`
                    : ''
            }];
        } catch (error: any){
            console.error(`Error fetching VPN connections for space ${space.id}:`, error);
            return [{
                name: 'Trusted IPs Check',
                type: 'Error',
                compatibility: false,
                suggestions: `Error occurred: ${error.message}`
            }];
        }
        
    }

    private parseTrustedIpRanges(trustedIps: string): string[] {
        return trustedIps
            .split('\n')
            .filter((line: string) => line && !line.includes('==='));
    }
}