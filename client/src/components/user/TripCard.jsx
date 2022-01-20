import React from 'react';
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
      <Badge
        px={5}
        bg={useColorModeValue('gray.50', 'gray.800')}
        fontWeight={'500'}
        fontSize={"2xl"}>
        {props.name} 
      </Badge>
      <Text fontSize={"2xl"}>{props.value}</Text>
    </Flex>
  )
}

const TripCard = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRide = async () => {
    await axios.put(`/user/cancelride/${props.booking_id}`)
    .then((res) => {
      console.log("response after:", res.data);
      window.location.reload();
    })
  }
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
      <Box maxW={'400px'} w={'full'} bg={useColorModeValue('white', 'gray.900')} boxShadow={'2xl'} rounded={'lg'} p={6} textAlign={'center'}>
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
        {props.status === 'pending' && <Button
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
          {props.status === 'cancelled' && <Button
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
