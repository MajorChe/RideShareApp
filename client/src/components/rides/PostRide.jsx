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
  const format = (val) => `$` + val;
  const parse = (val) => val.replace(/^\$/, '');
  console.log(selectedDate);
  const handleSubmit = (e) => {
    e.preventDefault();

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
        if (!res) return;
        console.log(res.data);
        return res.data;
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
      <Container maxW='container.xl' centerContent>
        <Box padding='10' bg='gray.100' maxW='4xl' mt='10'>
          <form onSubmit={handleSubmit} class="form-horizontal">

            <FormControl >
              <Stack spacing={3}>
                <Heading as='h3' size='lg' isTruncated>
                  Post Ride
                </Heading>
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
                  <FormControl isInvalid={isError}>
                    <InputGroup>
                      <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} minDate={new Date()} />
                    </InputGroup>
                    <FormErrorMessage>Required</FormErrorMessage>
                  </FormControl>

                  <FormControl >
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
                    <FormErrorMessage>Required</FormErrorMessage>

                  </FormControl>
                </HStack>
              </Stack>

              <br />
              <div class="d-grid gap-2">
                <button type="submit" class="btn btn-block btn-dark">Post</button>
              </div>

            </FormControl >
          </form>
        </Box>
      </Container>    
    </>


  );
}
export default PostRide;
