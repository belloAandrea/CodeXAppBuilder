
import React, { useState } from 'react';

const IdeaInputForm = ({ onSubmit }) => {
    const [idea, setIdea] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(idea);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="Describe your app idea..."
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default IdeaInputForm;
