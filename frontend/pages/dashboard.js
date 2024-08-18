import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  Text,
  HStack,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

const Dashboard = () => {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchLogs = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/api/logs", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setLogs(data);
      } else {
        console.error("Failed to fetch logs:", data.message);
      }
    };
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter(
    (log) => filter === "all" || log.status === filter
  );

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
          API Usage Dashboard
        </Text>
        <HStack spacing={4}>
          <Text>Filter by Status:</Text>
          <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="success">Success</option>
            <option value="error">Error</option>
          </Select>
        </HStack>
        <Table variant="simple" size="sm" mt={4}>
          <Thead>
            <Tr>
              <Th>Timestamp</Th>
              <Th>Endpoint</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredLogs.map((log, index) => (
              <Tr key={index}>
                <Td>{log.timestamp}</Td>
                <Td>{log.endpoint}</Td>
                <Td>{log.status}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Box>
  );
};

export default Dashboard;
