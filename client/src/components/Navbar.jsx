import { ReactNode, useContext } from "react";
import {
  Box,
  Button,
  Menu,MenuButton,Avatar,MenuList,MenuItem,
  Flex,Stack,
  HStack,useDisclosure,IconButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/color-mode";
import { MoonIcon, SunIcon, SettingsIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { AccountContext } from "./hooks/AccountContext";
import axios from "axios";
import { useNavigate } from "react-router";

const NavLink = ({ children }) => (
  <Text px={2} py={1} rounded={"md"} fontSize={"20px"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("white", "gray.700"),
    }}
  >
    {children}
  </Text>
);

const NavLinks = () => {
  const navigate = useNavigate();
  const {user, setUser} = useContext(AccountContext);
  return (
    <>
      <Link to="/rides"><NavLink>Find Ride</NavLink></Link>
      <Link to="/postRide"><NavLink>Post Ride</NavLink></Link>
      {!user.loggedIn && <Link to="/login"><NavLink>Login</NavLink></Link>}
      {!user.loggedIn && <Link to="/register"><NavLink>Register</NavLink></Link>}
      {user.loggedIn && <Link to="/inbox"><NavLink>Inbox</NavLink></Link>}
      {user.loggedIn && 
      <Flex alignItems={"center"}> 
        <Menu>
          <MenuButton ml={4} mr={6} cursor={"pointer"} minW={0} >
            <Avatar size={"sm"} src={"https://bit.ly/ryan-florence"} />
            <Text  fontWeight={"medium"}>{user.name}</Text>
          </MenuButton>
          <MenuList>
          <MenuItem onClick={() => navigate("/settings")} color={"teal"}>Settings <SettingsIcon ml={6}/></MenuItem>
          <MenuItem color={"red"} onClick={async() => {
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
      <Box bg={useColorModeValue('teal', 'gray.900')} px={4} color={"white"}>
        <Flex h={20} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack display={"flex"} alignItems={"center"} justifyContent={"space-between"} flexGrow={"2"}>
            <Flex>
              <Link to="/"><NavLink>RIDESHARE LOGO</NavLink></Link>
              <Link ml={"30px"} to="/trips"><NavLink>Trips</NavLink></Link>
            </Flex>
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
            <Stack as={'nav'} spacing={4}>
              <NavLinks />
              <Button onClick={() => toggleColorMode()} m="1rem">
                {colorMode === "dark" ? (<SunIcon color="orange.200" />) : (<MoonIcon color="blue.700" />)}
              </Button>  
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
