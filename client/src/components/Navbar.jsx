import { ReactNode, useContext } from "react";
import {
  Box,
  Button,
  Menu,MenuButton,Avatar,MenuList,MenuItem,
  Flex,Stack,
  HStack,useDisclosure,IconButton,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/color-mode";
import { MoonIcon, SunIcon, SettingsIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link as ReachLink } from "react-router-dom";
import { AccountContext } from "./hooks/AccountContext";
import axios from "axios";
import { useNavigate } from "react-router";

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

const NavLinks = () => {
  const navigate = useNavigate()
  const {user, setUser} = useContext(AccountContext)
  return (
    <>
      <Link as={ReachLink} to="/rides"><NavLink>Find Ride</NavLink></Link>
      <Link as={ReachLink} to="/postRide"><NavLink>Post Ride</NavLink></Link>
      {!user.loggedIn && <Link as={ReachLink} to="/login"><NavLink>Login</NavLink></Link>}
      {!user.loggedIn && <Link as={ReachLink} to="/register"><NavLink>Register</NavLink></Link>}
      {user.loggedIn && <Link as={ReachLink} to="/inbox"><NavLink>Inbox</NavLink></Link>}
      {user.loggedIn && 
      <Flex alignItems={"center"}> 
        <Menu>
          <MenuButton as={Button} rounded={"full"} variant={"link"} ml={4} mr={6} cursor={"pointer"} minW={0} >
            <Avatar size={"sm"} src={"https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"} />
          </MenuButton>
          <MenuList>
          <MenuItem onClick={() => navigate("/settings")}>Settings <SettingsIcon ml={6}/></MenuItem>
          <MenuItem onClick={async() => {
             await axios.post("/auth/logout").then(() => {
            setUser({loggedIn: false})
            navigate("/login");
            })
            }}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>}              
    </>
  );
}

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={20} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack display={"flex"} alignItems={"center"} justifyContent={"space-between"} flexGrow={"2"}>
            <Box >RideShare LOGO</Box>

            <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
              
              <NavLinks />
              <Button onClick={() => toggleColorMode()} m="1rem">
                {colorMode === "dark" ? (<SunIcon color="orange.200" />) : (<MoonIcon color="blue.700" />)}
              </Button>
            </HStack>
          </HStack>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}><NavLinks /></Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
