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

app.get("/audio", async (req, res) => {
  // Hardcoded file path - make sure this file exists!
  const filePath = 'uploads/Testing_gemini.mp3';
  
  try {
    // Read the audio file data
    const fileData = fs.readFileSync(filePath, { encoding: "base64" });
    
    // Create the contents array for the API call
    const contents = [
      { text: "Describe this audio clip" },
      {
        inlineData: {
          mimeType: "audio/mp3",
          data: fileData,
        },
      },
    ];
    
    // Call Gemini API
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: contents,
    });
    
    res.json({
      success: true,
      data: response.text,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error processing audio file",
      error: error.toString(),
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
