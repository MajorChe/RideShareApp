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

const Links = ["Find Ride", "Post Ride", "Sign In", "Register"];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box px={4}>
        <Flex h={20} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing="1300px">
            <Box>RideShare LOGO</Box>

            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
              <Button onClick={() => toggleColorMode()} m="1rem">
                {colorMode === "dark" ? (
                  <SunIcon color="orange.200" />
                ) : (
                  <MoonIcon color="blue.700" />
                )}
              </Button>
            </HStack>
          </HStack>
        </Flex>
      </Box>

      <Box p={4}>Main Content Here</Box>
    </>
  );
}
