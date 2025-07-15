import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const backendUrl = "https://openrouter.ai/api/v1/chat/completions";

export const chatWithBot = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    const response = await axios.post(
      backendUrl,
      {
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    
    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error("Error communicating with OpenRouter API:", error.message);
    res.status(500).json({ error: "Chatbot service failed" });
  }
};
