import { Box, SimpleGrid, Icon, Text, Stack, Flex, Heading, Link } from '@chakra-ui/react';
import {AiFillCar, AiOutlineFileSearch} from "react-icons/ai";
import {BsJournalBookmark, BsSignpost, BsCardChecklist} from "react-icons/bs";
import {MdOutlineMobileFriendly} from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FiArrowUpRight } from 'react-icons/fi';

const Feature = ({ title, text, icon1, icon2 }) => {
  return (
    <Stack spacing={3} bg="yellow.50" padding={"40px"}>
      <Flex
        w={16}
        h={16}
        alignSelf={"center"}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        mb={1}>
        {icon1}
        {icon2}
      </Flex>
      <Text fontWeight={600} fontSize={"xl"} alignSelf={"center"}>{title}</Text>
      <Text color={'gray.600'} align={"center"}>{text}</Text>
      <Text as={Link} align={"center"}>Explore more <Icon as={FiArrowUpRight} ml="10px" h={5} w={5} /></Text>
    </Stack>
  );
};

export function Services() {
  return (
    <Box p={4} mt={"200px"} mb={"70px"}>
      <Heading align={"center"} color={"blue.600"}>USING RIDE SHARE ?</Heading>
      <SimpleGrid columns={{ base: 1, md: 5 }} spacing={10} mt={"70px"}>
        
        <Feature
          icon1={<Icon color="#3D9AD5" h={20} w={20} mr={2} as={AiOutlineFileSearch}/>}
          icon2={<Icon color="#3D9AD5" h={10} w={10} as={AiFillCar}/>}
          title={'FIND RIDES'}
          text={
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
          }
        />
        <Feature
          icon1={<Icon color="#3D9AD5" h={20} w={20} as={BsSignpost}/>}
          icon2={<Icon color="#3D9AD5" h={10} w={10} as={BsCardChecklist}/>}
          title={'POST RIDES'}
          text={
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
          }
        />
        <Feature
          icon1={<Icon color="#3D9AD5" h={20} w={20} as={BsJournalBookmark}/>}
          title={'BOOK RIDES'}
          text={
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
          }
        />
        <Feature
          icon1={<Icon color="#3D9AD5" h={20} w={20} as={MdOutlineMobileFriendly}/>}
          title={'GET NOTIFIED'}
          text={
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
          }
        />
        <Feature
          icon1={<Icon color="#3D9AD5" h={20} w={20} as={FaMapMarkerAlt}/>}
          title={'REACH SAFE'}
          text={
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
          }
        />
      </SimpleGrid>
    </Box>
  );
}