"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceModule = void 0;
const app_1 = require("./space/app");
const vpn_1 = require("./space/vpn");
const shield_1 = require("./space/shield");
const topology_1 = require("./space/topology");
const peering_1 = require("./space/peering");
const trustedIP_1 = require("./space/trustedIP");
const outboundIP_1 = require("./space/outboundIP");
class SpaceModule {
    constructor(herokuService) {
        this.herokuService = herokuService;
        this.vpnModule = new vpn_1.VpnModule(this.herokuService);
        this.shieldModule = new shield_1.ShieldModule();
        this.topologyModule = new topology_1.TopologyModule(this.herokuService);
        this.peeringModule = new peering_1.PeeringModule(this.herokuService);
        this.trustedIPModule = new trustedIP_1.TrustedIPModule(this.herokuService);
        this.outboundIPModule = new outboundIP_1.OutboundIPModule(this.herokuService);
        this.appModule = new app_1.AppModule(this.herokuService);
    }
    async checkCompatibility(space, appName) {
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
        };
    }
}
exports.SpaceModule = SpaceModule;
