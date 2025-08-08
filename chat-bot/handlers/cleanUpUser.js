const { waitingUsers, activePairs} = require("../utils/queue");

const cleanUpUser = async(bot, ctx)=>{
    const userId = ctx.from.id;
    const partnerId = activePairs[userId];

    const skipNotPaired = ctx.state.searchingMode === "NEXT";


    try {
      if (partnerId) {
      delete activePairs[userId];
      delete activePairs[partnerId];
      await ctx.reply("❌ You have ended the chat.\nSend /search to find new partner.");
      await bot.telegram.sendMessage(partnerId, "⚠️ Your partner has ended the chat.\nSend /search to find new partner.");
      console.log(`Session ended for user ${userId} and partner ${partnerId}`);
    } else if(!skipNotPaired) {
      await ctx.reply("🌟 Partner not found... try /search!");
    }

    // Remove user from waiting list if they were waiting
    const index = waitingUsers.indexOf(userId);
    if (index !== -1) {
      waitingUsers.splice(index, 1);
      console.log(`User ${userId} removed from waiting list.`);
    }
    // Remove partner from waiting list if present
    if (partnerId) {
      const partnerIndex = waitingUsers.indexOf(partnerId);
      if (partnerIndex !== -1) {
        waitingUsers.splice(partnerIndex, 1);
        console.log(`Partner ${partnerId} removed from waiting list.`);
      }
    }
    } catch (error) {
      console.error(`Error stopping session for user ${userId}:`, error);
    }
}

module.exports = cleanUpUser;