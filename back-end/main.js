const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const multer = require("multer");
const fs = require("fs");
const upload = multer({ dest: "uploads/" });
// ------------- GEMENI SETUP ------------- //

const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API });

// ------------- HELPER METHODS ------------- //
async function respondFromPrompt(contents) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents,
    });
    return { success: true, data: response.text };
  } catch (error) {
    return { success: false, error: error.message || "Unknown error" };
  }
}

async function respondFromAudioAndText(filePath, promptText) {
  try {
    const fileData = fs.readFileSync(filePath, { encoding: "base64" });
    const contents = [
      { text: promptText },
      { inlineData: { mimeType: "audio/mp3", data: fileData } }
    ];
    return await generateGeminiResponse(contents);
  } catch (error) {
    return { 
      success: false, 
      error: `Error processing audio file: ${error.message || "Unknown error"}` 
    };
  }
}
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
  const promptText = "Say hello world from Gemini!";
  const result = await respondFromPrompt(promptText);
  res.status(result.success ? 200 : 500).json(result);
});

app.get("/audio", async (req, res) => {
  const filePath = "uploads/Testing_gemini.mp3";
  const promptText = "Describe what people are saying around me";
  const result = await respondFromAudioAndText(filePath, promptText);
  res.status(result.success ? 200 : 500).json(result);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
