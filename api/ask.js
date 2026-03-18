export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ answer: "POST で送信してください" });
  }

  const { q } = req.body;
  if (!q) return res.status(400).json({ answer: "質問が空です" });

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: q,
          temperature: 0.7,
          maxOutputTokens: 500
        }),
      }
    );

    const data = await response.json();
    const answer = data?.candidates?.[0]?.content?.[0]?.text || "回答なし";

    res.status(200).json({ answer });
  } catch (err) {
    res.status(500).json({ answer: "AI API 呼び出しに失敗しました" });
  }
