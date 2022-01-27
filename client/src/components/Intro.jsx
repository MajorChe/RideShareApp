import React from "react";
import {
  Box,
  Heading,
  Text,
  Link,
  Flex,
  Icon,
  VStack,
  Image,
  HStack,
  SimpleGrid
} from "@chakra-ui/react";
import pic from "../assets/pic.jpg"
import { FiArrowUpRight } from "react-icons/fi";


export const Intro = () => {
  return (
    <Box h={{ base: "1000px", md: "750px" }} bg="#3D9AD5" mb={"100px"}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={"30px"}>
        <Flex pt={{ base: "70px", md: "90px" }}>
          <VStack w={{ base: "500px", md: "1200px" }}>
            <Heading
              fontSize={{ base: "35px", md: "59px" }}
              ml={{ base: "5px", md: "270px" }}
              letterSpacing="2px"
              color="whiteAlpha.900"
            >
              SHARE your Ride & <br />
              earn your SHARE!
            </Heading>
            <Box  pt={{base:"0px", md:"50px"}}>
              <Image
                w={{ base: "400px", md: "820px" }}
                borderRadius="md"
                h={{base: "300px", md: "520px"}}
                ml={{ base: "30px", md: "300px" }}
                src={pic}
              />
              </Box>
          </VStack>
        </Flex>
        <Flex
          direction={"column"}
          px={{ base: "70px", md: "250px" }}
          pt={{ base: "30px", md: "140px" }}
        >
          <Text
            fontSize={25}
            color="whiteAlpha.700"
            mb={{ base: "24px", md: "30px" }}
          >
            A car pooling app for car-owners to share their extra seats with
            riders. We never let empty seats go waste in your car .
          </Text>
          <Flex direction="column">
            <HStack>
              <VStack>
                <Box h={"200px"} w={"200px"} borderRadius={"10%"}>
                  <Text fontSize={30} color="white" w={"250px"}>
                    Passenger ?
                  </Text>
                  <Text fontSize={20} color="whiteAlpha.700">
                    1. Free Sign Up
                  </Text>
                  <Text fontSize={20} color="whiteAlpha.700">
                    2. Affordable Rates
                  </Text>
                  <Text fontSize={20} color="whiteAlpha.700">
                    3. Reliable Drivers
                  </Text>
                </Box>
              </VStack>
              <VStack>
                <Box borderRadius={"10%"} h={"200px"} w={"220px"}>
                  <Text fontSize={30} color="white" w={"150px"}>
                    Driver ?
                  </Text>
                  <Text fontSize={20} color="whiteAlpha.700">
                    1. Free Sign Up
                  </Text>
                  <Text fontSize={20} color="whiteAlpha.700">
                    2. Extra Income
                  </Text>
                  <Text fontSize={20} color="whiteAlpha.700">
                    3. Reliable Passengers
                  </Text>
                </Box>
              </VStack>
            </HStack>
            <Link fontSize={30} color="whiteAlpha.800">
              Sign up
              <Icon as={FiArrowUpRight} ml="10px" />
            </Link>
          </Flex>
        </Flex>
      </SimpleGrid>
    </Box>
  );
};
