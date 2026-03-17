// pages/api/ask.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ answer: "POSTメソッドのみ対応" });
  }

  const { q } = req.body;
  if (!q) return res.status(400).json({ answer: "質問が空です" });

  try {
    // Gemini APIにリクエスト
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: q }] }]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API エラー:", data);
      return res.status(response.status).json({ answer: "AI呼び出しに失敗しました" });
    }

    const answer = data?.candidates?.[0]?.content?.[0]?.parts?.[0]?.text;
    res.status(200).json({ answer: answer || "AIから回答が取得できませんでした" });

  } catch (err) {
    console.error("ask.js エラー:", err);
    res.status(500).json({ answer: "サーバーエラーが発生しました" });
  }
}
