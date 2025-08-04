const { waitingUsers, activePairs } = require("../utils/queue");
const cleanUpUser = require("./cleanUpUser");


module.exports = (bot) => {
  bot.command("stop",async (ctx) => {
    const userId = ctx.from.id;
     try {
      await cleanUpUser(bot,ctx);
    } catch (error) {
      console.error(`❌ Error in /stop for user ${userId}:`, error.message);
      //ctx.reply("An error occurred while ending the chat. Please try again.");
    }

    // try {
    //   if (partnerId) {
    //   delete activePairs[userId];
    //   delete activePairs[partnerId];
    //   ctx.reply("You have ended the chat.\nYou can now search for a new partner using /search.");
    //   bot.telegram.sendMessage(partnerId, "Your partner has ended the chat.\nSend /search to find a new partner.");
    //   console.log(`Session ended for user ${userId} and partner ${partnerId}`);
    // } else {
    //   ctx.reply("You are not connected with anyone.\n Send /search to find a partner.");
    // }

    // // Remove user from waiting list if they were waiting
    // const index = waitingUsers.indexOf(userId);
    // if (index !== -1) {
    //   waitingUsers.splice(index, 1);
    //   console.log(`User ${userId} removed from waiting list.`);
    // }
    // } catch (error) {
    //   console.error(`Error stopping session for user ${userId}:`, error);
    // }

  });
};
