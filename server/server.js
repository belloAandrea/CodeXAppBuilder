const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Enable CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(bodyParser.json());

app.use("/api", require("./routes/api"));

const users = {}; // In-memory user store for demonstration purposes
const projects = {}; // In-memory project store
const apiKeys = {}; // In-memory API key store
const apiLogs = {}; // In-memory API logs store
const secretKey = process.env.SECRET_KEY || "my_super_secret_key";
const openaiApiKey = process.env.OPENAI_API_KEY;

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

// WebSocket connection handling
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  // Handle chat requests using OpenAI
  socket.on("chat_request", async (data) => {
    const { model, prompt, temperature, max_tokens } = data;

    try {
      const response = await axios.post(
        OPENAI_API_URL,
        {
          model: model || "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          temperature: temperature || 0.7,
          max_tokens: max_tokens || 150,
        },
        {
          headers: {
            "Authorization": `Bearer ${openaiApiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      const aiMessage = response.data.choices[0].message.content;

      // Emit the AI-generated response back to the frontend
      socket.emit("chat_response", { aiMessage });
    } catch (error) {
      console.error(
        "OpenAI API error:",
        error.response ? error.response.data : error.message
      );
      socket.emit("error", {
        message: "Failed to fetch response from OpenAI API.",
      });
    }
  });

  // Additional WebSocket event handling...
});

// Other Express routes...

server.listen(3001, () => {
  console.log(`Server running on http://localhost:3001`);
});
