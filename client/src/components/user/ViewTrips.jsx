import { Heading, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import Navbar from "../Navbar";
import TripCard from "./TripCard";

const ViewTrips = () => {
  return (
    <>
      <Navbar />
      <Heading mt={"50px"} textAlign={"center"}>Upcoming Trips</Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} mt={"50px"}>
      <TripCard />
      <TripCard />
      <TripCard />
      </SimpleGrid>
    </>
  );
};

export default ViewTrips;
