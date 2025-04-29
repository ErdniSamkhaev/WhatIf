// src/types/index.ts
export interface HistoricalFact {
  content: string;
  year: number;
  source: string;
  url: string;
  reliability: number;
}

export interface ValidatedFact {
  content: string;
  sources: string[];
  confidence: number;
  isVerified: boolean;
}

export interface ScenarioResponse {
  text: string;
  facts: ValidatedFact[];
  sources: {
    url: string;
    title: string;
    reliability: number;
  }[];
  confidence: number;
  unknownAreas: {
    topic: string;
    reason: string;
  }[];
}
