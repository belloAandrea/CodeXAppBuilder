import React, { useState } from "react";
import {
  Box,
  VStack,
  Text,
  Button,
  Input,
  Spinner,
  Select,
} from "@chakra-ui/react";
import ChatInterface from "./ChatInterface"; // Import the chat interface component

const InitialChat = () => {
  const [projectName, setProjectName] = useState("");
  const [stack, setStack] = useState("");
  const [projectId, setProjectId] = useState(null);
  const [isIdeaLoading, setIsIdeaLoading] = useState(false);

  const handleProjectIdeaSubmit = async () => {
    if (projectName.trim() && stack) {
      setIsIdeaLoading(true);
      try {
        const response = await fetch("http://localhost:3001/api/start-project", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ projectName, stack }),
        });
        const data = await response.json();
        setIsIdeaLoading(false);
        if (response.ok) {
          setProjectId(data.projectId); // Once the project is created, set the projectId
        } else {
          console.error("Failed to start project:", data.message);
        }
      } catch (error) {
        console.error("Error starting project:", error);
      }
    } else {
      console.error("Project name and stack are required.");
    }
  };

  const handleStackChange = (e) => {
    setStack(e.target.value);
  };

  // Render ChatInterface once project is created
  return (
    <Box w="100%" maxW="lg" mx="auto" mt={8} p={6} border="1px solid" borderColor="gray.300" borderRadius="md" bg="white" boxShadow="md">
      <VStack spacing={6} align="stretch">
        {!projectId ? (
          <>
            <Text fontSize="2xl" fontWeight="bold" color="gray.700">
              Start a New Project
            </Text>
            <Input
              placeholder="Enter project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              size="lg"
              focusBorderColor="blue.500"
              borderRadius="md"
            />
            <Select
              placeholder="Select project stack"
              value={stack}
              onChange={handleStackChange}
              size="lg"
              focusBorderColor="blue.500"
              borderRadius="md"
            >
              <option value="Next.js">Next.js</option>
              <option value="React.js">React.js</option>
              <option value="Node.js/Express">Node.js/Express</option>
              <option value="MERN">MERN</option>
            </Select>
            <Button
              colorScheme="blue"
              size="lg"
              onClick={handleProjectIdeaSubmit}
              isDisabled={isIdeaLoading}
            >
              {isIdeaLoading ? <Spinner size="sm" /> : "Submit Idea"}
            </Button>
          </>
        ) : (
          // After project creation, display the chat interface
          <>
            <Text fontSize="lg" fontWeight="bold" color="gray.700">
              Project Created: {projectName} ({stack})
            </Text>
            <Text fontSize="md" color="gray.500">
              Now you can add features, routes, or modify files.
            </Text>
            <ChatInterface sessionId={projectId} /> {/* Pass projectId as sessionId */}
          </>
        )}
      </VStack>
    </Box>
  );
};

export default InitialChat;
