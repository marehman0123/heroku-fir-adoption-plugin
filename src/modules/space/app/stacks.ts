import { HerokuService } from "../../../services/heroku.service";
import { CompatibilityResult } from "../../../types/common.types";
import { App } from "../../../types/heroku.types";

export class StacksModule {
    constructor(private herokuService: HerokuService) { }

    async checkCompatibility(app: App): Promise<CompatibilityResult[]> {
        try {
            const stackName = app.build_stack?.name || 'unknown';
            const availableStacks = await this.herokuService.getAvailableStacks(app.id);
    
            let isCompatible = false;
            let suggestion: string = "";
            let severity: string = "Info";
    
            if (stackName === 'container') {
                suggestion = 'Docker Containers are not supported in Fir';
                severity = "Critical"
            } else if (stackName === 'heroku-24') {
                isCompatible = true;
            } else if (availableStacks.some((stack) => stack.name === 'heroku-24')) {
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
        } catch (error: any){
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