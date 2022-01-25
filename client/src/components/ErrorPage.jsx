import { Box, Heading, Text, Button } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const ErrorPage = () => {
  const navigate = useNavigate();
  // useEffect(() => {
  //   setTimeout(() => {
  //     navigate("/")
  //   }, 3000);
  // },[])
  return (
    <>
      <Navbar />
      <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, #3d9ad5, #3d9ad5)"
        backgroundClip="text">
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text color={'gray.500'} mb={6}>
        The page you're looking for does not seem to exist.
      </Text>

      <Button
        colorScheme="#3d9ad5"
        bgGradient="linear(to-r, blue.200, blue.300, #3d9ad5)"
        color="white"
        variant="solid"
        onClick={() => navigate("/")}>
        Go to Home
      </Button>
    </Box>
    </>
  );
};

export default ErrorPage;
