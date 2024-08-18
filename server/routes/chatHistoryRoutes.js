
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Save chat history
router.post('/save-chat', (req, res) => {
    const { sessionId, messages } = req.body;
    const filePath = path.join(__dirname, '../chat-history', `${sessionId}.json`);
    fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));
    res.status(200).json({ message: 'Chat history saved' });
});

// Retrieve chat history
router.get('/get-chat/:sessionId', (req, res) => {
    const { sessionId } = req.params;
    const filePath = path.join(__dirname, '../chat-history', `${sessionId}.json`);
    if (fs.existsSync(filePath)) {
        const messages = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        res.status(200).json(messages);
    } else {
        res.status(404).json({ error: 'Chat history not found' });
    }
});

module.exports = router;
