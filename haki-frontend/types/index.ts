export interface ScenarioRequest {
  scenario: string;
  language?: string;
}

export interface LegalAdviceResponse {
  advice: string;
  sources: string[];
  disclaimer: string;
  response_time_ms: number;
}

export interface ParsedAdvice {
  rights: string;
  actionItems: string;
  evidence: string;
  help: string;
  references: string;
}

export interface Message {
  role: "user" | "haki";
  content: string | LegalAdviceResponse;
}

export interface ScenarioChip {
  id: string;
  text: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}


