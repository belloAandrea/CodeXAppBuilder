import React, { useState, useEffect } from "react";
import { Box, Input, Button, VStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch("http://localhost:3001/api/profile", {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setUsername(data.username);
        setDisplayName(data.displayName || "");
      } else {
        setError(data.message);
        router.push("/login");
      }
    };

    fetchProfile();
  }, [router]);

  const handleUpdateProfile = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3001/api/update-profile", {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ displayName, password }),
    });
    const data = await response.json();
    if (response.ok) {
      setSuccess("Profile updated successfully!");
      setPassword("");
    } else {
      setError(data.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
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
      {error ? (
        <Text color="red.500">{error}</Text>
      ) : (
        <VStack spacing={4}>
          <Text>Welcome, {username}</Text>
          <Input
            placeholder="Display Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <Input
            placeholder="New Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleUpdateProfile}>Update Profile</Button>
          {success && <Text color="green.500">{success}</Text>}
          <Button onClick={handleLogout}>Logout</Button>
        </VStack>
      )}
    </Box>
  );
};

export default Profile;
