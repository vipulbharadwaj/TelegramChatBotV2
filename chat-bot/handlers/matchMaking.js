const { waitingUsers, activePairs } = require("../utils/queue");

const matchUser = async (bot, ctx, userId, calledFromNext = false) => {
  if (waitingUsers.length > 0) {
    // Pair with the first user in the waiting list
    const partnerId = waitingUsers.shift();
    if (partnerId === userId) {
      console.log(`⚠️ Skipped self-pairing for user ${userId}`);
      return;
    }
    activePairs[userId] = partnerId;
    activePairs[partnerId] = userId;
    await ctx.reply(
      `_You are now connected with a partner._\n\n_Send /stop to end the session\nSend /next to find a new partner_`,
      { parse_mode: "Markdown" }
    );

    await bot.telegram.sendMessage(
      partnerId,
      `_You are now connected with a partner._\n\n_Send /stop to end the session\nSend /next to find a new partner_`,
      { parse_mode: "Markdown" }
    );
    console.log(`Paired: ${userId} <-> ${partnerId}`);
  } else {
    // Add user to waiting list
    if (!waitingUsers.includes(userId)) {
      waitingUsers.push(userId);
      console.log(
        `User ${userId} added to waiting list. Waiting users: ${waitingUsers.length}`
      );

      await ctx.reply(
        calledFromNext
          ? "🔍 Looking for a fresh connection... Hang tight! 💫"
          : "_Searching for partner... Please wait ✨_",
        calledFromNext ? {} : { parse_mode: "Markdown" }
      );
    } else {
      console.log(`User ${userId} already in waiting list.`);
    }
  }
};

module.exports = matchUser;
