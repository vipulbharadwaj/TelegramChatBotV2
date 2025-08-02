const { waitingUsers, activePairs } = require("../utils/queue");

module.exports = (bot) => {
  bot.command("next", async (ctx) => {
    const userId = ctx.from.id;

    if (activePairs[userId]) {
      const partnerId = activePairs[userId];

      // Notify both users
      try {
        await ctx.telegram.sendMessage(
          partnerId,
          "⚠️ The user has left the chat.\nYou can now search for a new partner using /search."
        );
      } catch (e) {
        console.error(`Failed to notify partner ${partnerId}:`, e.message);
      }

      delete activePairs[userId];
      delete activePairs[partnerId];
    }

    //push agaiin to the waiting queue;
    if (!waitingUsers.includes(userId)) {
      waitingUsers.push(userId);
      console.log(`User ${userId} added back to waiting list.`);
      await ctx.reply("🔄 Searching for a new partner...");
    } else {
      await ctx.reply("🔎 Looking for a partner... Please hold on while we find someone for you.");
      console.log(`User ${userId} is already in the waiting list.`);
    }
  });
};
