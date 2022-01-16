import { ReactNode } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/color-mode";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link as ReachLink } from "react-router-dom";

const NavLink = ({ children }) => (
  <Link px={2} py={1} rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
  >
    {children}
  </Link>
);

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box px={4}>
        <Flex h={24} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing="800px">
            <Box>RideShare LOGO</Box>

            <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
              
              <Link as={ReachLink} to="/"><NavLink>Find Ride</NavLink></Link>
              <Link as={ReachLink} to="/"><NavLink>Post Ride</NavLink></Link>
              <Link as={ReachLink} to="/login"><NavLink>Login</NavLink></Link>
              <Link as={ReachLink} to="/register"><NavLink>Register</NavLink></Link>

              <Button onClick={() => toggleColorMode()} m="1rem">
                {colorMode === "dark" ? (<SunIcon color="orange.200" />) : (<MoonIcon color="blue.700" />)}
              </Button>

            </HStack>
          </HStack>
        </Flex>
      </Box>
    </>
  );
}
