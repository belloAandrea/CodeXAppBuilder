const express = require("express");
const fs = require("fs");
const path = require("path");
const { ESLint } = require("eslint");
const router = express.Router();
const createZip = require("../createZip");

router.post("/save", async (req, res) => {
  const { fileName, fileContent } = req.body;

  // Lint the code before saving
  const eslint = new ESLint();
  const results = await eslint.lintText(fileContent);
  const formatter = await eslint.loadFormatter("stylish");
  const lintResultText = formatter.format(results);

  if (results.some((result) => result.errorCount > 0)) {
    // Return linting errors to the user
    return res
      .status(400)
      .json({ message: "Linting errors found", lintResultText });
  }

  const filePath = path.join(__dirname, "../projects", fileName);

  fs.writeFile(filePath, fileContent, (err) => {
    if (err) {
      console.error("Error saving file:", err);
      return res.status(500).json({ error: "Failed to save file" });
    }

    // Generate the ZIP file after saving
    const projectFolderPath = path.join(__dirname, "../projects");
    const zipFilePath = path.join(__dirname, "../zips/my-project.zip");
    createZip(projectFolderPath, zipFilePath);

    res.status(200).json({
      message: "File saved, ZIP created, and no linting errors found",
      downloadLink: `/download`,
    });
  });
});

module.exports = router;
