import React, { useState } from "react";
import axios from "axios";
import { Heading, Icon } from "@chakra-ui/react";
import {
  FaDollarSign,
  FaCar,
  FaCrosshairs,
  FaMapMarkerAlt,
} from "react-icons/fa";
import {
  Stack,
  FormControl,
  InputGroup,
  FormHelperText,
  HStack,
  Container,
  Box,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Center,
  Text,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Input,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import { useContext } from "react";
import { AccountContext } from "../hooks/AccountContext";
import DatePicker from "react-datepicker";
import Navbar from "../Navbar";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import Places from "./Places";
import { useNavigate } from "react-router-dom";
import { CalendarIcon, TimeIcon } from "@chakra-ui/icons";
function PostRide() {
  const navigate = useNavigate();
  const { user } = useContext(AccountContext);
  const [seats, setSeats] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [image, setImage] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState("");
  const isError = selectedTime === "";
  const isErrorDate = selectedDate === null;
  const isErrorSeats = seats === 0;
  const isErrorImage = image === "";
  const isErrorPrice = price === "";
  const isErrorPlace1 = address1 === " ";
  const isErrorPlace2 = address2 === " ";
  const isErrorAll =
    isError || isErrorDate || isErrorSeats || isErrorPrice || isErrorImage;

  const closeEvent = () => {
    setSuccessful(false);
    navigate("/trips/postings");
  };
  const post = (e) => {
    e.preventDefault();
    setLoading(true);
    let month = selectedDate.getUTCMonth() + 1;
    let day = selectedDate.getUTCDate();
    let year = selectedDate.getUTCFullYear();
    let format = year + "-" + month + "-" + day;
    axios
      .post("/postRide", {
        params: {
          owner_id: user.id,
          origin: address1,
          destination: address2,
          available_seats: seats,
          date_of_ride: format,
          time_of_ride: selectedTime,
          cost: price,
          image: image,
        },
      })
      .then((res) => {
        setLoading(false);
        console.log("here", res);
        setSuccessful(true);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const updateAdress1 = (address1) => {
    setAddress1(address1);
    console.log(address1);
  };
  const updateAdress2 = (address2) => {
    setAddress2(address2);
    console.log(address2);
  };
  const handleImage = (event) => setImage(event.target.value);
  const handlePrice = (event) => setPrice(event.target.value);
  return (
    <>
      <Navbar />
      <Center py={6}>
        <VStack>
        <Heading textAlign={"center"} mt={"30px"} mb={"30px"}>POST A RIDE</Heading>
          <Box boxShadow={"dark-lg"} rounded={"md"} p={6}>
            <Container maxW="container.xl" centerContent>
              <Box padding="5" mt="5">
                <FormControl>
                  <Stack spacing={3}>
                    <HStack>
                      <Icon
                        as={FaMapMarkerAlt}
                        color={"skyblue"}
                        fontSize={"2xl"}
                      />
                      <Places
                        isErrorplace={isErrorPlace1}
                        updateAdress={updateAdress1}
                        adresss1={address1}
                        location={"from"}
                        place={"pick-up"}
                        required
                      />
                    </HStack>
                    <HStack>
                      <Icon
                        as={FaCrosshairs}
                        color={"green.300"}
                        fontSize={"2xl"}
                      />
                      <Places
                        isErrorplace={isErrorPlace2}
                        updateAdress={updateAdress2}
                        adresss1={address2}
                        location={"to"}
                        place={"drop-off"}
                        required
                      />
                    </HStack>
                    <HStack>
                      <Icon as={FaCar} color={"skyblue"} mr="4px" />
                      <Input
                        placeholder="Image"
                        value={image}
                        w={"375px"}
                        onChange={handleImage}
                      ></Input>
                      <Icon as={FaDollarSign} color={"green.300"} />
                      <Input
                        placeholder="Enter total cost"
                        w={"350px"}
                        value={price}
                        onChange={handlePrice}
                      ></Input>
                    </HStack>
                    <HStack spacing="10px">
                      <FormControl>
                        <HStack>
                          <CalendarIcon color={"teal"} mr="4px" />
                          <InputGroup>
                            <Button
                              as={DatePicker}
                              selected={selectedDate}
                              onChange={(date) => setSelectedDate(date)}
                              dateFormat="MMMM Do yyyy"
                              minDate={new Date()}
                            />
                          </InputGroup>
                        </HStack>
                        <FormHelperText ml={"5px"}>
                          Date Required
                        </FormHelperText>
                      </FormControl>
                      <FormControl>
                        <InputGroup>
                          <NumberInput
                            size="sm"
                            maxW={16}
                            defaultValue={1}
                            min={1}
                            onChange={(seats) => setSeats(seats)}
                            value={seats}
                            max={4}
                          >
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </InputGroup>
                        <FormHelperText>Seats</FormHelperText>
                      </FormControl>
                      <FormControl>
                        <HStack>
                          <TimeIcon color={"teal"} mr="4px" />
                          <TimePicker
                            isInvalid={isError}
                            placeholder="Select Time"
                            use24Hours
                            showSecond={false}
                            focusOnOpen={true}
                            format="HH:mm"
                            onChange={(e) => setSelectedTime(e.format("HH:mm"))}
                          />
                        </HStack>
                      </FormControl>
                    </HStack>
                  </Stack>
                  <br />
                </FormControl>
                <Button
                  onClick={!isError && post}
                  disabled={isErrorAll}
                  colorScheme="blue"
                  p={"40px"}
                  w={"800px"}
                >
                  {loading ? "Requesting..." : "Post Ride "}
                </Button>
                <Modal onClose={closeEvent} isOpen={successful} isCentered>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                      <br />
                      Your Ride is Succesfully posted!
                      <br />
                    </ModalBody>
                  </ModalContent>
                </Modal>
              </Box>
            </Container>
          </Box>
        </VStack>
      </Center>
    </>
  );
}
export default PostRide;
