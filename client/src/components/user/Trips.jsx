import { Button, ButtonGroup, Flex, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const Trips = () => {
  const navigate = useNavigate();
   
  return (
    <>
      <Navbar />
      <Heading textAlign={"center"} fontSize={"4xl"} pt={50} fontWeight={"bold"} >Your Trips</Heading>
      <Flex justifyContent={"center"} mt={"50px"}>
        <ButtonGroup>
          <Button onClick={() => navigate("/trips/view")}>View Rides</Button>
          <Button onClick={() => navigate("/trips/postings")}>View Ride Postings</Button>
          <Button onClick={() => navigate("/settings")}>Ride History</Button>
        </ButtonGroup>
      </Flex>
    </>
  );
};

export default Trips;
