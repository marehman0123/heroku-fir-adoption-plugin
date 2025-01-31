export interface CompatibilityResult {
    name: string;
    compatibility: true | false;
    type : string,
    severity?: string;
    suggestions?: string;
}

export type Severity = "Info" | "Warning" | "Critical";