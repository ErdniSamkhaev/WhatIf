// src/services/ai/historicalScenarioService.ts
import { ValidatedFact, ScenarioResponse } from "../../types";
import { SearchService } from "../search/searchService";
import { ValidationService } from "../validation/validationService";

export class HistoricalScenarioService {
  private searchService: SearchService;
  private validationService: ValidationService;
  private MIN_CONFIDENCE_THRESHOLD = 0.7;
  private MIN_REQUIRED_FACTS = 3;

  constructor() {
    this.searchService = new SearchService();
    this.validationService = new ValidationService();
  }

  async generate(query: string): Promise<ScenarioResponse> {
    try {
      // Преобразуем запрос в Buffer и обратно для правильной кодировки
      const encodedQuery = Buffer.from(query).toString("utf-8");

      // 1. Поиск исторических фактов
      const facts = await this.searchService.findHistoricalFacts(encodedQuery);

      // 2. Валидация фактов
      const validatedFacts = await this.validationService.validateFacts(facts);

      // 3. Проверка достаточности данных
      const unknownAreas = [];
      if (validatedFacts.length < this.MIN_REQUIRED_FACTS) {
        unknownAreas.push({
          topic: encodedQuery,
          reason: "Недостаточно исторических данных для достоверного ответа",
        });
      }

      // 4. Расчет общей уверенности
      const confidence = this.calculateConfidence(validatedFacts);
      if (confidence < this.MIN_CONFIDENCE_THRESHOLD) {
        unknownAreas.push({
          topic: encodedQuery,
          reason: "Низкая уверенность в достоверности имеющихся данных",
        });
      }

      // 5. Формирование ответа
      const response: ScenarioResponse = {
        text:
          unknownAreas.length > 0
            ? "На основании имеющихся данных невозможно предоставить достоверный ответ"
            : "Здесь будет сгенерированный ответ",
        facts: validatedFacts,
        sources: this.extractSources(validatedFacts),
        confidence,
        unknownAreas,
      };

      return response;
    } catch (error) {
      throw new Error(`Failed to generate scenario: ${error}`);
    }
  }

  private calculateConfidence(facts: ValidatedFact[]): number {
    if (facts.length === 0) return 0;
    return facts.reduce((sum, fact) => sum + fact.confidence, 0) / facts.length;
  }

  private extractSources(facts: ValidatedFact[]) {
    return [];
  }
}
