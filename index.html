// api/ask.js
export default async function handler(req, res) {
  try {
    const q = req.body.q;
    if (!q) {
      return res.status(400).json({ answer: "質問が空です" });
    }

    // Gemini API に問い合わせ
    const r = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: q }] }]
        })
      }
    );

    const data = await r.json();

    // 返答をJSONで返す
    res.status(200).json({
      answer:
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "AIからの回答が取得できませんでした"
    });
  } catch (e) {
    console.error("ask.js error:", e);
    res.status(500).json({ answer: "API呼び出しに失敗しました" });
  }
}
