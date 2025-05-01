import { Request, Response } from "express";
import { YandexGptService } from "../services/ai/yandexGptService";
import { HistoricalScenario } from "../models/HistoricalScenario";

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

    const yandexGpt = new YandexGptService();
    const response = await yandexGpt.generate(query);

    // Создаем экземпляр исторического сценария
    const scenario = new HistoricalScenario({
      text: response,
      facts: [], // Будет заполнено после анализа ответа
      sources: [], // Будет заполнено после анализа ответа
      confidence: 0,
      unknownAreas: [],
    });

    res.status(200).json(scenario);
  } catch (error) {
    console.error("Error generating scenario:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
