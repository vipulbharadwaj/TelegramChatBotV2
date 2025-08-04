const {waitingUsers, activePairs} = require('../utils/queue')

const matchUser = (bot, ctx, userId) => {
  if (waitingUsers.length > 0) {
    // Pair with the first user in the waiting list
    const partnerId = waitingUsers.shift();
    activePairs[userId] = partnerId;
    activePairs[partnerId] = userId;
    ctx.reply(
      `_You are now connected with a partner._\n\n_Send /stop to end the session\nSend /next to find a new partner_`,
      { parse_mode: "Markdown" }
    );

    bot.telegram.sendMessage(
      partnerId,
      `_You are now connected with a partner._\n\n_Send /stop to end the session\nSend /next to find a new partner_`,
      { parse_mode: "Markdown" }
    );
    console.log(`Paired: ${userId} <-> ${partnerId}`);
  } else {
    // Add user to waiting list
    waitingUsers.push(userId);
    console.log(
      `User ${userId} added to waiting list. Waiting users: ${waitingUsers.length}`
    );
    ctx.reply("_Searching for a partner Please wait..._", {
      parse_mode: "Markdown",
    });
  }
};

module.exports = matchUser;
