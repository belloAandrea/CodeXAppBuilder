import React, { useState } from "react";
import { Box, VStack, Input, Button, Text } from "@chakra-ui/react";

const Setup = ({ onComplete }) => {
  const [openaiApiKey, setOpenaiApiKey] = useState("");

  const handleSetupComplete = async () => {
    if (openaiApiKey.trim()) {
      // Send the API key to the backend to save in the .env file
      const response = await fetch("http://localhost:3001/api/save-env", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ OPENAI_API_KEY: openaiApiKey }),
      });
      if (response.ok) {
        onComplete();
      } else {
        console.error("Failed to save environment variables");
      }
    }
  };

  return (
    <Box
      w="100%"
      maxW="md"
      mx="auto"
      mt={8}
      p={6}
      border="1px solid"
      borderColor="gray.300"
      borderRadius="md"
      bg="white"
      boxShadow="md"
    >
      <VStack spacing={6}>
        <Text fontSize="2xl" fontWeight="bold">
          Initial Setup
        </Text>
        <Text>Please enter your OpenAI API key:</Text>
        <Input
          placeholder="OpenAI API Key"
          value={openaiApiKey}
          onChange={(e) => setOpenaiApiKey(e.target.value)}
          size="lg"
          focusBorderColor="blue.500"
          borderRadius="md"
        />
        <Button colorScheme="blue" size="lg" onClick={handleSetupComplete}>
          Save and Continue
        </Button>
      </VStack>
    </Box>
  );
};

export default Setup;
