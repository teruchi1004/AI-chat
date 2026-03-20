import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question) return;

    setLoading(true);
    setAnswer("");

    try {
      // バックエンドAPIに質問を送信
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: question })
      });

      const data = await res.json();
      setAnswer(data.answer);

    } catch (err) {
      console.error(err);
      setAnswer("通信エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "50px auto", padding: 20, fontFamily: "sans-serif" }}>
      <h1>AI検索</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", marginTop: 20 }}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="質問を入力"
          style={{ flex: 1, padding: 10, fontSize: 16 }}
        />
        <button type="submit" style={{ padding: 10, marginLeft: 10, fontSize: 16 }}>
          送信
        </button>
      </form>

      {loading && <p style={{ marginTop: 20 }}>AI が考えています…</p>}

      {answer && (
        <div style={{ marginTop: 20, padding: 15, border: "1px solid #ccc", borderRadius: 5 }}>
          <strong>回答:</strong>
          <p style={{ marginTop: 10 }}>{answer}</p>
        </div>
      )}
    </div>
  );
}
