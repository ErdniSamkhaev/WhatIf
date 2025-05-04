const { Telegraf } = require("telegraf");
const axios = require("axios");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) =>
  ctx.reply(
    'Привет! Задай мне исторический вопрос. Например: "Что было бы, если..."'
  )
);

bot.on("text", async (ctx) => {
  ctx.reply("Генерирую ответ, подождите...");
  try {
    const res = await axios.post(
      "https://whatifback.onrender.com/api/generate",
      {
        query: ctx.message.text,
      }
    );
    const data = res.data;
    let answer = data.text + "\n\n";
    if (data.confidence !== undefined) {
      answer += `Уверенность: ${Math.round(data.confidence * 100)}%\n`;
    }
    if (data.sources && data.sources.length) {
      answer += "Источники:\n";
      data.sources.forEach((src, i) => {
        if (src.url) {
          answer += `${i + 1}. ${src.title} (${src.url})\n`;
        } else {
          answer += `${i + 1}. ${src.title}\n`;
        }
      });
    }
    ctx.reply(answer, { disable_web_page_preview: true });
  } catch (e) {
    ctx.reply("Ошибка при генерации ответа.");
  }
});

module.exports = bot;
