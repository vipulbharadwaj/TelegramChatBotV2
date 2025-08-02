const { waitingUsers, activePairs } = require("../utils/queue");

module.exports = (bot) => {
  bot.command("stop", (ctx) => {
    const userId = ctx.from.id;
    const partnerId = activePairs[userId];

    if (partnerId) {
      delete activePairs[userId];
      delete activePairs[partnerId];
      ctx.reply("You have ended the chat.");
      bot.telegram.sendMessage(partnerId, "Your partner has ended the chat.");
      console.log(`Session ended for user ${userId} and partner ${partnerId}`);
    } else {
      ctx.reply("You are not currently paired with anyone.");
    }

    // Remove user from waiting list if they were waiting
    const index = waitingUsers.indexOf(userId);
    if (index !== -1) {
      waitingUsers.splice(index, 1);
      console.log(`User ${userId} removed from waiting list.`);
    }
  });
};
