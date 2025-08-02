const { waitingUsers, activePairs } = require("../utils/queue");

module.exports = (bot) => {
  bot.command("stop", (ctx) => {
    const userId = ctx.from.id;
    const partnerId = activePairs[userId];

    try {
      if (partnerId) {
      delete activePairs[userId];
      delete activePairs[partnerId];
      ctx.reply("You have ended the chat.");
      bot.telegram.sendMessage(partnerId, "Your partner has ended the chat.\n Send /search to find a new partner.");
      console.log(`Session ended for user ${userId} and partner ${partnerId}`);
    } else {
      ctx.reply("You are not connected with anyone.\n Send /search to find a partner.");
    }

    // Remove user from waiting list if they were waiting
    const index = waitingUsers.indexOf(userId);
    if (index !== -1) {
      waitingUsers.splice(index, 1);
      console.log(`User ${userId} removed from waiting list.`);
    }
    } catch (error) {
      console.error(`Error stopping session for user ${userId}:`, error);
    }

  });
};
