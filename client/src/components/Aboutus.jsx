import { Box, Flex, Text, Heading, HStack, Link, Icon, AspectRatio, VStack } from "@chakra-ui/react";
import { FiArrowUpRight } from "react-icons/fi";
import carshare from "../assets/carshare.png";
export const Aboutus = () => {
  return (
    <Box  w="full" bg="#3D9AD5" px="200px"  h={"500px"} >
      <Flex justifyContent="space-between" alignItems="center" >
        <Box w={"800px"}>
        <Flex direction={"column"} >
        <Heading  fontSize={60} ml={"110px"} letterSpacing="4px" mb={"30"} color="white">
         About Us
        </Heading>

        <Text fontSize={20} pl={"150px"} color="whiteAlpha.700" pb="20px" w={"400px"}> 
            Proident aliquip elit nostrud dolore cupidatat id reprehenderit
            magna enim ullamco eu consequat labore. Laboris irure ea pariatur
           
        </Text>
        </Flex>
        </Box>
        <AspectRatio w="800px" ratio={4/3}> 
        <img borderRadius="md" ml={"100px"} src={carshare} alt="car"/>
      </AspectRatio>
      
      </Flex>
      
      </Box>
  )}