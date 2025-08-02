const aiUsers = require("../utils/state").aiUsers;

module.exports = (bot) => {
  bot.command("xmode", async (ctx) => {
    aiUsers.set(ctx.from.id, true);
   ctx.replyWithMarkdown(
  "🔥 Your flirty AI cutie is awake, sweetheart! Ready to ignite some playful sparks? Chat with me! 😘\n\n" +
  "✨ *Psst... Need to turn me off?*\n" +
  "-  Just send */earthmode* to me~"
);
  });

  bot.command("earthmode", (ctx) => {
    aiUsers.delete(ctx.from.id);
    ctx.reply(
      "❌ Your flirty AI cutie has left the chat. Come back anytime for more playful banter! 😘"
    );
    //ctx.reply("AI Companion deactivated.");
  });
};
