import dotenv from "dotenv";
dotenv.config();
import { Buffer } from "buffer";
Buffer.from("test");
import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
process.env.LANG = "ru_RU.UTF-8";
process.env.LC_ALL = "ru_RU.UTF-8";

// Импорт роутов
import historyRoutes from "./routes/historyRoutes";

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(morgan("dev"));
// Убираем charset из express.json()
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Настройка кодировки для всех ответов
app.use((req, res, next) => {
  res.charset = "utf-8";
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  next();
});

// Routes
app.use("/api", historyRoutes);

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
