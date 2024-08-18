
const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/download', (req, res) => {
  const zipFilePath = path.join(__dirname, '../zips/my-project.zip');
  res.download(zipFilePath, 'my-project.zip', (err) => {
    if (err) {
      console.error('Error downloading ZIP file:', err);
      res.status(500).send('Failed to download file');
    }
  });
});

module.exports = router;
