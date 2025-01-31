import { HerokuService } from './services/heroku.service';
import { SpaceModule } from './modules/space';
import chalk from 'chalk';
import ora from 'ora';

export class Processor {
    private spaceModule: SpaceModule;

    constructor(private herokuService: HerokuService) {
        this.spaceModule = new SpaceModule(herokuService);
    }

    async process(spaceName: string, appName?: string) {
        let spinner = ora(`Fetching details for space "${spaceName}"`).start();
        let spaceDetails;
        try {
            spaceDetails = await this.herokuService.getSpaceDetails(spaceName);
            spinner.succeed(`Fetched details for space "${spaceName}"`);
        } catch (error: any) {
            spinner.fail(`Failed to fetch details for space "${spaceName}"`);
            return;
        }

        if (spaceDetails.generation?.name !== 'cedar') {
            console.log(chalk.greenBright(`✅ The space "${chalk.bold(spaceDetails.name)}" is already compatible with Fir.`));
            return;
        }
        console.log(chalk.bold.blue(`\n🔎 Running compatibility checks for space: ${spaceName}`));
        spinner = ora().start(`Checking space compatibility...`);
        let results;
        try {
            results = await this.spaceModule.checkCompatibility(spaceDetails, appName);
            spinner.succeed(`Compatibility check completed for space "${spaceName}"`);
        } catch (error: any) {
            spinner.fail(`Failed to check compatibility: ${error}`);
            return;
        }

        this.displayResults(results);
    }

    private displayResults(data: any) {
        console.log('\n' + chalk.bold.blue('=== Compatibility Report for: ') + chalk.bold.white(data.name) + ' ===\n');

        // Helper function to display status with color
        function displayStatus(compatibility: any) {
            if (compatibility instanceof Error) {
                return chalk.red('⚠ Error: ' + compatibility.message);
            }
            return compatibility
                ? chalk.green('✓ Compatible')
                : chalk.red('✗ Not Compatible');
        }

        // Helper function to display severity with color
        function displaySeverity(severity: any) {
            if (severity instanceof Error) {
                return chalk.red.bold('ERROR');
            }
            switch (String(severity).toLowerCase()) {
                case 'critical':
                    return chalk.red.bold(severity);
                case 'warning':
                    return chalk.yellow(severity);
                default:
                    return chalk.blue(severity);
            }
        }

        function displayComponentList(title: string, components: any[]) {
            console.log(chalk.bold.white(`${title}:`));
            if (!components || components.length === 0) {
                console.log(`  Status: ${displayStatus(true)}\n`);
                return;
            }

            components.forEach((component: any) => {
                console.log(`${chalk.gray('•')} ${component.name}`);
                console.log(`  Status: ${displayStatus(component.compatibility)}`);
                if (component.compatibility instanceof Error || !component.compatibility) {
                    console.log(`  Severity: ${displaySeverity(component.severity)}`);
                    if (component.suggestions) {
                        console.log(`  Suggestions: ${chalk.magenta(component.suggestions)}`);
                    }
                }
                console.log();
            });
        };

        const componentGroups: Record<string, any[]> = {
            'VPN Connections': data.vpn || [],
            'Shield Status': data.shield || [],
            'Trusted IPs': data.trustedIPs || [],
            'Outbound IPs': data.outboundIPs || [],
            'Topology': data.topology || []
        };

        Object.entries(componentGroups).forEach(([title, components]) => displayComponentList(title, components));

        if (data.apps && data.apps.length > 0) {
            console.log(chalk.bold.white('Applications:'));
            data.apps.forEach((app: any) => {
                console.log(chalk.cyan(`\n${app.name}`));

                // Group application subcategories
                const subcategories: Record<string, any[]> = {
                    'Addons': app.addons || [],
                    'Dynos': app.dynos || [],
                    'Stack': app.stack || [],
                    'Builds': app.builds || [],
                    'Internal Routing': app.internalRouting || [],
                };

                // Display application subcategories
                Object.entries(subcategories).forEach(([subTitle, subComponents]) => displayComponentList(`  ${subTitle}`, subComponents));
            });
        }
    }
}
