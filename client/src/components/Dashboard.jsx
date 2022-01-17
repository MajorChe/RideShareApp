import { ReactNode } from "react";
import { Link as ReachLink } from "react-router-dom";
import { useColorMode } from "@chakra-ui/color-mode";
import { MoonIcon, SunIcon, SettingsIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
} from "@chakra-ui/react";

const NavLink = ({ children }) => (
  <Text px={2} py={1} rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
  >
    {children}
  </Text>
);

export default function Dashboard() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box px={4}>
        <Flex h={20} alignItems={"center"} >
          <HStack spacing={1300} alignItems={"center"}>
            <Box>RideShare LOGO</Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <Link as={ReachLink} to="/"><NavLink>Find Ride</NavLink></Link>
              <Link as={ReachLink} to="/about"><NavLink>Post Ride</NavLink></Link>
              <Link as={ReachLink} to="/inbox"><NavLink>Inbox</NavLink></Link>
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                ml={4}
                mr={6}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Settings <SettingsIcon ml={6}/></MenuItem>
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          <Button onClick={() => toggleColorMode()} m="0.5rem">
                {colorMode === "dark" ? (<SunIcon color="orange.200" />) : (<MoonIcon color="blue.700" />)}
              </Button>
        </Flex>
      </Box>

      <Box p={4}>Dashboard Page</Box>
    </>
  );
}
