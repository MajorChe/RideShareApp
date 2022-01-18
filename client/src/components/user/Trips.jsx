import { Button, ButtonGroup, Flex, Heading } from "@chakra-ui/react";
import React from "react";
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
          <Button onClick={() => navigate("/trips/view")}>View Trips</Button>
          <Button onClick={() => navigate("/about")}>Approve Ride</Button>
          <Button onClick={() => navigate("/settings")}>Completed Rides</Button>
        </ButtonGroup>
      </Flex>
    </>
  );
};

export default Trips;
