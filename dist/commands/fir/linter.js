"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const auth_1 = require("../../utils/auth");
const heroku_service_1 = require("../../services/heroku.service");
const processor_1 = require("../../processor");
class FirLinter extends core_1.Command {
    async run() {
        // Check Heroku API key and handle login if necessary
        const isAuthenticated = await (0, auth_1.checkHerokuApiKey)();
        if (!isAuthenticated) {
            this.error('Authentication failed. Please log in to Heroku and try again.');
            return;
        }
        const { flags } = await this.parse(FirLinter);
        const { space, app } = flags;
        const herokuApiKey = process.env.HEROKU_API_KEY || "";
        const herokuService = new heroku_service_1.HerokuService(herokuApiKey);
        const linterProcessor = new processor_1.Processor(herokuService);
        this.log(`Running linter for space: ${space}, app: ${app || 'all apps'}`);
        // Placeholder logic for now
        // this.log('Linter logic will go here.');
        try {
            await linterProcessor.process(space, app);
        }
        catch (error) {
            this.error(error.message);
        }
    }
}
FirLinter.description = 'Run the linter for the Fir project';
FirLinter.flags = {
    space: core_1.Flags.string({
        char: 's',
        description: 'The name of the Heroku Private Space (required)',
        required: true,
    }),
    app: core_1.Flags.string({
        char: 'a',
        description: 'The name of the Heroku app (optional)',
        required: false,
    }),
};
exports.default = FirLinter;
// import { Command, Flags } from '@oclif/core'
// import { checkHerokuApiKey } from '../../utils/auth';
// import { HerokuService } from '../../services/heroku.service';
// import { LinterProcessor } from '../../utils/linterProcessor';
// export default class FirLinter extends Command {
//   static description = 'Run the linter for the Fir project';
//   static flags = {
//     space: Flags.string({
//       char: 's',
//       description: 'The name of the Heroku Private Space (required)',
//       required: true,
//     }),
//     app: Flags.string({
//       char: 'a',
//       description: 'The name of the Heroku app (optional)',
//       required: false,
//     }),
//   };
//   async run(): Promise<void> {
//     // Check Heroku API key and handle login if necessary
//     const isAuthenticated = await checkHerokuApiKey();
//     if (!isAuthenticated) {
//       this.error('Authentication failed. Please log in to Heroku and try again.');
//       return;
//     }
//     const { flags } = await this.parse(FirLinter);
//     const { space, app } = flags;
//     const herokuApiKey = process.env.HEROKU_API_KEY || "";
//     const herokuService = new HerokuService(herokuApiKey);
//     const linterProcessor = new LinterProcessor(herokuService);
//     this.log(`Running linter for space: ${space}, app: ${app || 'all apps'}`);
//     // Placeholder logic for now
//     // this.log('Linter logic will go here.');
//     try {
//       await linterProcessor.process(space, app);
//     } catch (error: any) {
//       this.error(error.message);
//     }
//   }
// }
