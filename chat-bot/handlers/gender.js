const { setProfile } = require("../utils/sessionStorage");

function showGenderKeyboard(ctx) {
  return ctx.editMessageText("Please select your gender:", {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "Male", callback_data: "setgender_male" },
          { text: "Female", callback_data: "setgender_female" },
        ],
      ],
    },
  });
}

function registerGenderHandler(bot) {
  bot.command("gender", (ctx) => {
    showGenderKeyboard(ctx);
  });

  bot.action(["setgender_male", "setgender_female"], async (ctx) => {
    const gender = ctx.match[0] === "setgender_male" ? "Male" : "Female";
    setProfile(ctx.from.id, {gender: gender});
    await ctx.editMessageText(`Your gender has been set to: ${gender}`);
    await ctx.answerCbQuery();
  });
}
module.exports = {
    registerGenderHandler,
    showGenderKeyboard,
}