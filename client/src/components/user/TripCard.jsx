import React from 'react';
import {
  Heading,
  Image,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';

const TripCard = () => {
  return (
    <>
    <Center pb={20}>
      <Box maxW={'400px'} w={'full'} bg={useColorModeValue('white', 'gray.900')} boxShadow={'2xl'} rounded={'lg'} p={6} textAlign={'center'}>
        <Stack direction={"row"} spacing={10}>
        <Image borderRadius='full' boxSize='150px' src={"https://bit.ly/ryan-florence"} alt={'Avatar Alt'} mb={4} pos={'relative'}/>
        <Image borderRadius='full' boxSize='150px' src={"https://tinyurl.com/2s3kna33"} alt={'Avatar Alt'} mb={4} pos={'relative'}/>
        </Stack>
        <Heading fontSize={'2xl'} fontFamily={'body'}>Lindsey James</Heading>
        <Text fontWeight={600} color={'gray.500'} mb={4}>
          Pick up
        </Text>
        <Text fontWeight={600} color={'gray.500'} mb={4}>
          drop off
        </Text>
        <Text
          textAlign={'center'}
          color={useColorModeValue('gray.700', 'gray.400')}
          px={3}>
          Ride details go here
        </Text>

        <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight={'400'}>
            Ride detail 1
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight={'400'}>
            Ride detail 2
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight={'400'}>
            Ride detail 3
          </Badge>
        </Stack>

        <Stack mt={8} direction={'row'} spacing={4}>
          <Button
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            _focus={{
              bg: 'gray.200',
            }}>
            Update Ride
          </Button>
          <Button
            flex={1}
            fontSize={'sm'}
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
        </Stack>
      </Box>
    </Center>
    </>
  )
}

export default TripCard
