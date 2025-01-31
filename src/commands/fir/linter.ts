import { Command, Flags } from '@oclif/core'
import { checkHerokuApiKey } from '../../utils/auth';
import { HerokuService } from '../../services/heroku.service';
import { Processor } from '../../processor';

export default class FirLinter extends Command {
  static description = 'Run the linter for the Fir project';
  static flags = {
    space: Flags.string({
      char: 's',
      description: 'The name of the Heroku Private Space (required)',
      required: true,
    }),
    app: Flags.string({
      char: 'a',
      description: 'The name of the Heroku app (optional)',
      required: false,
    }),
  };

  async run(): Promise<void> {
    // Check Heroku API key and handle login if necessary
    const isAuthenticated = await checkHerokuApiKey();
    if (!isAuthenticated) {
      this.error('Authentication failed. Please log in to Heroku and try again.');
      return;
    }

    const { flags } = await this.parse(FirLinter);
    const { space, app } = flags;
    const herokuApiKey = process.env.HEROKU_API_KEY || "";

    const herokuService = new HerokuService(herokuApiKey);
    const linterProcessor = new Processor(herokuService);


    this.log(`Running linter for space: ${space}, app: ${app || 'all apps'}`);
    // Placeholder logic for now
    // this.log('Linter logic will go here.');

    try {
      await linterProcessor.process(space, app);
    } catch (error: any) {
      this.error(error.message);
    }
  }
}


