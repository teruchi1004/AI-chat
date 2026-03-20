// pages/api/ask.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  const { q } = req.body;
  if (!q) return res.status(400).json({ error: "Query required" });

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(q);
    const answer = await result.response.text();

    res.json({ answer });
  } catch (error) {
    console.error("Gemini Error:", error.message);
    res.status(500).json({ error: error.message });
  }
}
