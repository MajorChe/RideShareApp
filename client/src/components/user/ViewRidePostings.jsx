import React from "react";
import Navbar from "../Navbar";
import PostRideCard from "./PostRideCard";
import { Heading, SimpleGrid } from "@chakra-ui/react";

const ViewRidePostings = () => {
  return (
    <>
      <Navbar />
      <Heading mt={"50px"} textAlign={"center"}>Your Ride Postings</Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} mt={"50px"}>
      <PostRideCard id ={"1"}/>
      {/* <PostRideCard id ={"2"}/>
      <PostRideCard id ={"3"}/> */}
      </SimpleGrid>
    </>
  );
};

export default ViewRidePostings;
