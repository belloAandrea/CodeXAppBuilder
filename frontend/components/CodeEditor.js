
import React, { useState, useEffect } from 'react';

const CodeEditor = ({ code, onChange }) => {
    const [content, setContent] = useState(code);

    useEffect(() => {
        // WebSocket connection for real-time updates
        const ws = new WebSocket('ws://localhost:8080');
        ws.onmessage = (message) => {
            setContent(message.data);
            onChange(message.data);
        };

        return () => {
            ws.close();
        };
    }, []);

    const handleChange = (e) => {
        setContent(e.target.value);
        onChange(e.target.value);
    };

    return (
        <textarea value={content} onChange={handleChange} rows={20} cols={100} />
    );
};

export default CodeEditor;
