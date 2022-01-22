import { Box, ButtonGroup, ButtonGroupProps, Heading, IconButton, Stack, Text } from "@chakra-ui/react";
import * as React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
  <Box as="footer" role="contentinfo" position={"fixed"} left={"0"} bottom={"0"} width={"100%"} py="12" px={{ base: '4', md: '8' }}>
    <Stack>
      <Stack direction="row" spacing="4" align="center" justify="space-between" w={"full"}>
        <Heading>RIDESHARE LOGO</Heading>
        <ButtonGroup variant="ghost" color="gray.600">
          <IconButton as="a" href="#" aria-label="LinkedIn" icon={<FaLinkedin fontSize="20px" />} />
          <IconButton as="a" href="#" aria-label="GitHub" icon={<FaGithub fontSize="20px" />} />
          <IconButton as="a" href="#" aria-label="Twitter" icon={<FaTwitter fontSize="20px" />} />
        </ButtonGroup>
      </Stack>
      <Text fontSize="sm" alignSelf={{ base: 'center', sm: 'start' }}>
        &copy; {new Date().getFullYear()} RIDESHARE, Inc. All rights reserved.
      </Text>
    </Stack>
  </Box>
  );
};

export default Footer;