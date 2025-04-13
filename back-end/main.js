const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ------------- GEMENI SETUP ------------- //

const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API });
// ------------- ENDPOINTS ------------- //

app.get("/", (req, res) => {
  res.send(`
    Hello World!<br>
    <a href="/text">Go to /text to see the text response</a><br>
    <a href="/audio">Go to /audio to see the audio response</a><br>
    <a href="/vision">Go to /vision to see the vision response</a>
  `);
});

// Basic route
app.get("/text", async (req, res) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "say hi only",
  });
  // console.log(response.text);
  res.json({
    success: true,
    data: response.text,
  });
});

// Example API route
app.get("/audio", (req, res) => {});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
