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
      { inlineData: { mimeType: "audio/mp3", data: fileData } },
    ];
    return await respondFromPrompt(contents);
  } catch (error) {
    return {
      success: false,
      error: `Error processing audio file: ${error.message || "Unknown error"}`,
    };
  }
}

async function respondFromImageAndText(filePath, promptText) {
  try {
    const fileData = fs.readFileSync(filePath, { encoding: "base64" });
    const contents = [
      { text: promptText },
      { inlineData: { mimeType: "image/jpeg", data: fileData } }, // Adjust mimeType if needed
    ];

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents,
    });

    return { success: true, data: response.text };
  } catch (error) {
    return {
      success: false,
      error: `Error processing image file: ${error.message || "Unknown error"}`,
    };
  }
}

async function respondFromVideoAndText(filePath, promptText) {
  try {
    const fileData = fs.readFileSync(filePath, { encoding: "base64" });
    const contents = [
      { text: promptText },
      { inlineData: { mimeType: "video/mp4", data: fileData } }, // Adjust mimeType as needed
    ];

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents,
    });

    return { success: true, data: response.text };
  } catch (error) {
    return {
      success: false,
      error: `Error processing video file: ${error.message || "Unknown error"}`,
    };
  }
}

// ------------- ENDPOINTS ------------- //
app.get("/", (req, res) => {
  res.send(`
    Hello World!<br>
    <a href="/text">Go to /text to see the text response</a><br>
    <a href="/audio">Go to /audio to see the audio response</a><br>
    <a href="/image">Go to /image to see the image response</a><br>
    <a href="/video">Go to /video to see the video response</a><br>

  `);
});

app.post("/text", async (req, res) => {
  const promptText = req.body.promptText;
  const result = await respondFromPrompt(promptText);
  res.status(result.success ? 200 : 500).json(result);
});

app.post("/audio", async (req, res) => {
  const filePath = "uploads/sample_audio.mp3";
  const promptText = "Describe what people are saying around me";
  const result = await respondFromAudioAndText(filePath, promptText);
  res.status(result.success ? 200 : 500).json(result);
});

app.post("/image", async (req, res) => {
  const filePath = "uploads/sample_image.jpg"; // replace with your test image path
  const promptText = "tell me about this image. concise";
  const result = await respondFromImageAndText(filePath, promptText);
  res.status(result.success ? 200 : 500).json(result);
});

app.post("/video", async (req, res) => {
  const filePath = "uploads/sample_video.mp4"; // replace with your test image path
  const promptText = "tell me about this video. concise";
  const result = await respondFromVideoAndText(filePath, promptText);
  res.status(result.success ? 200 : 500).json(result);
});

// Start server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});