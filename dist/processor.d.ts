import { HerokuService } from './services/heroku.service';
export declare class Processor {
    private herokuService;
    private spaceModule;
    constructor(herokuService: HerokuService);
    process(spaceName: string, appName?: string): Promise<void>;
    private displayResults;
}
