export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ answer: "POSTのみ対応" });
  }

  const { q } = req.body;
  if (!q) return res.status(400).json({ answer: "質問が空です" });

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: q }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    const answer =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "回答が取得できませんでした";

    res.status(200).json({ answer });

  } catch (error) {
    res.status(500).json({ answer: "サーバーエラー" });
  }
}
