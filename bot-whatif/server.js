const express = require('express');
const bodyParser = require('body-parser');
const { Telegraf } = require('telegraf');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Initialize the bot
const bot = new Telegraf(process.env.BOT_TOKEN);

// Set up webhook route
app.post(`/webhook/${process.env.BOT_TOKEN}`, (req, res) => {
  bot.handleUpdate(req.body);
  res.status(200).send('OK');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});