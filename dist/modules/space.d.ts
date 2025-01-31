import { HerokuService } from '../services/heroku.service';
import { Space } from '../types/heroku.types';
export declare class SpaceModule {
    private herokuService;
    private vpnModule;
    private shieldModule;
    private topologyModule;
    private peeringModule;
    private trustedIPModule;
    private outboundIPModule;
    private appModule;
    constructor(herokuService: HerokuService);
    checkCompatibility(space: Space, appName?: string): Promise<any>;
}
