import { CalendarIcon, TimeIcon } from '@chakra-ui/icons';
import { Box, Button, Heading, HStack, Image, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import React from 'react'
import Moment from 'react-moment';
import Footer from '../Footer';
import Navbar from "../Navbar";
import UserMetrics from './UserMetrics';
import ViewTrips from './ViewTrips';

const CompletedCard = ({origin,destination,image,seats,date }) => {
  return(
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
                <Image
                  borderRadius="md"
                  width={"280px"}
                  height={"180px"}
                  src={image}
                  alt={"Car"}
                  mb={4}
                  pos={"relative"}
                />
                <Text fontSize={"xl"}><b>Origin</b></Text>
                <Text fontSize={"xl"}>{origin}</Text>
                <Text fontSize={"xl"}><b>Destination </b></Text>
                <Text fontSize={"xl"}>{destination}</Text>
                <HStack>
                  <Text fontSize={"xl"}><b>Seats: </b>{seats}</Text>
                  <Text fontSize={"xl"}><b>Cost: </b>$25</Text>
                </HStack>
                <HStack>
                    <CalendarIcon />
                    <Text fontSize={"xl"}>{date}</Text>
                  <Text fontWeight={"small"} fontSize={"xl"}>
                    <TimeIcon /> 09:00
                  </Text>
                </HStack>
                <Button
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
            COMPLETED
          </Button>
              </VStack>
          </Box>
        </VStack>
  )
}


function Dashboard() {
  return (
    <>
      <Navbar />
      <UserMetrics />
      <Heading textAlign={"center"} mt={"30px"}>COMPLETED RIDES</Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} mt={"50px"} mb={"50px"}>
      <CompletedCard origin={"Toronto, ON, CANADA"} destination={"Barrie, ON, CANADA"} image={"https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGNhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"} seats={"4"} date={"2nd Feb 2022"}/>
      <CompletedCard origin={"Vancouver, BC, CANADA"} destination={"Surrey, BC, CANADA"} image={"https://images.unsplash.com/photo-1619767886558-efdc259cde1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aHl1bmRhaXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"} seats={"3"} date={"10th Feb 2022"}/>
      </SimpleGrid>
      <Footer/>
    </>
  )
}

export default Dashboard
