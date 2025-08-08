const { waitingUsers, activePairs } = require("../utils/queue");
const db = require("../utils/firebase");
const myBroadcastings = require("../utils/state").myBroadcastings;
const askAI = require("../utils/ai");
const aiUsers = require("../utils/state").aiUsers;

const myId = 968128117;
module.exports = (bot) => {
  bot.on("text", async (ctx) => {
    if (ctx.message.text.startsWith("/")) return;

    if (myBroadcastings.get(myId)) {
      myBroadcastings.delete(myId);
      const msg = ctx.message.text;

      const snapshot = await db.collection("users").get();
      const users = snapshot.docs.map((doc) => doc.data().chatId);

      for (const chatId of users) {
        try {
          await ctx.telegram.sendMessage(chatId, msg);
        } catch (error) {
          console.error(`❌ Failed to send to ${chatId}:`, error.message);
        }
      }

      return ctx.reply("✅ Message broadcasted to all users.");
    }
    if (aiUsers.has(ctx.from.id)) {
      const userMessage = ctx.message.text;
      await ctx.sendChatAction("typing");
      const aiResponse = await askAI(userMessage);
      return ctx.reply(aiResponse);
    }

    const userId = ctx.from?.id;
    const partnerId = activePairs?.[userId];
    if (partnerId) {
      try {
        //Forward message to partner
        await bot.telegram.sendMessage(partnerId, ctx.message.text, {
          reply_to_message_id: undefined
        });

      } catch (error) {
        console.error(
          `Error forwarding message from ${userId} to ${partnerId}:`,
          error
        );
        ctx.reply("Please try again later.");
      }
    } else {
      ctx.reply("💬 You’re solo right now — /search to mingle!", {
        parse_mode: "Markdown",
      });
    }
  });

  bot.on(
    ["photo", "video", "document", "sticker", "voice", "animation"],
    async (ctx) => {
      const userId = ctx.from?.id;
      const partnerId = activePairs?.[userId];

      if (partnerId) {
        try {
          // Forward media to partner
          await bot.telegram.sendCopy(partnerId, ctx.message);
        } catch (error) {
          console.error(
            `Error forwarding media from ${userId} to ${partnerId}:`,
            error
          );
          ctx.reply(
            "Failed to deliver your media to your partner. Please try again later."
          );
        }
      } else {
        ctx.reply("💬 You’re solo right now — /search to mingle!");
      }
    }
  );
};
