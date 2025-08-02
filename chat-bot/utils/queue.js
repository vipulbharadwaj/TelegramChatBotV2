const waitingUsers = [];
const activePairs ={};


async function notifyOnRestart(bot, activePairs) {
  for (const userId in activePairs) {
    const partnerId = activePairs[userId];
    try {
      await bot.telegram.sendMessage(userId, '⚠️ Your chat session has ended.');
      await bot.telegram.sendMessage(partnerId, '⚠️ Your chat session has ended.');
    } catch (e) {
      console.error(`Failed to notify users ${userId} or ${partnerId}:`, e.message);
    }
  }

  
  for (const userId in activePairs) {
    delete activePairs[userId];
  }
};


module.exports = {
  waitingUsers,
  activePairs,
  notifyOnRestart
};
