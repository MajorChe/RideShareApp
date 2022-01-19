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

const TripCard = () => {
  return (
    <>
    <Center pb={20}>
      <Box maxW={'400px'} w={'full'} bg={useColorModeValue('white', 'gray.900')} boxShadow={'2xl'} rounded={'lg'} p={6} textAlign={'center'}>
        <Stack direction={"row"} spacing={10}>
        <Image borderRadius='full' boxSize='150px' src={"https://bit.ly/ryan-florence"} alt={'Avatar Alt'} mb={4} pos={'relative'}/>
        <Image borderRadius='2xl' boxSize='150px' src={"https://tinyurl.com/2s3kna33"} alt={'Avatar Alt'} mb={4} pos={'relative'}/>
        </Stack>
        <CardComponentVertical name="Pick Up: " value="Toronto, ON, Canada"/>
        <CardComponentVertical name="Drop off: " value="Hamilton, ON, Canada"/>
        <CardComponentHorizontal name= "Cost: " value="$20"/>
        <CardComponentHorizontal name= "Date: " value="25 Feb 2022"/>
        <CardComponentHorizontal name= "Seats Booked: " value="2"/>
        <CardComponentHorizontal name= "Status: " value="Approved"/>
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