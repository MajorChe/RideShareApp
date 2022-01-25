import { Box, Flex, Text, Heading, HStack, Link, Icon } from "@chakra-ui/react";
import React from "react";
// import { ServiceCard } from "../../../components/serviceCard";
import { RiComputerLine } from "react-icons/ri";
import { BsCardChecklist, BsPencilSquare } from "react-icons/bs";
import { FiArrowUpRight } from "react-icons/fi";
import {AiFillCar, AiOutlineFileSearch} from "react-icons/ai";
import {MdLocalPostOffice} from "react-icons/md";
import {BsJournalBookmark} from "react-icons/bs";
import {BsSignpost} from "react-icons/bs";
import {MdOutlineMobileFriendly} from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";

export const Services = () => {
  return (
    <Box w="full" py="60px" px="200px" >
      <Flex justifyContent="space-between" alignItems="center" pb="60px">
        <Heading  fontSize={60}  ml={"110px"} letterSpacing="4px" color="#3D9AD5">
          We Help You 
        </Heading>
      </Flex>
      <HStack w="full" spacing="60px"  ml={"100px"}>      
        <Flex
          flexDirection="column"
          bg="yellow.50"
          p="40px"
          w="full"
          height="380px"
          justifyContent="space-between"
        >
          <HStack>
          <Icon color="#3D9AD5" h={20} w={20} as={AiOutlineFileSearch}/>
          <Icon color="#3D9AD5" h={10} w={10} as={AiFillCar}/>
          </HStack>
          <Box>
            <Heading color="#3D9AD5" fontSize={28} letterSpacing="3px" pb="20px">
            Find Rides 
            </Heading>            
          </Box>
          <Link color="#3D9AD5">
            Explore more
            <Icon as={FiArrowUpRight} ml="10px" h={5} w={5} />
          </Link>
        </Flex>

          
        <Flex
          flexDirection="column"
          bg="yellow.50"
          p="40px"
          w="full"
          height="380px"
          justifyContent="space-between"
        > 
        <HStack>
          <Icon color="#3D9AD5" h={20} w={20} as={BsSignpost}/>
          <Icon color="#3D9AD5" h={10} w={10} as={BsCardChecklist}/>
          </HStack>
          <Box>
            <Heading color="#3D9AD5" fontSize={28} letterSpacing="3px" pb="20px">
              Post Rides 
            </Heading>           
          </Box>
          <Link color="#3D9AD5">
            Explore more
            <Icon as={FiArrowUpRight} ml="10px" h={5} w={5} />
          </Link>
        </Flex>


        <Flex
          flexDirection="column"
          bg="yellow.50"
          p="40px"
          w="full"
          height="380px"
          justifyContent="space-between"
         >
          <Icon color="#3D9AD5" h={20} w={20} as={BsJournalBookmark}/>
          <Box>
            <Heading color="#3D9AD5" fontSize={28} letterSpacing="3px" pb="20px">
              Book Rides
            </Heading>            
          </Box>
          <Link color="#3D9AD5">
            Explore more
            <Icon as={FiArrowUpRight} ml="10px" h={5} w={5} />
          </Link>
        </Flex>

        <Flex
          flexDirection="column"
          bg="yellow.50"
          p="40px"
          w="full"
          height="380px"
          justifyContent="space-between"
         >
          <Icon color="#3D9AD5" h={20} w={20} as={MdOutlineMobileFriendly}/>
          <Box>
            <Heading color="#3D9AD5" fontSize={28} letterSpacing="3px" pb="20px">
              Get Notified
            </Heading>            
          </Box>
          <Link color="#3D9AD5">
            Explore more
            <Icon as={FiArrowUpRight} ml="10px" h={5} w={5} />
          </Link>
        </Flex>
        

        <Flex
          flexDirection="column"
          bg="yellow.50"
          p="40px"
          w="full"
          height="380px"
          justifyContent="space-between"
         >
          <Icon color="#3D9AD5" h={20} w={20} as={FaMapMarkerAlt}/>
          <Box>
            <Heading color="#3D9AD5" fontSize={28} letterSpacing="3px" pb="20px">
             Reach Safe
            </Heading>            
          </Box>
          <Link color="#3D9AD5">
            Explore more
            <Icon as={FiArrowUpRight} ml="10px" h={5} w={5} />
          </Link>
        </Flex>     
         

      </HStack>   
      </Box>
 
      
    
  );
};