const {waitingUsers, activePairs} = require('../utils/queue');

module.exports = (bot) => {
bot.command("search", (ctx) => {
  const userId = ctx.from.id;

  if (activePairs[userId]) {
    ctx.reply(
      "You are already paired with someone.\nUse /stop to end the current session."
    );
    return;
  }

  // Add user to waiting list
  if (waitingUsers.includes(userId)) {
    ctx.reply("_You are already in the queue. Please wait for a partner._", { parse_mode: "Markdown" });
    return;
  }

  // Check if there is a waiting user to pair with
  if (waitingUsers.length > 0) {
    // Pair with the first user in the waiting list
    const partnerId = waitingUsers.shift();
    activePairs[userId] = partnerId;
    activePairs[partnerId] = userId;
    ctx.reply(
      `_You are now paired with partner.\nUse /stop to end the session._`, { parse_mode: "Markdown" }
    );
    bot.telegram.sendMessage(
      partnerId,
      `_You are now paired with partner.\nUse /stop to end the session._`,{ parse_mode: "Markdown" }
    );
    console.log(`Paired: ${userId} <-> ${partnerId}`);
  } else {
    // Add user to waiting list
    waitingUsers.push(userId);
    console.log(
      `User ${userId} added to waiting list. Waiting users: ${waitingUsers.length}`
    );
    ctx.reply("_Searching for partner\nPlease wait..._", { parse_mode: "Markdown" });
  }
});
}