import React, { useState, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import InitialChat from "../components/InitialChat";
import Sidebar from "../components/Sidebar";
import Setup from "../components/Setup";

function App() {
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [isNewChat, setIsNewChat] = useState(false);

  useEffect(() => {
    const checkSetup = async () => {
      const response = await fetch(`http://localhost:3001/api/check-setup`);
      const data = await response.json();
      setIsSetupComplete(data.isSetupComplete);
    };
    checkSetup();

    // Load saved chat history when the component mounts
    const savedChatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    setChatHistory(savedChatHistory);
  }, []);

  const handleNewChat = () => {
    console.log("New Chat started");
    setCurrentChat([]);
    setIsNewChat(true);
  };

  const handleSavedConversations = () => {
    console.log("Saved Conversations opened");
    setIsNewChat(false);
  };

  const handleSaveChat = () => {
    // Save current chat to local storage
    const updatedHistory = [...chatHistory, currentChat];
    setChatHistory(updatedHistory);
    localStorage.setItem("chatHistory", JSON.stringify(updatedHistory));
    console.log("Chat saved!");
  };

  const handleContinueChat = (chatIndex) => {
    // Continue from a saved chat
    const chatToContinue = chatHistory[chatIndex];
    setCurrentChat(chatToContinue);
    setIsNewChat(true);
  };

  return (
    <ChakraProvider>
      {isSetupComplete ? (
        <>
          <Sidebar
            onNewChat={handleNewChat}
            onSavedConversations={handleSavedConversations}
            onSettings={() => {}}
          />
          {isNewChat ? (
            <InitialChat />
          ) : (
            <div>
              <h2>Saved Conversations</h2>
              {chatHistory.length > 0 ? (
                chatHistory.map((chat, index) => (
                  <div key={index}>
                    <p>Chat {index + 1}</p>
                    <button onClick={() => handleContinueChat(index)}>
                      Continue Chat
                    </button>
                  </div>
                ))
              ) : (
                <p>No saved conversations available.</p>
              )}
            </div>
          )}
        </>
      ) : (
        <Setup onComplete={() => setIsSetupComplete(true)} />
      )}
    </ChakraProvider>
  );
}

export default App;
