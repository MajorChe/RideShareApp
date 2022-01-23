import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AccountContext } from "../hooks/AccountContext";
import axios from "axios";
import {
  Box,
  Button,
  Center,
  VStack,
  Flex,
  FormControl,
  Image,
  InputGroup,
  NumberInput,
  Text,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Heading,
} from "@chakra-ui/react";
import Moment from "react-moment";
import Navbar from "../Navbar";
import { CalendarIcon, PhoneIcon, TimeIcon } from "@chakra-ui/icons";
function Ride({ props }) {
  let { ride_id } = useParams();
  console.log(ride_id);
  const [rides, setRides] = useState({});
  const [seats, setSeats] = useState("1");
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [successInfo, setSuccessInfo] = useState([]);
  const { user } = useContext(AccountContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/ride", {
        params: {
          id: ride_id,
        },
      })
      .then((res) => {
        setRides(res.data);
      });
  }, []);

  const book = () => {
    if (!user.loggedIn) {
      navigate("/login");
    }
    setLoading(true);
    axios
      .put("/book/update", {
        params: {
          ride_id: ride_id,
          available_seats: rides.available_seats - seats,
        },
      })
      .then((res) => {
        console.log("new booking", res.data);
        axios
          .post("/book/new", {
            params: {
              rider_id: user.id,
              ride_id: ride_id,
              seats: seats,
            },
          })
          .then((res) => {
            setLoading(false);
            console.log("rides", res.data);
            setSuccessful(true);
            setSuccessInfo(res.data);
          })
          .catch(() => {
            setLoading(false);
          });
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const closeEvent = () => {
    setSuccessful(false);
    navigate("/trips/view");
  };
  return (
    <>
      <Navbar />
      <Center>
        <VStack>
          <Text fontSize="50px" mt={5} mb={5}>
            RIDE DETAILS
          </Text>
          <Box
            mt={5}
            w={"60rem"}
            boxShadow="dark-lg"
            p={8}
            rounded="md"
            bg="white"
          >
            <Flex direction={"row"} mt={10} justifyContent={"space-between"}>
              <VStack textAlign={"left"} spacing={5}>
                <Image
                  borderRadius="2xl"
                  boxSize="270px"
                  src={rides.ride_image}
                  alt={"Car"}
                  mb={4}
                  pos={"relative"}
                />
                <Flex direction={"column"} ml={30} mt={5} spacing={5}>
                  <Text fontWeight={"small"}>
                    <CalendarIcon />{" "}
                    <Moment format="D MMM YYYY">{rides.date_of_ride}</Moment>
                  </Text>
                  <Text fontWeight={"small"}>
                    <TimeIcon /> {rides.time_of_ride}
                  </Text>
                </Flex>
              </VStack>
              <Box>
                <VStack spacing={5} textAlign={"start"} mr={5}>
                  <h2>
                    <b>Origin </b>
                  </h2>
                  <h2>{rides.origin}</h2>
                  <h2>
                    <b>Destination </b>
                  </h2>
                  <h2>{rides.destination}</h2>
                  <HStack>
                    <h2>
                      <b>Seats </b>
                    </h2>
                    <FormControl>
                      <InputGroup>
                        <NumberInput
                          size="sm"
                          maxW={16}
                          defaultValue={1}
                          min={1}
                          onChange={(seats) => setSeats(seats)}
                          value={seats}
                          max={rides.available_seats}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </InputGroup>
                    </FormControl>
                  </HStack>
                  <Text fontWeight={"bold"}>Cost $:{rides.cost}</Text>
                </VStack>
              </Box>

              <VStack>
                <Image
                  borderRadius="full"
                  boxSize="270px"
                  src={rides.avatar}
                  alt={"Profile picture"}
                  mb={4}
                  pos={"relative"}
                />
                <Text ml={5}>{rides.name}</Text>
                <Text ml={5} spacing={5}>
                  <PhoneIcon /> {rides.contact}
                </Text>
              </VStack>
            </Flex>
          </Box>
          <Button
            onClick={book}
            disabled={loading}
            colorScheme="teal"
            p={"40px"}
            w={"600px"}
          >
            {loading ? "Requesting..." : "Book "}
          </Button>

          <Modal
            onClose={closeEvent}
            isOpen={successful}
            isCentered
            size={"xl"}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Booking Info</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Heading>Booking Id : {successInfo.booking_id}</Heading>
                <br />
                <Heading>Booking Status : {successInfo.booking_status}</Heading>
                <br />
                <br />
              </ModalBody>
            </ModalContent>
          </Modal>
        </VStack>
      </Center>
    </>
  );
}

export default Ride;
