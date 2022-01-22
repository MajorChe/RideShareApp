import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AccountContext } from "../hooks/AccountContext";
import axios from 'axios';
import './Ride.css';
import {
  Avatar, Box, Button, Center, Container, VStack, Flex, FormControl, Image, InputGroup, NumberInput, Text,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormHelperText,
  HStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react'
import Moment from 'react-moment';
import Navbar from '../Navbar';
import { CalendarIcon, InfoIcon, PhoneIcon, TimeIcon } from '@chakra-ui/icons';
function Ride({ props }) {
  let { ride_id } = useParams();
  console.log(ride_id);
  const [rides, setRides] = useState({});
  const [seats, setSeats] = useState("1");
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [successInfo, setSuccessInfo] = useState([]);
  const { user } = useContext(AccountContext);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure()


  useEffect(() => {
    axios.get("/ride",
      {
        params:
        {
          id: ride_id,
        }
      }).then((res) => {
        console.log("rides", res.data);
        setRides(res.data)
      });
  }, []);


  function book() {      
     if(!user.loggedIn){
        navigate('/login');      
     }      
     setLoading(true);
      console.log(ride_id, rides.available_seats - seats,user.id,seats);
      axios.put("/book/update",
        {
          params:
          {
            ride_id: ride_id,
            available_seats: rides.available_seats - seats,
          }
        })
        .then((res) => {
          console.log("new booking", res.data);
          axios.post("/book/new",
            {
              params:
              {
                rider_id: user.id,
                ride_id: ride_id,
                seats: seats,
              }
            }).then((res) => {
              setLoading(false);
              console.log("rides", res.data);
              // navigate("/rides");
              setSuccessful(true);
              setSuccessInfo(res.data);
            }).catch(()=>{
              setLoading(false)
            })

        }).catch(()=>{
          setLoading(false)
        });  
  }
  function closeEvent()
  {
    setSuccessful(false);
    navigate('/trips/view');
  }
  return (
    <>
      <Navbar />
      <Center>
        <VStack>
          <Text fontSize='50px' mt={5} mb={5}>RIDE DETAILS</Text>
          <Box mt={5} w={"50rem"} boxShadow='dark-lg' p={8} rounded='md' bg='white'>
            <Flex direction={"row"} mt={10}>
              <VStack textAlign={'left'} spacing={5}>
                <Image w={'300px'} id="image" src={rides.ride_image} pl={10} alt="" />
                <Flex direction={"column"} ml={30} mt={5} spacing={5}>
                  <Text fontWeight={"small"} ><CalendarIcon/>  <Moment format="D MMM YYYY">{rides.date_of_ride}</Moment></Text>
                  <Text fontWeight={"small"}><TimeIcon/>  {rides.time_of_ride}</Text>
                </Flex>
              </VStack>
              <Box  >
                < VStack spacing={5} textAlign={'start'} mr={5}>
                  <h2 ><b>Origin </b></h2>
                  <h2>{rides.origin}</h2>
                  <h2><b>Destination </b></h2>
                  <h2>{rides.destination}</h2>
                  <HStack>
                    <h2><b>Seats </b></h2>
                    <FormControl >
                      <InputGroup>
                        <NumberInput size='sm' maxW={16} defaultValue={1} min={1}
                          onChange={seats => setSeats(seats)}
                          value={seats}
                          max={rides.available_seats}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </InputGroup>
                    </FormControl>
                  </HStack>
                  <Text fontWeight={"bold"}>Cost $:{rides.cost}</Text>
                </VStack>
              </Box>
              
                <VStack>
                
                <Avatar ml={5} size='5xl' id="image" src={rides.avatar} alt="" />
                <Text ml={5}>{rides.name}</Text>
                <Text ml={5} spacing={5}><PhoneIcon /> {rides.contact}</Text>
             
           
              </VStack>
            </Flex>
          </Box>
          <Button onClick={book} disabled={loading}  colorScheme='teal' p={"40px"} w={"800px"}>{loading?"Requesting...":"Book "}</Button>
         
         <Modal onClose={closeEvent } isOpen={successful} isCentered>
         <ModalOverlay />
         <ModalContent>
          <ModalHeader>Booking Info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Booking Id : {successInfo.booking_id}
            <br/>
            Booking Status : {successInfo.booking_status}
          </ModalBody>
          
        </ModalContent>
      </Modal>
        </VStack>
      </Center>
    </>
  );
}

export default Ride;