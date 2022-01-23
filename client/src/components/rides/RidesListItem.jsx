import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Moment from "react-moment";
import {
  Box,
  Button,
  Center,
  VStack,
  FormControl,
  Image,
  Text,
  HStack,
} from "@chakra-ui/react";

import { CalendarIcon, TimeIcon } from "@chakra-ui/icons";

const RidesListItem = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <Center>
        <VStack>
          <Box
            mt={5}
            w={"22rem"}
            boxShadow="dark-lg"
            p={8}
            rounded="md"
            bgColor={"white"}
            color={"black"}
          >
            <Box>
              <VStack>
                <Image
                  borderRadius="md"
                  boxSize="230px"
                  src={props.ride_image}
                  alt={"Car"}
                  mb={4}
                  pos={"relative"}
                />
                <h2>
                  <b>Origin </b>
                </h2>
                <h2>{props.origin}</h2>
                <h2>
                  <b>Destination </b>
                </h2>
                <h2>{props.destination}</h2>
                <HStack>
                  <h2>
                    <b>Seats </b>
                    {props.available_seats}
                  </h2>
                  <h2>
                    <b>Cost: </b>${props.cost}
                  </h2>
                </HStack>
                <HStack>
                  <Text fontWeight={"small"}>
                    <CalendarIcon />{" "}
                    <Moment format="D MMM YYYY">{props.date_of_ride}</Moment>
                  </Text>
                  <Text fontWeight={"small"}>
                    <TimeIcon /> {props.time_of_ride}
                  </Text>
                </HStack>
                  <Button onClick={() => navigate(`/ride/${props.ride_id}`)} bgColor={"teal"} w={"200px"} color={"white"}>
                    VIEW
                  </Button>
              </VStack>
            </Box>
          </Box>
        </VStack>
      </Center>
    </>
  );
};

export default RidesListItem;
