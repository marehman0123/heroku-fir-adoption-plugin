export interface Generation {
  id: string;
  name: string;
}

export interface OrganizationOrTeam {
  id: string;
  name: string;
}

export interface Region {
  id: string;
  name: string;
}

export interface Space {
  created_at: string;
  id: string;
  name: string;
  organization: OrganizationOrTeam;
  team: OrganizationOrTeam;
  region: Region;
  shield: boolean;
  state: string;
  cidr: string;
  data_cidr: string;
  updated_at: string;
  generation: Generation;
}

export interface VpnTunnel {
  last_status_change: string;
  ip: string;
  customer_ip: string;
  pre_shared_key: string;
  status: string;
  status_message: string;
}

export interface VpnConnection {
  id: string;
  name: string;
  public_ip: string;
  routable_cidrs: string[];
  ike_version: number;
  space_cidr_block: string;
  tunnels: VpnTunnel[];
  status: string;
  status_message: string;
}

export interface BuildStack {
  id: string;
  name: string;
}

export interface Owner {
  email: string;
  id: string;
}

export interface SpaceRef {
  id: string;
  name: string;
  shield: boolean;
}

export interface App {
  acm: boolean;
  archived_at: string | null;
  buildpack_provided_description: string | null;
  build_stack: BuildStack;
  created_at: string;
  id: string;
  generation: Generation;
  git_url: string;
  maintenance: boolean;
  name: string;
  owner: Owner;
  region: Region;
  organization: OrganizationOrTeam;
  team: OrganizationOrTeam;
  space: SpaceRef;
  internal_routing: string | null;
  released_at: string;
  repo_size: number | null;
  slug_size: number | null;
  stack: BuildStack;
  updated_at: string;
  web_url: string;
}

export interface AddonAction {
  id: string;
  label: string;
  action: string | null;
  url: string;
  requires_owner: boolean | null;
}

export interface AddonApp {
  id: string;
  name: string;
}

export interface AddonService {
  id: string;
  name: string;
}

export interface AddonPlan {
  id: string;
  name: string;
}

export interface BillingEntity {
  id: string;
  name: string;
  type: string;
}

export interface BilledPrice {
  cents: number;
  contract: boolean;
  unit: string;
}

export interface Addon {
  actions: AddonAction[];
  app: AddonApp;
  config_vars: string[];
  created_at: string;
  id: string;
  name: string;
  addon_service: AddonService;
  plan: AddonPlan;
  billing_entity: BillingEntity;
  provider_id: string;
  state: string;
  updated_at: string;
  web_url: string;
  billed_price: BilledPrice;
}

export interface SupportedGeneration {
  id: string;
  name: string;
}

export interface AddonService {
  cli_plugin_name: string | null;
  created_at: string;
  human_name: string;
  id: string;
  name: string;
  state: string;
  supports_multiple_installations: boolean;
  supports_sharing: boolean;
  updated_at: string;
  supported_generations: SupportedGeneration[];
}

export interface Topology {
  version: number;
  apps?: {
    id: string;
    domains: string[];
    formations?: {
      id: string;
      process_type: string;
      dynos: {
        id: string;
        number: number;
        private_ip: string;
        hostname: string;
        host_entry: string;
      }[]
    }[]
  }[]
}

export interface OutboundIPs {
  created_at: string;
  sources: string[]; // Array of IP addresses
  state: string;
  updated_at: string;
}

export interface Buildpack {
  url: string;
}

export interface AppReference {
  id: string;
}

export interface Release {
  id: string;
}

export interface Slug {
  id: string;
}

export interface SourceBlob {
  checksum: string;
  url: string;
  version: string;
  version_description: string;
}

export interface User {
  email: string;
  id: string;
}

export interface Build {
  app: AppReference;
  buildpacks: Buildpack[];
  created_at: string;
  id: string;
  output_stream_url: string;
  release: Release;
  slug: Slug;
  source_blob: SourceBlob;
  stack: string;
  status: string;
  updated_at: string;
  user: User;
}
