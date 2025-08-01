const db = require("../utils/firebase");
module.exports = (bot) => {
  bot.start(async (ctx) => {
    const user = {
      chatId: ctx.chat.id,
      userId: ctx.from.id,
      username: ctx.from.username || "",
      firstName: ctx.from.first_name || "",
      lastName: ctx.from.last_name || "",
      timestamp: new Date(),
    };

    try {
      await db
        .collection("users")
        .doc(String(user.chatId))
        .set(user, { merge: true });
    } catch (error) {
      console.error("Error adding user to database:", error);
    }

    ctx.reply(
      "Welcome to the void.\nType /search to find someone... or something. 👀",
      {
        parse_mode: "Markdown",
      }
    );
  });
};
