
import React, { useState } from 'react';
import { Box, VStack, Button } from '@chakra-ui/react';

const ProjectContinue = ({ onStartProject }) => {
    const handleContinueProject = () => {
        onStartProject({ type: 'continue' });
    };

    return (
        <Box>
            <VStack spacing={4}>
                <Button onClick={handleContinueProject}>Continue Your Project</Button>
            </VStack>
        </Box>
    );
};

export default ProjectContinue;
