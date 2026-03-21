export default function handler(req, res) {
  res.json({
    geminiKey: process.env.GEMINI_API_KEY ? "OK" : "❌未設定",
    sitesAccount: process.env.GOOGLE_SERVICE_ACCOUNT ? "OK" : "❌未設定",
    vercelUrl: process.env.VERCEL_URL || "未設定",
    timestamp: new Date().toISOString()
  });
}
