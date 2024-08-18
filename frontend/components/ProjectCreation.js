
import React, { useState } from 'react';
import { Box, VStack, Input, Button, Textarea } from '@chakra-ui/react';

const ProjectCreation = ({ onStartProject }) => {
    const [idea, setIdea] = useState('');

    const handleCreateProject = () => {
        if (idea.trim()) {
            onStartProject({ type: 'create', idea });
        }
    };

    return (
        <Box>
            <VStack spacing={4}>
                <Textarea 
                    placeholder="Describe your project idea..."
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                />
                <Button onClick={handleCreateProject}>Start Project</Button>
            </VStack>
        </Box>
    );
};

export default ProjectCreation;
