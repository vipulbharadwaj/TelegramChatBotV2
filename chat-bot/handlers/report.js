const { activePairs } = require("../utils/queue");

module.exports=(bot)=>{
    bot.command('report', (ctx)=>{
        const userId = ctx.from.id;
        const partnerId = activePairs?.[userId];

        if(!partnerId){
             return ctx.reply("You are not currently chatting with anyone.");
        }

        ctx.reply("🚩 Your report has been sent to the moderators. We’ll review it shortly.")
    })
}
