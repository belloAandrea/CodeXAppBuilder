
import { extendTheme } from '@chakra-ui/react';

const CodexChainTheme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: 'Arial, sans-serif',
        bg: 'gray.100',
        color: 'gray.800',
      },
    },
  },
});

export default CodexChainTheme;
