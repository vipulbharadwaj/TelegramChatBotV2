const HF_API_KEY = process.env.AI_KEY;
const { InferenceClient } = require("@huggingface/inference");
const client = new InferenceClient(HF_API_KEY);
const cache = require("./aiCache"); 

async function askAI(userMessage) {
     // Check cache first
  if (cache.has(userMessage)) {
    return cache.get(userMessage);
  }
  try {
    const prompt = `You are a charming, flirty character who keeps things playful, romantic, hot and sexy. Include flirty emojis, try to use sexual or nsfw terms. Respond to the following message in a fun, sexy way: "${userMessage}"`;

    // Call Hugging Face API
    const chatCompletion = await client.chatCompletion({
      model: "HuggingFaceTB/SmolLM3-3B", // 'HuggingFaceH4/zephyr-7b-beta'
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_new_tokens: 40,
      temperature: 0.9,
    });
      
    let reply = chatCompletion.choices[0].message.content;
    if (reply.includes("<think>") || reply.includes("</think>")) {
      reply = reply.replace(/<think>.*<\/think>/s, "").trim();
    }
     cache.set(userMessage, reply);
    console.log("Processed AI Response:", reply);
    return reply;
  } catch (err) {
    console.error("Error calling Hugging Face API:", err);
    return "💔 My circuits got flustered by your charm! Try that again, cutie~";
  }
}

module.exports = askAI;
