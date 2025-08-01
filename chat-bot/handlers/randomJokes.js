const axios = require("axios");

module.exports = (bot) => {
    bot.command("jokes", async (ctx) => {
        try {
            const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
            const { setup, punchline } = response.data;
            await ctx.reply(`😂 *${setup}*\n\n— ${punchline}`, 
                { parse_mode: "Markdown" });

        } catch (error) {
            console.error("Error fetching joke:", error.message);
            ctx.reply("❌ Failed to generate a joke. Please try again later.");
        }
})
}
