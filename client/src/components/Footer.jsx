import { Box, ButtonGroup, ButtonGroupProps, Heading, HStack, IconButton, Link, Stack, Text, VStack } from "@chakra-ui/react";
import * as React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
  <Box as="footer" mt={"40px"} role="contentinfo"  left={"0"} bottom={"0"} width={"100%"} py="5" px={{ base: '4', md: '8' }} bgColor={"teal"} color={"white"}>
  <VStack>
    <HStack>
      <IconButton as="a" href="#" aria-label="LinkedIn" color={"black"} icon={<FaLinkedin fontSize="20px" />} />
      <IconButton as="a" href="#" aria-label="GitHub" color={"black"} icon={<FaGithub fontSize="20px" />} />
      <IconButton as="a" href="#" aria-label="Twitter" color={"black"} icon={<FaTwitter fontSize="20px" />} />
    </HStack>
    <HStack>
    <Link href="#">Home</Link>
    <Link href="#">About</Link>
    <Link href="#">Find Rides</Link>
    <Link href="#">Post Rides</Link>
    <Link href="#">Contact Us</Link>
    </HStack>
    <Text fontFamily={"fantasy"}>Ride Share © 2022</Text>
  </VStack>
</Box>
  );
};

export default Footer;