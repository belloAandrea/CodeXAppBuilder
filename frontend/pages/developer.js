import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  VStack,
  Text,
  HStack,
  Code,
  Link,
} from "@chakra-ui/react";

const Developer = () => {
  const [apiKey, setApiKey] = useState("");
  const [generatedKey, setGeneratedKey] = useState("");
  const [error, setError] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [query, setQuery] = useState("");
  const [documentation, setDocumentation] = useState(`
### Codex API Documentation

**Base URL:** \`/codex\`

**Endpoints:**

- **POST** \`/codex/query\` - Query the Codex API
  - **Headers:**
    - \`x-api-key\`: Your API key
  - **Body:**
    - \`query\`: The text query to send to the AI
  - **Response:**
    - \`aiResponse\`: The AI's response to your query
    - Example:
      \`\`\`
      {
        "aiResponse": "Codex API Response for query: \"Your query\""
      }
      \`\`\`

**Rate Limiting:** 100 requests per 15 minutes
    `);

  const handleGenerateApiKey = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3001/api/generate-api-key", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.ok) {
      setGeneratedKey(data.apiKey);
    } else {
      setError(data.message);
    }
  };

  const handleTestApi = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3001/codex/query", {
      method: "POST",
      headers: {
        "x-api-key": generatedKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });
    const data = await response.json();
    if (response.ok) {
      setApiResponse(data.aiResponse);
    } else {
      setError(data.message);
    }
  };

  return (
    <Box
      w="100%"
      maxW="md"
      mx="auto"
      mt={8}
      p={4}
      border="1px solid"
      borderColor="gray.300"
      borderRadius="md"
    >
      <VStack spacing={4}>
        <Text fontSize="xl" fontWeight="bold">
          Developer Section
        </Text>
        <Text>Generate and manage your API keys below:</Text>
        <Button onClick={handleGenerateApiKey}>Generate API Key</Button>
        {generatedKey && (
          <HStack>
            <Text>Your API Key:</Text>
            <Code>{generatedKey}</Code>
          </HStack>
        )}
        {error && <Text color="red.500">{error}</Text>}

        <Text mt={8} fontSize="lg" fontWeight="bold">
          API Documentation
        </Text>
        <Box
          w="100%"
          p={4}
          bg="gray.100"
          borderRadius="md"
          fontSize="sm"
          whiteSpace="pre-wrap"
        >
          {documentation}
        </Box>

        <Text mt={8} fontSize="lg" fontWeight="bold">
          Download SDK
        </Text>
        <Link href="/sdk/codex-sdk.js" download>
          Download JavaScript SDK
        </Link>

        <Text mt={8} fontSize="lg" fontWeight="bold">
          API Testing Console
        </Text>
        <Input
          placeholder="Enter your query here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={handleTestApi} isDisabled={!generatedKey}>
          Test API
        </Button>
        {apiResponse && (
          <Box mt={4} p={4} bg="gray.100" borderRadius="md">
            <Text>API Response:</Text>
            <Code>{apiResponse}</Code>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default Developer;
