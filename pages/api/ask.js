export default async function handler(req, res) {
  if(req.method !== "POST") return res.status(405).json({error:"POSTのみ"});
  const {q} = req.body;
  if(!q) return res.status(400).json({error:"質問必須"});
  
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          contents:[{parts:[{text:q}]}]
        })
      }
    );
    
    if(!response.ok) {
      throw new Error(`APIエラー: ${response.status}`);
    }
    
    const data = await response.json();
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || "回答なし";
    
    res.json({answer});
  } catch(error) {
    console.error("Gemini Error:", error);
    res.status(500).json({error: error.message});
  }
}
