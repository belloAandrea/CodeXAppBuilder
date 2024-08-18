import React, { useState } from "react";
import { Box, Input, Button, VStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    const response = await fetch("http://localhost:3001/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (response.ok) {
      router.push("/login");
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
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleRegister}>Register</Button>
        {error && <Text color="red.500">{error}</Text>}
      </VStack>
    </Box>
  );
};

export default Register;
