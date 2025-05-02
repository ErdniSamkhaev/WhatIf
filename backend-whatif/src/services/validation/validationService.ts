import { SourceValidator } from "../../utils/sourceValidator";

interface ValidatedFact {
  content: string;
  sources: string[];
  confidence: number;
  isVerified: boolean;
}

export class ValidationService {
  private sourceValidator = new SourceValidator();

  async validateFacts(facts: any[]): Promise<ValidatedFact[]> {
    try {
      // Фильтруем и валидируем факты
      const validated: ValidatedFact[] = facts
        .map((fact) => {
          // Фильтруем источники: только разрешённые
          const validSources = (fact.sources || []).filter(
            (src: string) =>
              this.sourceValidator.validateSource(src) &&
              !src.includes("wikipedia.org") // Явно исключаем Википедию
          );

          // Оцениваем надёжность: среднее по всем источникам
          let confidence = 0;
          if (validSources.length > 0) {
            confidence =
              validSources
                .map((src: string) =>
                  this.sourceValidator.calculateReliability({
                    url: src,
                    title: "",
                    reliability: 0,
                  })
                )
                .reduce((a: number, b: number) => a + b, 0) /
              validSources.length;
          }

          return {
            content: fact.content,
            sources: validSources,
            confidence,
            isVerified: confidence >= 0.7 && validSources.length > 0,
          };
        })
        // Оставляем только факты с разрешёнными источниками и достаточной уверенностью
        .filter((fact) => fact.isVerified);

      return validated;
    } catch (error) {
      throw new Error(`Failed to validate facts: ${error}`);
    }
  }
}
