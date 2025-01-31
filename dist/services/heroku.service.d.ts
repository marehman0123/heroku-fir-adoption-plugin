import { Space, VpnConnection, App, Addon, AddonService, Topology, OutboundIPs, Build } from '../types/heroku.types';
export declare class HerokuService {
    private apiKey;
    constructor(apiKey: string);
    getSpaceDetails(spaceName: string): Promise<Space>;
    getVPNConnections(spaceId: string): Promise<VpnConnection[]>;
    getSpaceTopology(spaceId: string): Promise<Topology>;
    getSpacePeerings(spaceId: string): Promise<any>;
    getSpaceOutboundIps(spaceId: string): Promise<OutboundIPs>;
    getApps(): Promise<App[]>;
    getAppsBySpace(space: Space, appName?: string): Promise<App[]>;
    getAppAddons(appId: string): Promise<Addon[]>;
    getAllAddons(): Promise<AddonService[]>;
    getAvailableStacks(appId: string): Promise<any[]>;
    getBuilds(appId: string): Promise<Build[]>;
    getAllDynoSizes(): Promise<any[]>;
    getAppDynos(appId: string): Promise<any[]>;
    getSpaceTrustedIps(spaceName: string): any;
    private makeRequest;
}
