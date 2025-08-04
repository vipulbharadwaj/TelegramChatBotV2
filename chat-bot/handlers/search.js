const {waitingUsers, activePairs} = require('../utils/queue');
const matchUser = require('./matchMaking');

module.exports = (bot) => {
bot.command("search", (ctx) => {
  const userId = ctx.from.id;

  if (activePairs[userId]) {
    ctx.reply(
      "You are already connected with someone.\nSend /stop to end the current session."
    );
    return;
  }
  
  // Add user to waiting list
  if (waitingUsers.includes(userId)) {
    ctx.reply("_You are already in the queue.\nPlease wait for a partner._", { parse_mode: "Markdown" });
    return;
  }

  // Check if there is a waiting user to pair with
  try {
      matchUser(bot, ctx, userId);
    } catch (error) {
      console.error(`❌ Error in /search for user ${userId}:`, error);
      ctx.reply("Calm down...");
    }

});
}