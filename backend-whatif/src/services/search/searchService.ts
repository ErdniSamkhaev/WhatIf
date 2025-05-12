// src/services/search/searchService.ts
interface HistoricalFact {
  content: string;
  year: number;
  source: string;
  url: string;
  reliability: number;
}

export class SearchService {
  async findHistoricalFacts(query: string): Promise<HistoricalFact[]> {
    try {
      const url = `https://cyberleninka.ru/api/search?query=${encodeURIComponent(query)}&size=5`;
      const response = await fetch(url);
      const data = await response.json();

      // Преобразуем результаты поиска в HistoricalFact[]
      const facts: HistoricalFact[] = data.articles.map((item: any) => ({
        content: item.title, // Можно добавить аннотацию, если нужна
        year: item.year || null,
        source: "CyberLeninka",
        url: `https://cyberleninka.ru/article/n/${item.id}`,
        reliability: 0.8, // Научная статья — высокая надёжность
      }));

      return facts;
    } catch (error) {
      throw new Error(`Failed to find historical facts: ${error}`);
    }
  }
}
