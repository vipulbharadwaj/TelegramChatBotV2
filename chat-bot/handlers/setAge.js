const { setProfile } = require("../utils/sessionStorage");


function showAgeKeyboard(ctx) {
    return ctx.editMessageText("Please select your age:", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "18-20", callback_data: "setage_18_20" },
            { text: "21-23", callback_data: "setage_21_23" }
          ],
          [
            { text: "24-26", callback_data: "setage_24_26" },
            { text: "27-30", callback_data: "setage_27_30" }
          ],
          [
            { text: "31-35", callback_data: "setage_31_35" },
            { text: "36-48", callback_data: "setage_36_48" }
          ]
        ]
      }
    });
}

function registerAgeHandler(bot) {
    bot.command("age", (ctx) => {
    showAgeKeyboard(ctx);
    });

  bot.action(/^setage_(.+)$/, async(ctx) => {   
    const action = ctx.match[1]; 
    const ageRange = action.replace("_", "-");
    console.log("Setting age for", ctx.from.id, "=>", ageRange);

    setProfile(ctx.from.id, { age: ageRange });
    await ctx.editMessageText(`✅ Your age has been set to: ${ageRange}`);
    await ctx.answerCbQuery();
  });
};

module.exports = {
    registerAgeHandler,
    showAgeKeyboard,
}
