module.exports = (bot) => {
  bot.command("help", (ctx) => {
    ctx.reply(
`🤖 *Welcome to VI Meet Help Center!*

VI Meet lets you chat anonymously with random people around the world. Here’s how to make the most of it:

🔧 *Available Commands:*
• /start – Start the bot and reset your session
• /search – Find a random chat partner
• /stop – Leave your current chat anytime
• /gender – Set or update your gender & preference
• /help – Show this help message

💡 *How to Use:*
1. Type /start to begin.
2. Use /gender to set your identity and who you’d like to match with.
3. Tap /search to get paired with a random person.
4. Want to leave? Just type /stop.

🔒 *Your Privacy Matters:*
- Chats are fully anonymous.
- No personal data is shared.
- You can leave any chat at any time.

Need more help? Just type /help anytime.

Enjoy chatting on VI Meet! 🎈`,
      { parse_mode: "Markdown" }
    );
  });
};
