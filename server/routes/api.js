const express = require("express");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");
const { OpenAI } = require("openai");

const router = express.Router();

// Load existing .env file
const envFilePath = path.join(__dirname, ".env");
const envConfig = dotenv.parse(fs.readFileSync(envFilePath));

// In-memory store for projects
const projects = {};

// Function to initialize or re-initialize OpenAI API instance
let openai;
const initializeOpenAI = (apiKey) => {
  openai = new OpenAI({
    apiKey,
  });
};

// Initialize OpenAI API with the key from environment variables (if present)
if (envConfig.OPENAI_API_KEY) {
  initializeOpenAI(envConfig.OPENAI_API_KEY);
}

// API route to save environment variables
router.post("/save-env", (req, res) => {
  const { OPENAI_API_KEY } = req.body;
  if (OPENAI_API_KEY) {
    envConfig.OPENAI_API_KEY = OPENAI_API_KEY;
    const updatedEnv = Object.keys(envConfig)
      .map((key) => `${key}=${envConfig[key]}`)
      .join("");
    fs.writeFileSync(envFilePath, updatedEnv);
    initializeOpenAI(OPENAI_API_KEY); // Re-initialize OpenAI with the new API key
    res.status(200).json({ message: "Environment variables saved" });
  } else {
    res.status(400).json({ message: "Missing environment variable" });
  }
});

// API route to check if setup is complete
router.get("/check-setup", (req, res) => {
  const isSetupComplete = !!envConfig.OPENAI_API_KEY;
  res.status(200).json({ isSetupComplete });
});

router.post("/start-project", async (req, res) => {
  const { idea } = req.body;

  if (!idea) {
    return res.status(400).json({ message: "Project idea is required" });
  }

  const projectId = uuidv4(); // Generate a unique project ID

  const prompt = `
    Based on the following description, please provide the best tech stack, including programming languages, frameworks, and environment settings. 
    Please format your response as a single line or short paragraph:
    "${idea}"
  `;

  const response = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-4o-mini",
  });

  const suggestedStack = response.choices[0].message.content;

  // Save the project to the in-memory store
  projects[projectId] = { idea, stack: suggestedStack };

  res.status(200).json({
    projectId,
    stack: suggestedStack,
  });
});

router.post("/generate-code", async (req, res) => {
  const { projectId, codeRequest } = req.body;

  if (!projectId || !codeRequest) {
    return res
      .status(400)
      .json({ message: "Project ID and code request are required" });
  }

  const project = projects[projectId];
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  const prompt = `
    Based on the following description, please provide the code snippet that fulfills the requirements, just the code, no intro or instructions needed:
    "${codeRequest}"
  `;

  const response = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-4o-mini",
  });

  const generatedCode = response.choices[0].message.content;

  // Save generated code to a file (mocked here)
  const codeFilePath = path.join(__dirname, "../projects", `${projectId}.zip`);
  fs.writeFileSync(codeFilePath, generatedCode);

  res.status(200).json({
    codeSnippet: generatedCode,
  });
});

// Route to serve files
router.get("/download/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, "../../server/projects", fileName);

  console.log("Download requested for:", filePath);

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    res.download(filePath); // This will prompt the download
  } else {
    res.status(404).send("File not found");
  }
});

module.exports = router;
