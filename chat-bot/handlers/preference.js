const { setProfile } = require("../utils/sessionStorage");

function showPrefrenceKeyboard(ctx) {
  return ctx.editMessageText("Select preferred partner gender:", {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "♂ Male", callback_data: "setpref_male" },
          { text: "♀ Female", callback_data: "setpref_female" },
        ],
      ],
    },
  });
}

function registerPreferenceHandler(bot) {
  bot.command("preference", async (ctx) => {
    showPrefrenceKeyboard(ctx);
  });

  bot.action(["setpref_male", "setpref_female"], async (ctx) => {
    const pref = ctx.match[0] === "setpref_male" ? "Male" : "Female";
    setProfile(ctx.from.id, { preference: pref });
    await ctx.editMessageText(
      `Your partner prefrence has been set to: ${pref}`
    );
    await ctx.answerCbQuery();
  });
}
module.exports = {
  registerPreferenceHandler,
  showPrefrenceKeyboard,
};
