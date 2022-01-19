import React from 'react';
import './RidesListItem.css';
import { Link } from "react-router-dom";
import Moment from 'react-moment';

import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Image,
  Container,
  Link as chakraLink,
  Button
} from '@chakra-ui/react';
function RidesListItem(props) {


  // let format = new Date(props.date_of_ride).toUTCString();
  // console.log(format);
  // let month = new Date(props.date_of_ride).getUTCMonth() + 1; //months from 1-12
  // let day = new Date(props.date_of_ride).getUTCDate();
  // let year = new Date(props.date_of_ride).getUTCFullYear();
     
  // console.log(formatted);
  return (
    <Center py={6}>
      <Box boxShadow={'2xl'} bg='gray.200'
        rounded={'md'}
        p={6}
        overflow={'hidden'}>
        <Stack direction={'row'} spacing={1} fontSize={'md'} width={"400px"} >

          <Stack direction={'column'} spacing={1} fontSize={'md'}>
            <Image size='2xl' src={props.ride_image} h={'80%'} />

            <Link to={{
              pathname: "/ride/" + props.ride_id,
            }}>
              <Button height='30px'
                width='200px' bg={'tomato'} variant='outline'>View </Button>
            </Link>


          </Stack>
          <Stack direction={'column'} spacing={1} ml={"5"} fontSize={'md'} width={"800px"} >
            <Text color={'teal.800'}><b>From :</b> {props.origin}</Text>
            <Text color={'teal.800'}><b>To   :</b> {props.destination}</Text>
            <Text color={'teal.800'}><b>Date :</b> <Moment format="D MMM YYYY">{props.date_of_ride}</Moment></Text>
            <Text color={'teal.800'}><b>Time :</b> <Moment format="HH:mm">{props.time_of_ride}</Moment><b> Seats:</b> {props.available_seats}</Text>
            <Text color={'teal.800'}></Text>
          </Stack>


        </Stack>
      </Box>
      {/* <Stack>
          <Text
            color={'green.500'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}>
            Blog
          </Text>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}>
            Boost your conversion rate
          </Heading>
          <Text color={'gray.500'}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum.
          </Text>
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
        <Avatar size='2xl'
            src={props.avatar}
            alt={'Driver'}
          />
          <Stack direction={'column'} spacing={10} fontSize={'md'}>
        
            <Text fontWeight={600} color={'gray.500'}>{props.name}</Text>
            <Text color={'gray.500'}>{props.contact}</Text>
          </Stack>
        </Stack> */}

    </Center >
  );
}


//}
// <div class="rideContainer">
//   <div class="driverInfo">

//     <img id="avatar" src={props.avatar} alt="" />
//     <div>
//       <br />
//       <h2>{props.name}</h2><br />
//       <h6><i class="fas fa-phone"></i>  {props.contact}</h6>
//       {/* <h6 {{style="color: rgb(255, 115, 0);"}}><i class="fas fa-star"></i>  4.5</h6> */}
//     </div>
//   </div>
//   <div class="rideInfo">
//     <br />
//     <p><b>Date :</b>{formatted}&nbsp;&nbsp; &nbsp; <b>Time :</b>{props.time_of_ride}</p>
//     <h6><b>From:</b>{props.origin} </h6>
//     <h6><b>To:</b> {props.destination}</h6>
//     <h6><b>Pick Up:</b>{props.pick_up} </h6>
//     <h6><b>Drop Off:</b>{props.drop_off}</h6>

//   </div>
//   <div class="detailsInfo">

//     <div>
//       <br />
//       <h6><b>Base Tariff:</b>{props.cost}$</h6>
//       <h6><b>Seats Available:</b>{props.available_seats}</h6>
//       <br /><br />

//       <Link to={
//         {
//           pathname: "/ride/" + props.ride_id,

//         }
//       }>
//         View
//       </Link>
//     </div>
//     <img id="car" src={props.ride_image} alt="" />
//   </div>

// </div>

// );
//}

export default RidesListItem;