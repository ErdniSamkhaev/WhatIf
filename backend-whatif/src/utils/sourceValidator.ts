export interface Source {
  url: string;
  title: string;
  reliability: number;
}

export class SourceValidator {
  private readonly RELIABLE_DOMAINS = [
    "history.com",
    "britannica.com",
    "academia.edu",
    "jstor.org",
    "bbc.co.uk",
    "worldhistory.org",
    "statearchive.ru",
    "nationalarchives.gov.uk",
    "europeana.eu",
    "springer.com",
    "scholar.google.com",
    "plato.stanford.edu",
    "elibrary.ru", // Российская научная электронная библиотека
    "cyberleninka.ru", // Российская открытая научная библиотека
    "runivers.ru", // Исторические документы России
    "prlib.ru", // Президентская библиотека
    "rsl.ru", // Российская государственная библиотека
    "bigenc.ru", // Большая российская энциклопедия
    "dic.academic.ru",
    // другие надежные домены
  ];

  validateSource(url: string): boolean {
    try {
      const domain = new URL(url).hostname;
      return this.RELIABLE_DOMAINS.some((reliable) =>
        domain.includes(reliable)
      );
    } catch {
      return false;
    }
  }

  calculateReliability(source: Source): number {
    // Базовая логика оценки надежности источника
    let reliability = 0.5;

    if (this.validateSource(source.url)) {
      reliability += 0.3;
    }

    // Дополнительные проверки...

    return Math.min(reliability, 1);
  }
  getSourceType(url: string): string {
    if (url.includes("wikipedia.org")) return "wikipedia";
    if (url.includes("cyberleninka.ru") || url.includes("jstor.org")) return "academic";
    if (url.includes("britannica.com") || url.includes("bigenc.ru")) return "encyclopedia";
    // ... другие правила
    return "other";
  }
  isRussianSource(url: string): boolean {
    return [
      "cyberleninka.ru",
      "elibrary.ru",
      "runivers.ru",
      "prlib.ru",
      "rsl.ru",
      "bigenc.ru",
      "dic.academic.ru"
    ].some(domain => url.includes(domain));
  }
  getReliabilityLabel(url: string): string {
    if (url.includes("wikipedia.org")) return "ненадежный";
    if (this.validateSource(url)) return "надежный";
    return "сомнительный";
  }
}
