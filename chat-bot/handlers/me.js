const myId = 968128117;
const db = require("../utils/firebase");
const myBroadcastings = require("../utils/state").myBroadcastings;

module.exports = (bot) => {
  bot.command("myspace", async (ctx) => {
    if (ctx.from.id !== myId)
      return ctx.reply("🚫 *Unauthorized access.*", { parse_mode: "Markdown" });

    await ctx.reply("🛠️ *Welcome to your space *\nChoose an action below:", {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "📣 Broadcast to All Users",
              callback_data: "admin_broadcast",
            },
          ],
          [
            {
              text: "👤 View Active Users",
              callback_data: "admin_users",
            },
          ],
          [
            {
              text: "❌ Exit Panel",
              callback_data: "admin_cancel",
            },
          ],
        ],
      },
    });
  });

  bot.action("admin_broadcast", async (ctx) => {
    if (ctx.from.id !== myId) return ctx.answerCbQuery("Access denied.");
    await ctx.answerCbQuery();
    myBroadcastings.set(ctx.from.id, true);
    await ctx.reply(
      "✉️ Please send the *message* you want to broadcast to all users.",
      { parse_mode: "Markdown" }
    );
  });

  bot.action("admin_users", async (ctx) => {
    if (ctx.from.id !== myId) return ctx.answerCbQuery("Access denied.");
    await ctx.answerCbQuery();
    try {
      const snapshot = await db.collection("users").get();
      const userCount = snapshot.size;

      await ctx.reply(`👥 Currently, there are *${userCount}* active users.`, {
        parse_mode: "Markdown",
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      await ctx.reply("⚠️ Failed to fetch active user count.");
    }
  });

  bot.action("admin_cancel", async (ctx) => {
    if (ctx.from.id !== myId) return ctx.answerCbQuery("Access denied.");
    try {
      //wait ctx.editMessageText("❌ Admin panel closed.");
      // Or use deleteMessage() if you want to remove it instead:
      await ctx.deleteMessage();
    } catch (error) {
      console.error("Error editing admin cancel message:", error.message);
    }
  });
};
