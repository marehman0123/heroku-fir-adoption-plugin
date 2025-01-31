import { HTTP } from 'http-call';
import { execSync } from 'child_process';
import { Space, VpnConnection, App, Addon, AddonService, Topology, OutboundIPs, Build } from '../types/heroku.types';

export class HerokuService {
  private apiKey: string;
  // private baseApiUrl: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getSpaceDetails(spaceName: string): Promise<Space> {
    const url = `/spaces/${spaceName}`;
    return this.makeRequest<Space>(url);
  }

  async getVPNConnections(spaceId: string): Promise<VpnConnection[]> {
    const url = `/spaces/${spaceId}/vpn-connections`;
    return this.makeRequest<VpnConnection[]>(url);
  }

  async getSpaceTopology(spaceId: string): Promise<Topology> {
    const url = `/spaces/${spaceId}/topology`;
    return this.makeRequest<Topology>(url)
  }

  async getSpacePeerings(spaceId: string) : Promise<any> {
    const url = `/spaces/${spaceId}/peerings`;
    return this.makeRequest<any>(url);
  }

  async getSpaceOutboundIps(spaceId: string) : Promise<OutboundIPs> {
    const url = `/spaces/${spaceId}/nat`;
    return this.makeRequest<OutboundIPs>(url);
  }
  async getApps(): Promise<App[]> {
    const url = `/apps`;
    return this.makeRequest(url);
  }

  async getAppsBySpace(space: Space, appName?: string): Promise<App[]> {
    const apps = await this.getApps();
    let filteredAppsBySpaceName = apps.filter((app: App) => app.space?.name === space.name);

    if (appName) {
        let filteredAppsByAppName = [];
        filteredAppsByAppName = filteredAppsBySpaceName.filter((app: any) => app.name === appName);
        if (filteredAppsByAppName.length > 0)
            return filteredAppsByAppName;

    }
    return filteredAppsBySpaceName;
  }

  async getAppAddons(appId: string): Promise<Addon[]> {
    const url = `/apps/${appId}/addons`;
    return this.makeRequest<any>(url);
  }

  async getAllAddons(): Promise<AddonService[]> {
    const url = `/addon-services`;
    return this.makeRequest<any>(url);
  }

  async getAvailableStacks(appId: string): Promise<any[]> {
    return await this.makeRequest<any[]>(`/apps/${appId}/available-stacks`);
  }
  async getBuilds(appId: string): Promise<Build[]> {
    return await this.makeRequest<any[]>(`/apps/${appId}/builds`);
  }

  async getAllDynoSizes(): Promise<any[]> {
    return await this.makeRequest<any[]>(`/dyno-sizes`);
  }

  async getAppDynos(appId: string): Promise<any[]> {
    return await this.makeRequest<any[]>(`/apps/${appId}/dynos`);
  }

  getSpaceTrustedIps(spaceName: string) : any {
    return execSync(`heroku trusted-ips --space ${spaceName}`, { encoding: 'utf8' });
  }
  private async makeRequest<T>(endPoint: string): Promise<T> {
    const url = `https://api.heroku.com${endPoint}`;
    try {
      const { body } = await HTTP.get<any>(url, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          Accept: 'application/vnd.heroku+json; version=3',
        },
      });
      return body;
    } catch (error: any) {
      throw new Error(`Failed to fetch data from ${url}: ${error.message}`);
    }
  }
}
