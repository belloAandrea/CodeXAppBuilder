import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  Button,
  VStack,
  HStack,
  IconButton,
  useToast,
  Text,
} from "@chakra-ui/react";
import { MdSend, MdMic, MdFileUpload } from "react-icons/md";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

const ChatInterface = ({ sessionId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]); // Array for chat messages
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast(); // Toast for showing notifications

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/get-chat/${sessionId}`);
        const chatHistory = await response.json();
        setMessages(Array.isArray(chatHistory) ? chatHistory : []); // Ensure valid array
      } catch (error) {
        console.error("Error fetching chat history:", error);
        setMessages([]); // Handle error by defaulting to an empty array
      }
    };
    fetchChatHistory();
  }, [sessionId]);

  const handleSend = async () => {
    if (message.trim()) {
      setIsLoading(true);
      const newMessage = { text: message, sender: "user" };
      setMessages([...messages, newMessage]);
      setMessage("");

      try {
        // Send the message to the backend for AI processing
        const response = await fetch("http://localhost:3001/api/ai-response", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, message: newMessage.text }),
        });
        const data = await response.json();
        setMessages((prev) => [...prev, { text: data.aiResponse, sender: "ai" }]);
      } catch (error) {
        console.error("Failed to fetch AI response:", error);
        toast({
          title: "Error",
          description: "Failed to fetch AI response.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      setIsLoading(false);
    }
  };

  return (
    <Box w="80%" ml="20%" p={4} h="100vh" display="flex" flexDirection="column">
      <VStack align="stretch" spacing={4} flex="1">
        <Box h="70%" overflowY="scroll" p={4} bg="gray.100" borderRadius="md">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <Box
                key={index}
                mb={4}
                p={3}
                bg={msg.sender === "user" ? "blue.100" : "gray.100"}
                borderRadius="md"
              >
                <ReactMarkdown
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={materialDark}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {msg.text}
                </ReactMarkdown>
              </Box>
            ))
          ) : (
            <Text>No messages yet.</Text>
          )}
        </Box>

        <HStack>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            flex="1"
          />
          <IconButton
            icon={<MdSend />}
            colorScheme="blue"
            onClick={handleSend}
            isLoading={isLoading}
          />
          <IconButton
            icon={<MdMic />}
            colorScheme="green"
            onClick={() => toast({
              title: "Voice input coming soon!",
              status: "info",
              duration: 2000,
              isClosable: true,
            })}
          />
          <IconButton
            icon={<MdFileUpload />}
            colorScheme="purple"
            onClick={() => toast({
              title: "File upload coming soon!",
              status: "info",
              duration: 2000,
              isClosable: true,
            })}
          />
        </HStack>
      </VStack>
    </Box>
  );
};

export default ChatInterface;
