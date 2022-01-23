import {
  Box,
  chakra,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react';

function StatsCard(props) {
  return (
    <Stat
      px={{ base: 4, md: 8 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded={'lg'}>
      <StatLabel fontWeight={'medium'} isTruncated>
        {props.title}
      </StatLabel>
      <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
        {props.stat}
      </StatNumber>
    </Stat>
  );
}

export default function UserMetrics() {
  return (
    <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <Heading textAlign={"center"} mt={"30px"}>YOUR RIDE DETAILS</Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }} mt={"30px"}>
        <StatsCard title={'Number of trips'} stat={'20'} />
        <StatsCard title={'Total Kms'} stat={'1000kms'} />
        <StatsCard title={'Total Earnings'} stat={'$250'} />
      </SimpleGrid>
    </Box>
  );
}