"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StacksModule = void 0;
class StacksModule {
    constructor(herokuService) {
        this.herokuService = herokuService;
    }
    async checkCompatibility(app) {
        var _a;
        try {
            const stackName = ((_a = app.build_stack) === null || _a === void 0 ? void 0 : _a.name) || 'unknown';
            const availableStacks = await this.herokuService.getAvailableStacks(app.id);
            let isCompatible = false;
            let suggestion = "";
            let severity = "Info";
            if (stackName === 'container') {
                suggestion = 'Docker Containers are not supported in Fir';
                severity = "Critical";
            }
            else if (stackName === 'heroku-24') {
                isCompatible = true;
            }
            else if (availableStacks.some((stack) => stack.name === 'heroku-24')) {
                suggestion = 'Upgrade to heroku-24 or latest and redeploy app';
                severity = "Warning";
            }
            return isCompatible
                ? []
                : [
                    {
                        name: stackName,
                        type: "Stack",
                        severity: severity,
                        compatibility: false,
                        suggestions: suggestion,
                    },
                ];
        }
        catch (error) {
            return [
                {
                    name: "Stacks Check",
                    compatibility: false,
                    type: "Error",
                    severity: "Critical",
                    suggestions: `Error occurred: ${error.message}`,
                },
            ];
        }
    }
}
exports.StacksModule = StacksModule;
