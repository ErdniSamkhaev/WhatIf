import axios from "axios";
import { AI_CONFIG } from "../../config/ai.config";
import { SourceValidator } from "../../utils/sourceValidator";
import { YANDEX_CONFIG } from "../../config/yandex.config";

export class YandexGptService {
  private readonly apiUrl = YANDEX_CONFIG.API_URL;
  private readonly folderId = YANDEX_CONFIG.FOLDER_ID;
  private readonly iamToken = YANDEX_CONFIG.IAM_TOKEN;
  private readonly sourceValidator: SourceValidator;

  constructor() {
    this.sourceValidator = new SourceValidator();
  }

  async generate(query: string): Promise<string> {
    const enhancedPrompt = this.createEnhancedPrompt(query);

    const headers = {
      Authorization: `Bearer ${this.iamToken}`,
      "Content-Type": "application/json",
    };

    const data = {
      modelUri: `gpt://${this.folderId}/${AI_CONFIG.MODEL_URI}`,
      completionOptions: {
        stream: false,
        temperature: AI_CONFIG.TEMPERATURE,
        maxTokens: AI_CONFIG.MAX_TOKENS,
      },
      messages: [
        { role: "system", text: AI_CONFIG.SYSTEM_PROMPT },
        { role: "user", text: enhancedPrompt },
      ],
    };

    try {
      const response = await axios.post(this.apiUrl, data, { headers });
      const result = response.data.result.alternatives[0].message.text;

      // Анализируем ответ на наличие источников и достоверность
      const analysis = this.analyzeResponse(result);

      if (!analysis.isReliable) {
        return this.createUncertaintyResponse(analysis.reason);
      }

      return this.formatResponse(result, analysis.sources);
    } catch (error) {
      throw new Error(`Failed to generate response: ${error}`);
    }
  }

  private createEnhancedPrompt(query: string): string {
    return `
Проанализируй следующий исторический вопрос: "${query}"

Требования к ответу:
1. Структура ответа должна быть следующей:
   [Основной текст с историческими фактами]
   
   ИСТОЧНИКИ:
   - [Список источников]
   
   УВЕРЕННОСТЬ: [0-100]%

2. В основном тексте:
   - Используй конкретные даты и факты
   - Указывай первоисточники
   - Отмечай спорные моменты

3. Если не можешь дать достоверный ответ:
   - Честно признай это
   - Объясни причину
   - Предложи, как можно уточнить вопрос

4. При указании источников:
   - Используй академические источники
   - Давай полные названия
   - По возможности указывай URL

Пожалуйста, будь максимально точным и опирайся на проверенные исторические данные.
    `;
  }

  private analyzeResponse(response: string): {
    isReliable: boolean;
    reason: string;
    sources: Array<{ url: string; title: string; reliability: number }>;
  } {
    // Проверяем наличие явного указания на неуверенность в ответе
    const uncertaintyPhrases = [
      "не могу предоставить достоверный ответ",
      "недостаточно информации",
      "нет достоверных данных",
    ];

    const hasUncertainty = uncertaintyPhrases.some((phrase) =>
      response.toLowerCase().includes(phrase.toLowerCase())
    );

    if (hasUncertainty) {
      return {
        isReliable: false,
        reason: "Модель указала на недостаточность информации",
        sources: [],
      };
    }

    // Проверяем наличие уровня уверенности в ответе
    const confidenceMatch = response.match(/уверенности?:?\s*(\d+)%/i);
    const confidence = confidenceMatch ? parseInt(confidenceMatch[1]) : 0;

    // Извлекаем источники
    const sources = this.extractSources(response);

    // Если есть высокая уверенность или есть ссылки на источники
    if (confidence >= 70 || sources.length > 0) {
      return {
        isReliable: true,
        reason: `Уверенность: ${confidence}%, найдено источников: ${sources.length}`,
        sources: sources,
      };
    }

    // Проверяем наличие конкретных исторических дат и фактов
    const hasHistoricalDates = /\b\d{4}\b/.test(response); // Ищем годы
    const hasSpecificFacts = response.length > 200; // Примерная проверка на детальность ответа

    if (hasHistoricalDates && hasSpecificFacts) {
      return {
        isReliable: true,
        reason: "Ответ содержит конкретные исторические факты и даты",
        sources: sources,
      };
    }

    return {
      isReliable: false,
      reason: "Недостаточно подтверждающей информации в ответе",
      sources: [],
    };
  }

  private extractSources(
    text: string
  ): Array<{ url: string; title: string; reliability: number }> {
    const sources: Array<{ url: string; title: string; reliability: number }> =
      [];

    // Ищем ссылки в тексте
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = text.match(urlRegex) || [];

    // Ищем упоминания источников в тексте
    const sourceRegex =
      /(?:источник|ссылка|согласно|по данным)[:\s]+([^\.]+)/gi;
    const sourcesMatches = Array.from(text.matchAll(sourceRegex));

    // Добавляем URL источники
    for (const url of urls) {
      sources.push({
        url,
        title: "Веб-источник",
        reliability: 0.8,
      });
    }

    // Добавляем текстовые упоминания источников
    for (const match of sourcesMatches) {
      const sourceText = match[1];
      // Проверяем, что текст источника существует и не является URL
      if (
        sourceText &&
        typeof sourceText === "string" &&
        !urls.some((url) => url.includes(sourceText))
      ) {
        sources.push({
          url: "",
          title: sourceText.trim(),
          reliability: 0.7,
        });
      }
    }

    return sources;
  }

  private createUncertaintyResponse(reason: string): string {
    return `
К сожалению, я не могу предоставить достоверный ответ на этот вопрос.
Причина: ${reason}

Рекомендации:
1. Попробуйте уточнить вопрос
2. Укажите конкретный исторический период
3. Добавьте больше контекста к вопросу
    `;
  }

  private formatResponse(
    text: string,
    sources: Array<{ url: string; title: string; reliability: number }>
  ): string {
    const sourcesList = sources
      .map(
        (source) => `- ${source.title} (Надежность: ${Math.round(
          source.reliability * 100
        )}%)
   ${source.url}`
      )
      .join("\n");

    return `
${text}

Источники информации:
${sourcesList}
    `;
  }
}
