import { ScenarioResponse, ValidatedFact } from "../types";

export class HistoricalScenario {
  text: string;
  facts: ValidatedFact[];
  sources: Array<{ url: string; title: string; reliability: number }>;
  confidence: number;
  unknownAreas: Array<{ topic: string; reason: string }>;

  constructor(data: ScenarioResponse) {
    this.text = data.text;
    this.facts = data.facts;
    this.sources = data.sources;
    this.confidence = data.confidence;
    this.unknownAreas = data.unknownAreas;
  }

  isReliable(): boolean {
    return this.confidence >= 0.7 && this.sources.length > 0;
  }

  hasUnknownAreas(): boolean {
    return this.unknownAreas.length > 0;
  }
}
