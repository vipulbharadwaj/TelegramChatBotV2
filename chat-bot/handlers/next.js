const { waitingUsers, activePairs } = require("../utils/queue");
const cleanUpUser = require("./cleanUpUser");
const matchUser = require("./matchMaking");

module.exports = (bot) => {
  bot.command("next", async (ctx) => {
    const userId = ctx.from.id;

    try {
      await cleanUpUser(bot, ctx);
      //push agaiin to the waiting queue;
      if (!waitingUsers.includes(userId)) {
        waitingUsers.push(userId);
        console.log(`User ${userId} added back to waiting list.`);
        await ctx.reply("🔄 Searching for a new partner...");
        matchUser(bot, ctx, userId);
      } else {
        await ctx.reply(
          "🔎 Looking for a partner... Please hold on while we find someone for you."
        );
        console.log(`User ${userId} is already in the waiting list.`);
      }
    } catch (error) {
      console.error(`❌ Error in /next for user ${userId}:`, error.message);
      //ctx.reply("An error occurred. Please try again.");
    }
  });
};
