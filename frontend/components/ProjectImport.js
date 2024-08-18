
import React, { useState } from 'react';
import { Box, VStack, Input, Button, Text } from '@chakra-ui/react';

const ProjectImport = ({ onStartProject }) => {
    const [file, setFile] = useState(null);

    const handleImportProject = () => {
        if (file) {
            onStartProject({ type: 'import', file });
        }
    };

    return (
        <Box>
            <VStack spacing={4}>
                <Input 
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <Button onClick={handleImportProject}>Import Project</Button>
            </VStack>
        </Box>
    );
};

export default ProjectImport;
