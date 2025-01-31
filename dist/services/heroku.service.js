"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HerokuService = void 0;
const http_call_1 = require("http-call");
const child_process_1 = require("child_process");
class HerokuService {
    // private baseApiUrl: string;
    constructor(apiKey) {
        this.apiKey = apiKey;
    }
    async getSpaceDetails(spaceName) {
        const url = `/spaces/${spaceName}`;
        return this.makeRequest(url);
    }
    async getVPNConnections(spaceId) {
        const url = `/spaces/${spaceId}/vpn-connections`;
        return this.makeRequest(url);
    }
    async getSpaceTopology(spaceId) {
        const url = `/spaces/${spaceId}/topology`;
        return this.makeRequest(url);
    }
    async getSpacePeerings(spaceId) {
        const url = `/spaces/${spaceId}/peerings`;
        return this.makeRequest(url);
    }
    async getSpaceOutboundIps(spaceId) {
        const url = `/spaces/${spaceId}/nat`;
        return this.makeRequest(url);
    }
    async getApps() {
        const url = `/apps`;
        return this.makeRequest(url);
    }
    async getAppsBySpace(space, appName) {
        const apps = await this.getApps();
        let filteredAppsBySpaceName = apps.filter((app) => { var _a; return ((_a = app.space) === null || _a === void 0 ? void 0 : _a.name) === space.name; });
        if (appName) {
            let filteredAppsByAppName = [];
            filteredAppsByAppName = filteredAppsBySpaceName.filter((app) => app.name === appName);
            if (filteredAppsByAppName.length > 0)
                return filteredAppsByAppName;
        }
        return filteredAppsBySpaceName;
    }
    async getAppAddons(appId) {
        const url = `/apps/${appId}/addons`;
        return this.makeRequest(url);
    }
    async getAllAddons() {
        const url = `/addon-services`;
        return this.makeRequest(url);
    }
    async getAvailableStacks(appId) {
        return await this.makeRequest(`/apps/${appId}/available-stacks`);
    }
    async getBuilds(appId) {
        return await this.makeRequest(`/apps/${appId}/builds`);
    }
    async getAllDynoSizes() {
        return await this.makeRequest(`/dyno-sizes`);
    }
    async getAppDynos(appId) {
        return await this.makeRequest(`/apps/${appId}/dynos`);
    }
    getSpaceTrustedIps(spaceName) {
        return (0, child_process_1.execSync)(`heroku trusted-ips --space ${spaceName}`, { encoding: 'utf8' });
    }
    async makeRequest(endPoint) {
        const url = `https://api.heroku.com${endPoint}`;
        try {
            const { body } = await http_call_1.HTTP.get(url, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    Accept: 'application/vnd.heroku+json; version=3',
                },
            });
            return body;
        }
        catch (error) {
            throw new Error(`Failed to fetch data from ${url}: ${error.message}`);
        }
    }
}
exports.HerokuService = HerokuService;
