const express = require("express");
const OpenAI = require("openai");

const app = express();
const port = process.env.PORT || 3000;

// OpenAI API Key depuis les variables Railway
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Endpoint GET: /gpt?prompt=tontexte
app.get("/gpt", async (req, res) => {
  const prompt = req.query.prompt || "Bonjour";
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    res.send(response.choices[0].message.content);
  } catch (err) {
    res.status(500).send("Erreur API: " + err.message);
  }
});

app.listen(port, () => {
  console.log(`✅ API en ligne sur le port ${port}`);
});
