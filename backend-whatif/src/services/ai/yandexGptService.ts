import axios from "axios";

export class YandexGptService {
  private readonly apiUrl =
    "https://llm.api.cloud.yandex.net/foundationModels/v1/completion";
  private readonly folderId = process.env.YANDEX_FOLDER_ID!;
  private readonly iamToken = process.env.YANDEX_IAM_TOKEN!;

  async generate(prompt: string): Promise<string> {
    const headers = {
      Authorization: `Bearer ${this.iamToken}`,
      "Content-Type": "application/json",
    };

    const data = {
      modelUri: `gpt://${this.folderId}/yandexgpt/latest`,
      completionOptions: {
        stream: false,
        temperature: 0.4,
        maxTokens: 512,
      },
      messages: [{ role: "user", text: prompt }],
    };

    const response = await axios.post(this.apiUrl, data, { headers });
    return response.data.result.alternatives[0].message.text;
  }
}
