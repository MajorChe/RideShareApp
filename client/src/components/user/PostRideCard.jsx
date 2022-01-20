import React, { useContext, useEffect, useState} from 'react';
import {
  Heading,
  Image,
  Box,
  Center,
  Text,Flex,
  Stack,
  Button,VStack,HStack,
  Link,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';

const ButtonComp = (props) => {
  return(
    <Button
      fontSize={'md'}
      rounded={'full'}
      bg={props.color}
      color={'white'}
      boxShadow={
        '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
      }
      _hover={{bg: props.color}}
    >
      {props.name}
    </Button>
  );
}

const BookingComp = (props) => {
  return(
    <VStack>
      <Heading>Booking: {props.id}</Heading>
      <HStack>
        <Image borderRadius='full' boxSize='100px' src={"https://bit.ly/ryan-florence"} alt={'Profile picture'} mb={4} pos={'relative'}/>
        <Text>Name : John</Text>
        <Text>Contact : 9876543210</Text>
      </HStack>
      <HStack>
        <ButtonComp color={"green"} name="Approve"/>
        <ButtonComp color={"#ee6055"} name="Cancel"/>
        </HStack>
    </VStack>
  );
}


const PostRideCard = (props) => {
  
  const {bookings} = props
  const bookingCompList = bookings.map((booking,index) => {
    return(
    <BookingComp
      key={index}
      id={index + 1}
    />
    )
  })

  return (
    <>
    <Center pb={20}>
      <Box maxW={'400px'} w={'full'} bg={useColorModeValue('white', 'gray.900')} boxShadow={'2xl'} rounded={'lg'} p={6} textAlign={'center'}>
        <VStack>
        <Stack direction={"row"} spacing={20}>
          <Heading>Post {props.id}</Heading>
          <ButtonComp color={"#ee6055"} name="Delete Ride"/>
        </Stack>
          <Text fontSize={"20px"}>Origin: {props.origin}</Text>
          <Text fontSize={"20px"}>Destination: {props.destination}</Text>
        {bookingCompList}
        </VStack>
      </Box>
    </Center>
    </>
  )
}

export default PostRideCard
