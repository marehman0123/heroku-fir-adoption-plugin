import { HerokuService } from '../services/heroku.service';
import { AppModule } from './space/app';
import { VpnModule } from './space/vpn';
import { ShieldModule } from './space/shield';
import { TopologyModule } from './space/topology';
import { PeeringModule } from './space/peering';
import { TrustedIPModule } from './space/trustedIP';
import { OutboundIPModule } from './space/outboundIP';
import { Space } from '../types/heroku.types';

export class SpaceModule {
    private vpnModule: VpnModule;
    private shieldModule: ShieldModule;
    private topologyModule: TopologyModule;
    private peeringModule: PeeringModule;
    private trustedIPModule: TrustedIPModule;
    private outboundIPModule: OutboundIPModule
    private appModule: AppModule;

    constructor(private herokuService: HerokuService) {
        this.vpnModule = new VpnModule(this.herokuService);
        this.shieldModule = new ShieldModule();
        this.topologyModule = new TopologyModule(this.herokuService);
        this.peeringModule = new PeeringModule(this.herokuService);
        this.trustedIPModule = new TrustedIPModule(this.herokuService);
        this.outboundIPModule = new OutboundIPModule(this.herokuService);
        this.appModule = new AppModule(this.herokuService);
    }

    async checkCompatibility(space: Space, appName?: string): Promise<any> {

        const [vpnResults, topologyResults, peeringResults, outboundIPResults, appResults] = await Promise.all([
            this.vpnModule.checkCompatibility(space),
            this.topologyModule.checkCompatibility(space),
            this.peeringModule.checkCompatibility(space),
            this.outboundIPModule.checkCompatibility(space),
            this.appModule.checkCompatibility(space, appName),
        ]);

        return {
            name: space.name,
            vpn: vpnResults,
            shield: this.shieldModule.checkCompatibility(space),
            topology: topologyResults,
            peering: peeringResults,
            trustedIPs: this.trustedIPModule.checkCompatibility(space),
            outboundIPs: outboundIPResults,
            apps: appResults,
        }
    }
}
