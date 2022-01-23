import { Grid, GridItem, Tabs } from "@chakra-ui/react";
import { createContext, useState } from "react";
import Navbar from "../Navbar";
import Chat from "./Chat";
import Sidebar from "./Sidebar";

export const FriendContext = createContext();

const ChatHome = () => {
  const [friendList, setFriendList] = useState([]);
  return (
    <>
    <Navbar />
    <FriendContext.Provider value={{ friendList, setFriendList }}>
      <Grid templateColumns="repeat(10, 1fr)" h="100vh" as={Tabs}>
        <GridItem colSpan="3" borderRight="1px solid gray">
          <Sidebar />
        </GridItem>
        <GridItem colSpan="7">
          <Chat />
        </GridItem>
      </Grid>
    </FriendContext.Provider>
    </>
  );
};

export default ChatHome;