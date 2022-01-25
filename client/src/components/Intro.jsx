import React from "react";
import {
  Box,
  Heading,
  Text,
  Link,
  Flex,
  Icon,
  AspectRatio,
  Img,
  VStack,
  Avatar,
  Image,
} from "@chakra-ui/react";
import { FiArrowUpRight } from "react-icons/fi";
export const Intro = () => {
  return (
    <Box w="full" bg="#3D9AD5" px="200px" py="60px" mb="150px"  >
      <Flex justifyContent="space-between" alignItems="center" pb="40px">
       <VStack ml={"100px"}>
        <Heading fontSize={60} letterSpacing="2px" color="whiteAlpha.900">
          SHARE your Ride &<br />
        </Heading>
        <Heading fontSize={60} letterSpacing="2px" color="whiteAlpha.900">
          earn your SHARE ...
        </Heading>
       </VStack>
        <Box maxW="500px"   >
          <Text fontSize={20} color="whiteAlpha.700" pb="20px">
            A car pooling app for car-owners to share their extra seats  with riders.
            
          
          </Text>
          <Link fontSize={30} color="whiteAlpha.800">
            Sign up for free
            <Icon as={FiArrowUpRight} ml="10px" h={5} w={5} />
          </Link>
        </Box>
      </Flex>
    <AspectRatio w="800px" ratio={5/3} mb="-200px"> 
        <Img borderRadius="md" ml={"100px"} src="https://therideshareguy.com/wp-content/uploads/2020/01/TheRideShareSocial.jpg"/>
      </AspectRatio>
    </Box>
  );
};
  