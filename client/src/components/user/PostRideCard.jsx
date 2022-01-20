import React, { useContext, useEffect, useState } from "react";
import {
  Heading,
  Image,
  Box,
  Text,
  Flex,
  Stack,
  Button,
  VStack,
  HStack,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  ModalHeader,
} from "@chakra-ui/react";
import axios from "axios";

const ButtonComp = (props) => {
  return (
    <Button
      fontSize={"md"}
      rounded={"full"}
      bg={props.color}
      onClick={props.onClick}
      color={"white"}
      boxShadow={
        "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
      }
      _hover={{ bg: props.color }}
    >
      {props.name}
    </Button>
  );
};

const BookingComp = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
    <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom' size={"sm"} blockScrollOnMount={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Rider Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <br></br>
            <Text>{props.name}</Text>
            <Text>Contact: 987654321</Text>
            <br></br><br></br>
          </ModalBody>
        </ModalContent>
    </Modal>

    <VStack>
      <Text fontWeight={"bold"} fontSize={"30px"} mt={5}>Booking: {props.id}</Text>
      <HStack>
        <Image
          borderRadius="full"
          boxSize="100px"
          src={"https://bit.ly/ryan-florence"}
          alt={"Profile picture"}
          mb={4}
          pos={"relative"}
        />
        <ButtonComp onClick={onOpen} color={"#3d9ad5"} name="VIEW" />
        <ButtonComp color={"green"} name="APPROVE" />
        <ButtonComp color={"#ee6055"} name="CANCEL" />
      </HStack>
    </VStack>
    </>
  );
};

const PostRideCard = (props) => {

  const deleteRide = () => {
    axios.put(`/user/deleteride/${props.ride_id}`)
    .then(() => {
      window.location.reload();
    })
  };

  const { bookings } = props;
  const bookingCompList = bookings.map((booking, index) => {
    return <BookingComp key={index} id={index + 1} name={booking.name}/>;
  });

  return (
    <>
    <Flex justifyContent={"space-around"} mt={10}>
      <Box maxW={'400px'} w={'full'} bg={useColorModeValue('orange.100', 'gray.900')} boxShadow={'2xl'} rounded={'lg'} p={6} textAlign={'center'}>
        <VStack spacing={"30px"}>
        <Stack direction={"row"} >
          <Text fontWeight={"600"} fontSize={"3xl"} alignSelf={"center"}>YOUR POST: {props.id}</Text>
          <ButtonComp color={"#ee6055"} name="DELETE RIDE" onClick={deleteRide}/>
        </Stack>
        <VStack>
          <Text fontWeight={"medium"} fontSize={"20px"}>Origin: {props.origin}</Text>
          <Text fontWeight={"medium"} fontSize={"20px"}>Destination: {props.destination}</Text>
        </VStack>
        {bookingCompList}
        </VStack>
      </Box>
      </Flex>
    </>
  );
};

export default PostRideCard;
