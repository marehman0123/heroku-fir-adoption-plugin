import { HerokuService } from "../../services/heroku.service";
import { CompatibilityResult } from '../../types/common.types';
import { Space } from "../../types/heroku.types";

export class OutboundIPModule {
    constructor(private herokuService: HerokuService) { }
    async checkCompatibility(space: Space): Promise<CompatibilityResult[]> {
        try {
            const outboundIPs = await this.herokuService.getSpaceOutboundIps(space.id);
            const isCompatible = outboundIPs.sources.some((source) => source.includes(':'));
            return [{
                name: 'NAT Configuration',
                type: 'Outbound IPs',
                severity: "Warning",
                compatibility: isCompatible,
                suggestions: !isCompatible ? 'The NAT configuration only includes IPv4, Ensure that IPv6 CIDR ranges are also included for compatibility' : ''
            }]
        } catch (error: any) {
            return [{
                name: "Outbound IPs Check",
                compatibility: false,
                type: "Error",
                severity: "Critical",
                suggestions: `Error occurred: ${error.message}`,
            }]
        }


    }
}