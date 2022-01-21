import React, { useEffect, useState } from 'react';
import axios from "axios";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  FormLabel,
  FormControl,
  InputGroup,
  FormHelperText,
  FormErrorMessage,
  Heading,
  HStack,
  Container,
  Box,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Center,
  Text,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
import { Button } from "@chakra-ui/react";
import 'react-datepicker/dist/react-datepicker.css'
import { useContext } from "react";
import { AccountContext } from "../hooks/AccountContext";
import DatePicker from "react-datepicker";
import Navbar from '../Navbar';
import TimePicker from "rc-time-picker";
import 'rc-time-picker/assets/index.css';
import { Select } from '@chakra-ui/react'
import Places from './Places';
import "./Post.css";
import { useNavigate } from 'react-router-dom';


function PostRide() {
  const navigate = useNavigate();
  const { user } = useContext(AccountContext);
  const [seats, setSeats] = useState("1");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [image, setImage] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const isError = selectedTime === '';
  const isErrorDate = selectedDate === '';
  const isErrorSeats = seats === '';
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);

  const format = (val) => `$` + val;
  const parse = (val) => val.replace(/^\$/, '');
  console.log(selectedDate);

  function closeEvent()
  {
    setSuccessful(false);
    navigate('/rides');
  }
  const post = (e) => {
    e.preventDefault();
    setLoading(true);
    var month = selectedDate.getUTCMonth() + 1; //months from 1-12
    var day = selectedDate.getUTCDate();
    var year = selectedDate.getUTCFullYear();
    let format = year + "-" + month + "-" + day;

    axios.post("/postRide", {

      params:
      {
        owner_id: user.id,
        origin: address1,
        destination: address2,
        available_seats: seats,
        date_of_ride: format,
        time_of_ride: selectedTime,
        ride_image: image,
      }
    })
      .then((res) => {
        setLoading(false);
        console.log("here",res);        
        setSuccessful(true);
      })
        .catch(()=>{
          setLoading(false);
        })
       
      
  }
  function updateAdress1(address1) {
    setAddress1(address1);
    console.log(address1);
  }
  function updateAdress2(address2) {
    setAddress2(address2);
    console.log(address2);
  }
  return (
    <>
    <Navbar />   
    <Center py={6}>
    <VStack> 
    <Text fontSize='4xl' mt={5} mb={5}>Ride Details</Text> 
    <Box  boxShadow ={'dark-lg'}
      rounded={'md'}
      p={6}
      overflow={'hidden'}>
        
      <Container maxW='container.xl' centerContent>
        <Box padding='5'  mt='5'>
          

            <FormControl >
              <Stack spacing={3}>                
                <Places 
                  updateAdress={updateAdress1} 
                  adresss1={address1} 
                  location={"from"} 
                  place={"pick-up"} />

                <Places 
                  updateAdress={updateAdress2} 
                  adresss1={address2} 
                  location={"to"} 
                  place={"drop-off"} />


                <HStack spacing='10px'>
                  <FormControl isInvalid={isErrorDate}>
                    <InputGroup>
                      <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} minDate={new Date()} />
                    </InputGroup>
                    <FormHelperText>Required</FormHelperText>
                  </FormControl>

                  <FormControl isInvalid={isErrorSeats}>
                    <InputGroup>
                      <NumberInput size='sm' maxW={16} defaultValue={1} min={1}
                        onChange={seats => setSeats(seats)}
                        value={seats}
                        max={4}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </InputGroup>
                    <FormHelperText>Seats</FormHelperText>
                  </FormControl>

                  <FormControl isInvalid={isError}>

                    <TimePicker
                      placeholder="Select Time"
                      use24Hours
                      showSecond={false}
                      focusOnOpen={true}
                      format="HH:mm"
                      onChange={e => setSelectedTime(e.format('HH:mm'))}
                    />
                    <FormHelperText>Required</FormHelperText>

                  </FormControl>
                </HStack>
              </Stack>

              <br />
              
              
            
             

            </FormControl >
            <Button onClick={post} disabled={loading} colorScheme='teal' p={"40px"} w={"800px"} >{loading?"Requesting...":"Post Ride "}</Button>

        <Modal onClose={closeEvent} isOpen={successful} isCentered>
         <ModalOverlay />
         <ModalContent>
          
          <ModalCloseButton />
          <ModalBody>
            <br/>
          Your Ride is Succesfully posted!
          <br/>
          </ModalBody>
          
        </ModalContent>
      </Modal>
          
        </Box>
      </Container> 
      
    </Box>
   </VStack>
    </Center>
    </>


  );
}
export default PostRide;
