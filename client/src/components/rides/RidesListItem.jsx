import React, { useContext } from "react";
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
import { AccountContext } from "../hooks/AccountContext";

const RidesListItem = (props) => {
  const {user} = useContext(AccountContext);
  const navigate = useNavigate();
  return (
    <>
        <VStack align={"center"}>
          <Box
            mt={5}
            height={"36rem"}
            w={"24rem"}
            boxShadow="dark-lg"
            p={8}
            rounded="md"
            bgColor={"white"}
            color={"black"}
            
          >
              <VStack>
                {props.owner_id === user.id ? <Text fontWeight={"bold"} fontSize={"xl"} color={"red"}>YOUR RIDE</Text> : <Text fontWeight={"bold"} fontSize={"xl"} color={"white"}>BOOK RIDE</Text>}
                <Image
                  borderRadius="md"
                  width={"280px"}
                  height={"180px"}
                  src={props.ride_image}
                  alt={"Car"}
                  mb={4}
                  pos={"relative"}
                />
                <Text fontSize={"xl"}><b>Origin </b></Text>
                <Text fontSize={"xl"}>{props.origin}</Text>
                <Text fontSize={"xl"}><b>Destination </b></Text>
                <Text fontSize={"xl"}>{props.destination}</Text>
                <HStack>
                  <Text fontSize={"xl"}><b>Seats: </b>{props.available_seats}</Text>
                  <Text fontSize={"xl"}><b>Cost: </b>${props.cost}</Text>
                </HStack>
                <HStack>
                  <Text fontWeight={"small"} fontSize={"xl"}>
                    <CalendarIcon />{" "}
                    <Moment format="D MMM YYYY">{props.date_of_ride}</Moment>
                  </Text>
                  <Text fontWeight={"small"} fontSize={"xl"}>
                    <TimeIcon /> {props.time_of_ride}
                  </Text>
                </HStack>
                  <Button onClick={() => navigate(`/ride/${props.ride_id}`)} colorScheme="#3d9ad5" bgGradient="linear(to-r, blue.300, blue.400, blue.600)" w={"200px"} color={"white"}>
                    VIEW
                  </Button>
              </VStack>
          </Box>
        </VStack>
    </>
  );
};

export default RidesListItem;
