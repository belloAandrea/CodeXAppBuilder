import React, { useState } from "react";
import { VStack, Button, Textarea, Box } from "@chakra-ui/react";

const IdeaInputForm = ({ onSuggest }) => {
  const [description, setDescription] = useState("");
  const [stackSuggestion, setStackSuggestion] = useState("");

  const handleSuggest = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/project/suggest",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ description }),
        }
      );

      const data = await response.json();
      setStackSuggestion(data.stackSuggestion);
      onSuggest(data.stackSuggestion);
    } catch (error) {
      console.error("Error generating stack suggestion:", error);
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      <Textarea
        placeholder="Describe your app or dapp idea..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button onClick={handleSuggest} colorScheme="blue">
        Suggest Stack
      </Button>
      {stackSuggestion && (
        <Box mt={4} p={4} borderWidth="1px" borderRadius="md">
          {stackSuggestion}
        </Box>
      )}
    </VStack>
  );
};

export default IdeaInputForm;
