require("dotenv").config();
const telegraf = require("telegraf");
const { Telegraf } = telegraf;
const express = require("express");
const bot = new Telegraf(process.env.BOT_TOKEN);
const startHandler = require("./handlers/start");
const searchHandler = require("./handlers/search");
const next = require("./handlers/next");
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
const report = require("./handlers/report");


const app = express();
app.use(express.json());


//menu button
bot.telegram.setMyCommands([
  { command: "start", description: "🚀 Start the bot" },
  { command: "search", description: "🔍 Find a partner" },
   { command: "report", description: "🚩 Report your chat partner for inappropriate behavior" },
  { command: "next", description: "🔄 Find a new partner" },
  { command: "stop", description: "🛑 Stop the current session" },
  { command: "help", description: "❓ Get help and info" },
  { command: "quotes", description: "💡 Inspire me with a random quote" },
  { command: "jokes", description: "😈 Tell me a joke" },
  { command: "xmode", description: " 🫦 Turn ON flirty cutie" },
  { command: "earthmode", description: "🚪 Turn OFF flirty cutie" },
  { command: "settings", description: "⚙️ Manage your settings" },
]);


app.get("/", (req, res) => {
  res.send("Bot is Alive!");
});

console.log("Bot is starting...");
mood(bot);
mybot(bot);
report(bot);
quote(bot);
joke(bot);
helpHandler(bot);
settingsHandler(bot);
registerPreferenceHandler(bot);
registerAgeHandler(bot);
registerGenderHandler(bot);
startHandler(bot);
next(bot);
searchHandler(bot);
stopHandler(bot);
messageHandler(bot);


  // Register bot webhook with Telegram
 // bot.launch();

const WEBHOOK_PATH = "/telegram-webhook";
const WEBHOOK_URL = `https://vichatbotv2.onrender.com${WEBHOOK_PATH}`;
const PORT = process.env.PORT || 8000;

(async () => {
  try {
    console.log("Registering webhook with Telegram...");
    await bot.telegram.setWebhook(WEBHOOK_URL);
    console.log(`✅ Webhook registered at: ${WEBHOOK_URL}`);

    // Middleware for webhook handling
    app.use(bot.webhookCallback(WEBHOOK_PATH));

    // Start the server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Error setting webhook:", err.message);
    process.exit(1);
  }
})();



