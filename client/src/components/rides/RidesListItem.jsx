import React from "react";
import { Link } from "react-router-dom";
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

function RidesListItem(props) {
  return (
    <>
      <Center>
        <VStack>
          <Box
            mt={5}
            w={"20rem"}
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

                <FormControl>
                  <Link
                    to={{
                      pathname: "/ride/" + props.ride_id,
                    }}
                  >
                    <Button
                      height="30px"
                      color={"white"}
                      _hover={{ bg: "teal.400" }}
                      width="250px"
                      bg={"teal"}
                      mt={2}
                      variant="outline"
                    >
                      View{" "}
                    </Button>
                  </Link>
                </FormControl>
              </VStack>
            </Box>
          </Box>
        </VStack>
      </Center>
    </>
  );
}

export default RidesListItem;
