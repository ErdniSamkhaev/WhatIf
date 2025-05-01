import dotenv from "dotenv";
dotenv.config();

// Добавим отладочную информацию
console.log('Checking environment variables:');
console.log('FOLDER_ID:', process.env.YANDEX_FOLDER_ID ? 'Present' : 'Missing');
console.log('IAM_TOKEN:', process.env.YANDEX_IAM_TOKEN ? 'Present' : 'Missing');

interface YandexConfig {
  FOLDER_ID: string;
  IAM_TOKEN: string;
  API_URL: string;
}

if (!process.env.YANDEX_FOLDER_ID || !process.env.YANDEX_IAM_TOKEN) {
  throw new Error(
    "Missing required environment variables: YANDEX_FOLDER_ID and YANDEX_IAM_TOKEN must be set"
  );
}

export const YANDEX_CONFIG: YandexConfig = {
  FOLDER_ID: process.env.YANDEX_FOLDER_ID as string,
  IAM_TOKEN: process.env.YANDEX_IAM_TOKEN as string,
  API_URL: "https://llm.api.cloud.yandex.net/foundationModels/v1/completion",
};
