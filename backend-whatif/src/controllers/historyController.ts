import { Request, Response } from "express";
import { YandexGptService } from "../services/ai/yandexGptService";

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

    // Создаем экземпляр сервиса
    const yandexGpt = new YandexGptService();

    // Генерируем ответ через YandexGPT
    const aiText = await yandexGpt.generate(
      "Сформулируй альтернативный исторический сценарий: " + query
    );

    // Отправляем ответ клиенту
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).json({ text: aiText });
  } catch (error) {
    console.error("Error generating scenario:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
