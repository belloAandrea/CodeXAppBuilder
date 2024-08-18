import React, { useState, useEffect } from "react";
import { Box, VStack, Button, Text, List, Spinner } from "@chakra-ui/react";
import ProjectTree from "./ProjectTree"; // Import the ProjectTree component
import io from "socket.io-client";

const Sidebar = ({ onNewChat, onSavedConversations, onSettings, onProjectSelect }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [fileTree, setFileTree] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // WebSocket for real-time updates
  useEffect(() => {
    const socket = io("http://localhost:3001");

    socket.on("file-created", (data) => {
      if (data.projectId === selectedProject) {
        setFileTree((prevTree) => [...prevTree, data.filePath]); // Update in real-time
      }
    });

    socket.on("file-modified", (data) => {
      // Handle file modifications if needed
    });

    return () => {
      socket.disconnect();
    };
  }, [selectedProject]);

  // Fetch the list of projects
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3001/api/projects");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
      setIsLoading(false);
    };
    fetchProjects();
  }, []);

  const handleProjectSelect = async (projectId) => {
    setSelectedProject(projectId);
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/api/projects/${projectId}/files`);
      const data = await response.json();
      setFileTree(data); // Set the hierarchical file and folder structure
    } catch (error) {
      console.error("Error fetching file tree:", error);
    }
    setIsLoading(false);

    if (onProjectSelect) {
      onProjectSelect(projectId);
    }
  };

  const handleFileClick = (filePath) => {
    console.log("File clicked:", filePath);
    // Implement file viewing/editing logic here
  };

  return (
    <Box w="20%" h="100vh" bg="gray.200" p={4} position="fixed" left={0} overflowY="auto">
      <VStack spacing={4} align="stretch">
        <Button onClick={onNewChat} colorScheme="blue" size="lg">
          New Chat
        </Button>
        <Button onClick={onSavedConversations} colorScheme="green" size="lg">
          Saved Conversations
        </Button>
        <Button onClick={onSettings} colorScheme="purple" size="lg">
          Settings
        </Button>

        <Text fontSize="2xl" fontWeight="bold" mt={6}>
          Projects
        </Text>

        {isLoading && <Spinner />}

        <List spacing={3}>
          {projects.map((project) => (
            <Button
              key={project.projectId}
              colorScheme="blue"
              variant={selectedProject === project.projectId ? "solid" : "outline"}
              onClick={() => handleProjectSelect(project.projectId)}
            >
              {project.projectId}
            </Button>
          ))}
        </List>

        {selectedProject && (
          <>
            <Text mt={4} fontSize="lg" fontWeight="bold">
              Files in {selectedProject}
            </Text>
            <ProjectTree nodes={fileTree} onFileClick={handleFileClick} />
          </>
        )}
      </VStack>
    </Box>
  );
};

export default Sidebar;
