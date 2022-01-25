import { Box, Flex, Text, Heading, HStack, Link, Icon, AspectRatio, VStack, SimpleGrid, Image } from "@chakra-ui/react";
import { FiArrowUpRight } from "react-icons/fi";
import carshare from "../assets/carshare.png";
export const Aboutus = () => {
  return (
    <Box height={"600px"} bg="#3D9AD5">
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={"30px"} mt={"70px"}>
        <Flex direction={"column"}>
        <Heading  fontSize={"5xl"} letterSpacing="4px" color="white" align={"center"} mt={{base: "70px", md: "150px"}}>
          ABOUT US
        </Heading>

        <Text fontSize={20} color={'white'} p={8} align={"center"}> 
          Proident aliquip elit nostrud dolore cupidatat id reprehenderit
          magna enim ullamco eu consequat labore. Laboris irure ea pariatu 
        </Text>
        </Flex>
        <AspectRatio ratio={4/3}> 
          <Image borderRadius="md" src={carshare} alt="car"/>
        </AspectRatio>
      </SimpleGrid>
    </Box>
    )
  };