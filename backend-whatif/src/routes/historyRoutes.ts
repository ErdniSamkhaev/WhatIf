import { Router, Request, Response } from "express";
import { generateHistoricalScenario } from "../controllers/historyController";

const router = Router();

// Явно указываем типы для Request и Response
router.post("/generate", async (req: Request, res: Response) => {
  await generateHistoricalScenario(req, res);
});

export default router;