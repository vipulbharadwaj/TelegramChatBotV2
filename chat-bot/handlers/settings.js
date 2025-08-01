const { Markup } = require("telegraf");
const { getProfile, setProfile } = require("../utils/sessionStorage");
const { showAgeKeyboard } = require("./setAge");
const { showGenderKeyboard } = require("./gender");
const { showPrefrenceKeyboard } = require("./preference");

module.exports = (bot) => {
  bot.command("settings", (ctx) => {
    const profile = getProfile(ctx.from.id);

    //profileCard
    const settingsText = `
⚙️ *Your Profile Settings* ⚙️

Here you can update your profile to help us find you the best match 💘
────────────────────────
📝 *My Profile* — View and complete your profile  
🚻 *Gender* — Tell us your gender  
🎂 *Age* — Update your age  
💑 *Partner Pref* — Who are you looking for?
────────────────────────
`;

    //Buttons
    const settingsKeyboard = Markup.inlineKeyboard([
      [
        Markup.button.callback("📝 My Profile", "show_profile"),
        Markup.button.callback("🚻 Gender", "edit_gender"),
      ],
      [
        Markup.button.callback("🎂 Age", "edit_age"),
        Markup.button.callback("💑 Partner Pref", "edit_preference"),
      ],
      [Markup.button.callback("⬅️ Back", "close_menu"),
      ],
    ]);

    ctx.replyWithMarkdown(settingsText, settingsKeyboard);
  });

  // Handlers for inline button actions
  bot.action("show_profile", (ctx) => {
    const profile = getProfile(ctx.from.id);
    const profileCard = `
  ✨ *PROFILE CARD* ✨

   👤  *Name*: ${ctx.from.first_name}  
   🎂  *Age*: ${profile.age || "Not set"}  
   ♟️  *Gender*: ${profile.gender || "Not set"}  
   💞  *Seeks*: ${profile.preference || "Any"}

   📊 *Profile Strength*: ${getProfileCompletion(profile)}%
`;
    ctx.editMessageText(profileCard, {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [[{ text: "⬅️ Back", callback_data: "back_to_menu" }]],
      },
    });
    ctx.answerCbQuery();
  });

  bot.action("edit_age", (ctx) => {
    ctx.answerCbQuery();
    showAgeKeyboard(ctx);
  });

  bot.action("edit_gender", (ctx) => {
    ctx.answerCbQuery();
    showGenderKeyboard(ctx);
  });

  bot.action("edit_preference", (ctx) => {
    ctx.answerCbQuery();
    showPrefrenceKeyboard(ctx);
  });

  bot.action("back_to_menu", (ctx) => {
    const settingsText = `
⚙️ *Your Profile Settings* ⚙️

Here you can update your profile to help us find you the best match 💘
────────────────────────
📝 *My Profile* — View and complete your profile  
🚻 *Gender* — Tell us your gender  
🎂 *Age* — Update your age  
💑 *Partner Pref* — Who are you looking for?
────────────────────────
`;
    const settingsKeyboard = {
      inline_keyboard: [
        [
          { text: "📝 My Profile", callback_data: "show_profile" },
          { text: "🚻 Gender", callback_data: "edit_gender" },
        ],
        [
          { text: "🎂 Age", callback_data: "edit_age" },
          { text: "💑 Partner Pref", callback_data: "edit_preference" },
        ],
        [Markup.button.callback("⬅️ Back", "close_menu"),
      ],
      ],
    };
    ctx.editMessageText(settingsText, {
      parse_mode: "Markdown",
      reply_markup: settingsKeyboard,
    });
    ctx.answerCbQuery();
  });

  bot.action("close_menu", async (ctx) => {
  try {
    await ctx.deleteMessage();
  } catch (err) {
    console.error("Failed to delete message:", err.message);
    ctx.answerCbQuery("❌ Couldn't close menu");
  }
});
};

// Helper function for profile completion
function getProfileCompletion(profile) {
  const fields = ["age", "gender", "preference"];
  return Math.round(
    (fields.filter((f) => profile[f]).length / fields.length) * 100
  );
}
