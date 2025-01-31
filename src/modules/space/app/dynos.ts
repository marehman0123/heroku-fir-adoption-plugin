import { HerokuService } from '../../../services/heroku.service';
import { App } from '../../../types/heroku.types';
import { CompatibilityResult } from '../../../types/common.types';

export class DynosModule {
    constructor(private herokuService: HerokuService) { }

    async checkCompatibility(app: App, allDynos: any[]): Promise<CompatibilityResult[]> {
        try {
            const appDynos = await this.herokuService.getAppDynos(app.id);
            return appDynos
                .map((dyno) => {
                    const matchingDyno = allDynos.find((d) => d.name === dyno.size);
                    const bestSuggestion = allDynos
                        .filter((d) => d.generation.name === "fir" && d.memory >= (matchingDyno?.memory || 0))
                        .sort((a, b) => a.memory - b.memory)[0]?.name;
    
                    return {
                        name: dyno.size,
                        type: "Dyno",
                        severity: "Warning",
                        compatibility: false,
                        suggestions: `Fir Dyno: ${bestSuggestion}` || "No suitable Fir dyno available.",
                    };
                });
        } catch (error: any){
            return [
                {
                    name: "Dynos Check",
                    compatibility: false,
                    type: "Error",
                    severity: "Critical",
                    suggestions: `Error occurred: ${error.message}`,
                },
            ];
        }
        
    }
}
