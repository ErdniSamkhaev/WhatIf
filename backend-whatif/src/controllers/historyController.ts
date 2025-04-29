import { Request, Response } from "express";
import { HistoricalScenarioService } from "../services/ai/historicalScenarioService";

export const generateHistoricalScenario = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { query } = req.body;

    if (!query) {
      res.status(400).json({
        error: "Query is required",
      });
      return;
    }

    // Декодируем запрос
    const decodedQuery = decodeURIComponent(query);

    const scenarioService = new HistoricalScenarioService();
    const result = await scenarioService.generate(decodedQuery);

    // Явно указываем кодировку при отправке ответа
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).json(result);
  } catch (error) {
    console.error("Error generating scenario:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
