import React, { useState } from "react";
import { Box, VStack, Text, List, ListItem, IconButton } from "@chakra-ui/react";
import { MdFolder, MdFolderOpen, MdInsertDriveFile } from "react-icons/md";

const ProjectTree = ({ nodes = [], onFileClick }) => { // Ensure nodes is initialized as an empty array
  const [openFolders, setOpenFolders] = useState({});

  // Toggle folder open/close
  const toggleFolder = (folderName) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folderName]: !prev[folderName],
    }));
  };

  // Recursive component to render files and folders
  const renderFileTree = (nodes = [], parentPath = "") => { // Ensure nodes is always an array
    return (
      <List spacing={3}>
        {Array.isArray(nodes) && nodes.map((node, index) => { // Check if nodes is an array before mapping
          const fullPath = `${parentPath}/${node.name}`;
          if (node.type === "folder") {
            return (
              <ListItem key={index}>
                <Box display="flex" alignItems="center">
                  <IconButton
                    icon={openFolders[fullPath] ? <MdFolderOpen /> : <MdFolder />}
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFolder(fullPath)}
                  />
                  <Text
                    ml={2}
                    cursor="pointer"
                    onClick={() => toggleFolder(fullPath)}
                  >
                    {node.name}
                  </Text>
                </Box>
                {openFolders[fullPath] && (
                  <Box ml={6}>
                    {renderFileTree(node.children, fullPath)}
                  </Box>
                )}
              </ListItem>
            );
          } else {
            return (
              <ListItem key={index} cursor="pointer" onClick={() => onFileClick(fullPath)}>
                <Box display="flex" alignItems="center">
                  <IconButton icon={<MdInsertDriveFile />} size="sm" variant="ghost" />
                  <Text ml={2}>{node.name}</Text>
                </Box>
              </ListItem>
            );
          }
        })}
      </List>
    );
  };

  return (
    <VStack align="stretch" spacing={4}>
      <Text fontSize="2xl" fontWeight="bold">
        Project Files
      </Text>
      {renderFileTree(nodes)}
    </VStack>
  );
};

export default ProjectTree;
