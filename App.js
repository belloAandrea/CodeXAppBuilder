
import React, { useState } from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import CodexChainTheme from './theme/CodexChainTheme';
import IdeaInputForm from './components/IdeaInputForm';

const App = () => {
  const [stackSuggestion, setStackSuggestion] = useState('');

  const handleSuggest = (suggestion) => {
    setStackSuggestion(suggestion);
  };

  return (
    <ChakraProvider theme={CodexChainTheme}>
      <Box p={4}>
        <IdeaInputForm onSuggest={handleSuggest} />
      </Box>
    </ChakraProvider>
  );
};

export default App;
