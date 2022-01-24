import React, { useEffect, useState } from 'react';
import {
  Heading,
  Image,
  Box,
  Center,
  Text,Flex,
  Stack,
  Button,
  Link,
  Badge,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
} from '@chakra-ui/react';
import axios from 'axios';

const CardComponentVertical = (props) => {
  return(
    <Flex direction={"column"}>
        <Badge
            px={5}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight={'800'}
            fontSize={"xl"}>
            {props.name} 
          </Badge>
          <Text fontSize={"2xl"}>{props.value}</Text>
        </Flex>
  )
}

const CardComponentHorizontal = (props) => {
  return(
    <Flex direction={"row"} pt={3}>
      <Text
        px={5}
        fontWeight={'500'}
        fontSize={"2xl"}>
        {props.name} 
      </Text>
      <Text fontSize={"2xl"}>{props.value}</Text>
    </Flex>
  )
}

const TripCard = (props) => {
  const[rides,SetRides] = useState({})
 
  useEffect(() => {
    axios.get("/ride",
      {
        params:
        {
          id: props.booked_ride_id,
        }
      }).then((res) => {
        console.log("rides", res.data);
        SetRides(res.data)
      });
  }, []);
  
  const { isOpen, onOpen, onClose } = useDisclosure();

  const trueStatus = props.status==='pending' ? true : props.status==='approved' ? true : false

  const cancelRide = () => {
    const available_seats = rides.available_seats;
    const updated_seats = available_seats + props.seats_booked;

    axios.put("/user/cancelride",
        {
          params:
          {
            id: props.booking_id,
            ride_id: rides.ride_id,
            updated_seats: updated_seats
          }
        })
    .then(() => {
      window.location.reload();
    })
  };

  return (
    <>
    <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom' size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <br></br><br></br>
            <Image src={props.ride_image}/>
          </ModalBody>
        </ModalContent>
    </Modal>
    <Center pb={20}>
      <Box maxW={'400px'} w={'full'} boxShadow="dark-lg" rounded={'lg'} p={6} textAlign={'center'} 
      bgColor={"white"} color={"black"}
      >
        <Stack direction={"row"} spacing={10}>
        <Image borderRadius='full' boxSize='150px' src={props.owner_image} alt={'Profile picture'} mb={4} pos={'relative'}/>
        <Image onClick={onOpen} cursor={'pointer'} borderRadius='2xl' boxSize='150px' src={props.ride_image} alt={'Car'} mb={4} pos={'relative'}/>
        </Stack>
        <CardComponentVertical name="Origin: " value={props.origin}/>
        <CardComponentVertical name="Destination: " value={props.destination}/>
        <CardComponentHorizontal name= "Name: " value={props.owner_name}/>
        <CardComponentHorizontal name= "Cost: " value={props.cost}/>
        <CardComponentHorizontal name= "Date: " value={props.date}/>
        <CardComponentHorizontal name= "Seats Booked: " value={props.seats_booked}/>
        <CardComponentHorizontal name= "Status: " value={props.status}/>
        {trueStatus && <Button
            mt={5}
            fontSize={'xl'}
            rounded={'full'}
            bg={'red.400'}
            color={'white'}
            boxShadow={
              '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
            }
            _hover={{bg: 'red.500',}}
            onClick={cancelRide}
            >
            CANCEL RIDE
          </Button>}
          {!trueStatus && <Button
            mt={5}
            fontSize={'xl'}
            rounded={'full'}
            bg={'red.400'}
            color={'white'}
            boxShadow={
              '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
            }
            _hover={{bg: 'red.500',}}
            >
            RIDE CANCELLED
          </Button>}
      </Box>
    </Center>
    </>
  )
}

export default TripCard
