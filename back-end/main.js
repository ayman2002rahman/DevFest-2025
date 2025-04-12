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

const { GoogleGenerativeAI } = require('@google/generative-ai');

// ------------- ENDPOINTS ------------- //

// Basic route
app.get("/", async (req, res) => {
  const geminiApiKey = process.env.GEMINI_API;
  const genAI = new GoogleGenerativeAI(geminiApiKey);  // init
  const modelList = await genAI.listModels();
  console.log("Available models:", modelList);

  // const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  // const prompt = "Write me a short poem about coding that rhymes.";

  // const result = await model.generateContent(prompt);
  // const response = await result.response;
  // const text = response.text();


  // res.json({ 
  //   success: true, 
  //   data: {
  //     prompt: prompt,
  //     response: text
  //   }
  // });
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
