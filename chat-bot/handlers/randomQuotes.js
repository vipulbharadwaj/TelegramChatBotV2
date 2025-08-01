const axios = require("axios");

module.exports = (bot)=>{
bot.command("quotes", async(ctx)=>{
    try {
        const response = await axios.get("https://zenquotes.io/api/random");
        const {q, a} = response.data[0];
       await ctx.reply(`📜 *${q}*\n\n— ${a}`, {
      parse_mode: "Markdown",
    });
    } catch (error) {
        console.error("Error fetching quote:", error.message);
    ctx.reply("❌ Failed to generate a quote. Please try again later.");
    }
})
}
