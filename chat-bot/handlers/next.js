const { waitingUsers, activePairs } = require("../utils/queue");
const cleanUpUser = require("./cleanUpUser");
const matchUser = require("./matchMaking");

module.exports = (bot) => {
  bot.command("next", async (ctx) => {
    const userId = ctx.from.id;

    try {
      if (waitingUsers.includes(userId) && !activePairs[userId]) {
        await ctx.reply(
          "⏳ Please wait, we're still searching for someone to connect you with..."
        );
        return; 
      }
      ctx.state.searchingMode = "NEXT";
      await cleanUpUser(bot, ctx);
      await matchUser(bot, ctx, userId, true);
    } catch (error) {
      console.error(`❌ Error in /next for user ${userId}:`, error.message);
      //ctx.reply("An error occurred. Please try again.");
    }
  });
};
