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

const { GoogleGenAI } =  require("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API });
// ------------- ENDPOINTS ------------- //

// Basic route
app.get("/", async (req, res) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "Explain how AI works",
  });
  console.log(response.text);
});

// Example API route
app.get("/test", (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
      { id: 3, name: "Item 3" },
    ],
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
