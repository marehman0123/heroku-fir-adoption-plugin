import { HerokuService } from "../../../services/heroku.service";
import { CompatibilityResult } from "../../../types/common.types";
import { App, AddonService } from "../../../types/heroku.types";

export class AddonsModule {
    constructor(private herokuService: HerokuService) { }
    async checkCompatibility(app: App, allAddons: AddonService[]): Promise<CompatibilityResult[]> {
        try {
            const appAddons = await this.herokuService.getAppAddons(app.id);
            return appAddons
                .map((addon) => {
                    const matchingAddon = allAddons.find(
                        (service) => service.id === addon.addon_service.id && service.name === addon.addon_service.name
                    );
                    const isCompatible = matchingAddon?.supported_generations?.some((gen) => gen.name === 'fir') || false;
                    return {
                        name: addon.name,
                        type: 'Addon',
                        severity: "Warning",
                        compatibility: isCompatible,
                        suggestions: isCompatible
                            ? ""
                            : `Addon "${addon.name}" is not compatible with Fir. Consider using a compatible alternative.`,
                    };
                });
        } catch (error: any) {
            return [
                {
                    name: "Addon Check",
                    compatibility: false,
                    type: "Error",
                    severity: "Critical",
                    suggestions: `Error occurred: ${error.message}`,
                },
            ];
        }

    }
}