require("dotenv").config();
const telegraf = require("telegraf");
const { Telegraf } = telegraf;
const express = require("express");
const bot = new Telegraf(process.env.BOT_TOKEN);
const startHandler = require("./handlers/start");
const searchHandler = require("./handlers/search");
const messageHandler = require("./handlers/message");
const stopHandler = require("./handlers/stop");
const { registerGenderHandler } = require("./handlers/gender");
const helpHandler = require("./handlers/help");
const settingsHandler = require("./handlers/settings");
const { registerAgeHandler } = require("./handlers/setAge");
const { registerPreferenceHandler } = require("./handlers/preference");
const mybot = require("./handlers/me");
const quote = require("./handlers/randomQuotes");
const joke = require("./handlers/randomJokes");
const sentiment = require("sentiment");
const mood = require("./handlers/AIMode");
const activePairs = require("./utils/queue").activePairs;

const notifyOnRestart = require('./utils/queue').notifyOnRestart;

const app = express();
app.use(express.json());

//menu button
bot.telegram.setMyCommands([
  { command: "start", description: "🚀 Start the bot" },
  { command: "search", description: "🔍 Find a partner" },
  { command: "stop", description: "🛑 Stop the current session" },
  { command: "help", description: "❓ Get help and info" },
  { command: "quotes", description: "💡 Inspire me with a random quote" },
  { command: "jokes", description: "😈 Tell me a joke" },
  { command: "xmode", description: " 🫦 Turn ON flirty cutie" },
  { command: "earthmode", description: "🚪 Turn OFF flirty cutie" },
  { command: "settings", description: "⚙️ Manage your settings" },
]);

(async () => {
  await notifyOnRestart(bot, activePairs);
})();

app.get("/", (req, res) => {
  res.send("Bot is Alive!");
});

console.log("Bot is starting...");
mood(bot);
mybot(bot);
quote(bot);
joke(bot);
helpHandler(bot);
settingsHandler(bot);
registerPreferenceHandler(bot);
registerAgeHandler(bot);
registerGenderHandler(bot);
startHandler(bot);
searchHandler(bot);
stopHandler(bot);
messageHandler(bot);

bot.launch();
console.log("Bot is running...");

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:8000");
});
