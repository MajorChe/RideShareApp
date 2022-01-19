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
} from '@chakra-ui/react';

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
        fontWeight={'800'}
        fontSize={"2xl"}>
        {props.name} 
      </Badge>
      <Text fontSize={"2xl"}>{props.value}</Text>
    </Flex>
  )
}

const TripCard = (props) => {
  return (
    <>
    <Center pb={20}>
      <Box maxW={'400px'} w={'full'} bg={useColorModeValue('white', 'gray.900')} boxShadow={'2xl'} rounded={'lg'} p={6} textAlign={'center'}>
        <Stack direction={"row"} spacing={10}>
        <Image borderRadius='full' boxSize='150px' src={"https://bit.ly/ryan-florence"} alt={'Profile picture'} mb={4} pos={'relative'}/>
        <Image borderRadius='2xl' boxSize='150px' src={props.ride_image} alt={'Car'} mb={4} pos={'relative'}/>
        </Stack>
        <CardComponentVertical name="Origin: " value={props.origin}/>
        <CardComponentVertical name="Destination: " value={props.destination}/>
        <CardComponentHorizontal name= "Cost: " value={props.cost}/>
        <CardComponentHorizontal name= "Date: " value={props.date}/>
        <CardComponentHorizontal name= "Seats Booked: " value="2"/>
        <CardComponentHorizontal name= "Status: " value={props.status}/>
        <Button
            mt={5}
            fontSize={'xl'}
            rounded={'full'}
            bg={'blue.400'}
            color={'white'}
            boxShadow={
              '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
            }
            _hover={{
              bg: 'blue.500',
            }}
            _focus={{
              bg: 'blue.500',
            }}>
            Cancel Ride
          </Button>
      </Box>
    </Center>
    </>
  )
}

export default TripCard
