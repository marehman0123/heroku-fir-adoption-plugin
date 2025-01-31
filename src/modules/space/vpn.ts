import { Space } from '../../types/heroku.types';
import { HerokuService } from '../../services/heroku.service';
import { CompatibilityResult } from '../../types/common.types';

export class VpnModule {
    constructor(private herokuService: HerokuService) { }
    async checkCompatibility(space: Space): Promise<CompatibilityResult[]> {
        try {
            const vpnConnections = await this.herokuService.getVPNConnections(space.id);
            return vpnConnections
                .map(vpn => {
                    return {
                        name: `${vpn.name} `,
                        type: 'VPN Connection',
                        severity : "Critical",
                        compatibility: false,
                        suggestions: 'Remove VPN Connection'
                    };
                });
        } catch (error: any) {
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
