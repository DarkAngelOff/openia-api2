const express = require("express");
const OpenAI = require("openai");

const app = express();
const port = process.env.PORT || 3000;

if (!process.env.OPENAI_API_KEY) {
  console.error("❌ ERREUR: La variable OPENAI_API_KEY n'est pas définie !");
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
  res.send("✅ API SlayProtect est en ligne !");
});

app.get("/gpt", async (req, res) => {
  const prompt = req.query.prompt || "Bonjour !";
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    res.send(response.choices[0].message.content);
  } catch (err) {
    console.error("Erreur OpenAI:", err.message);
    res.status(500).send("Erreur API OpenAI: " + err.message);
  }
});

app.listen(port, () => {
  console.log(`🚀 API en ligne sur le port ${port}`);
});
