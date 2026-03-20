import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");       // 単語検索欄の入力
  const [answer, setAnswer] = useState("");     // AI の回答
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: query }),
      });

      const data = await res.json();
      setAnswer(data.answer);
    } catch (err) {
      setAnswer("AI への問い合わせでエラーが発生しました");
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "50px auto", fontFamily: "sans-serif" }}>
      
      {/* AIの回答表示エリア */}
      <div style={{
        minHeight: 60,
        padding: 12,
        marginBottom: 16,
        backgroundColor: "#f8f9fa",
        borderRadius: 6,
        border: "1px solid #ddd",
        whiteSpace: "pre-wrap",
        textAlign: "left",
      }}>
        {loading ? "AI が回答中..." : answer || "ここに AI の答えが表示されます"}
      </div>

      {/* 単語帳検索欄 */}
      <form onSubmit={handleSearch} style={{ display: "flex", gap: "8px" }}>
        <input
          type="text"
          placeholder="単語やフレーズを入力"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ flex: 1, padding: "10px", fontSize: "16px" }}
        />
        <button type="submit" style={{ padding: "10px 20px", fontSize: "16px" }}>
          検索
        </button>
      </form>
    </div>
  );
}
