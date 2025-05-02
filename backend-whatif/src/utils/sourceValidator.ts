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
}
