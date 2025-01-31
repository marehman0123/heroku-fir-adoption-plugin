"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Processor = void 0;
const tslib_1 = require("tslib");
const space_1 = require("./modules/space");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const ora_1 = tslib_1.__importDefault(require("ora"));
class Processor {
    constructor(herokuService) {
        this.herokuService = herokuService;
        this.spaceModule = new space_1.SpaceModule(herokuService);
    }
    async process(spaceName, appName) {
        var _a;
        let spinner = (0, ora_1.default)(`Fetching details for space "${spaceName}"`).start();
        let spaceDetails;
        try {
            spaceDetails = await this.herokuService.getSpaceDetails(spaceName);
            spinner.succeed(`Fetched details for space "${spaceName}"`);
        }
        catch (error) {
            spinner.fail(`Failed to fetch details for space "${spaceName}"`);
            return;
        }
        if (((_a = spaceDetails.generation) === null || _a === void 0 ? void 0 : _a.name) !== 'cedar') {
            console.log(chalk_1.default.greenBright(`✅ The space "${chalk_1.default.bold(spaceDetails.name)}" is already compatible with Fir.`));
            return;
        }
        console.log(chalk_1.default.bold.blue(`\n🔎 Running compatibility checks for space: ${spaceName}`));
        spinner = (0, ora_1.default)().start(`Checking space compatibility...`);
        let results;
        try {
            results = await this.spaceModule.checkCompatibility(spaceDetails, appName);
            spinner.succeed(`Compatibility check completed for space "${spaceName}"`);
        }
        catch (error) {
            spinner.fail(`Failed to check compatibility: ${error}`);
            return;
        }
        this.displayResults(results);
    }
    displayResults(data) {
        console.log('\n' + chalk_1.default.bold.blue('=== Compatibility Report for: ') + chalk_1.default.bold.white(data.name) + ' ===\n');
        // Helper function to display status with color
        function displayStatus(compatibility) {
            if (compatibility instanceof Error) {
                return chalk_1.default.red('⚠ Error: ' + compatibility.message);
            }
            return compatibility
                ? chalk_1.default.green('✓ Compatible')
                : chalk_1.default.red('✗ Not Compatible');
        }
        // Helper function to display severity with color
        function displaySeverity(severity) {
            if (severity instanceof Error) {
                return chalk_1.default.red.bold('ERROR');
            }
            switch (String(severity).toLowerCase()) {
                case 'critical':
                    return chalk_1.default.red.bold(severity);
                case 'warning':
                    return chalk_1.default.yellow(severity);
                default:
                    return chalk_1.default.blue(severity);
            }
        }
        function displayComponentList(title, components) {
            console.log(chalk_1.default.bold.white(`${title}:`));
            if (!components || components.length === 0) {
                console.log(`  Status: ${displayStatus(true)}\n`);
                return;
            }
            components.forEach((component) => {
                console.log(`${chalk_1.default.gray('•')} ${component.name}`);
                console.log(`  Status: ${displayStatus(component.compatibility)}`);
                if (component.compatibility instanceof Error || !component.compatibility) {
                    console.log(`  Severity: ${displaySeverity(component.severity)}`);
                    if (component.suggestions) {
                        console.log(`  Suggestions: ${chalk_1.default.magenta(component.suggestions)}`);
                    }
                }
                console.log();
            });
        }
        ;
        const componentGroups = {
            'VPN Connections': data.vpn || [],
            'Shield Status': data.shield || [],
            'Trusted IPs': data.trustedIPs || [],
            'Outbound IPs': data.outboundIPs || [],
            'Topology': data.topology || []
        };
        Object.entries(componentGroups).forEach(([title, components]) => displayComponentList(title, components));
        if (data.apps && data.apps.length > 0) {
            console.log(chalk_1.default.bold.white('Applications:'));
            data.apps.forEach((app) => {
                console.log(chalk_1.default.cyan(`\n${app.name}`));
                // Group application subcategories
                const subcategories = {
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
exports.Processor = Processor;
