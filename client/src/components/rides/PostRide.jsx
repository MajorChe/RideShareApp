import React, { useEffect, useState } from 'react';
import axios from "axios";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  NumberInputField,
  NumberInput,
  NumberInputStepper,
  NumberIncrementStepper ,
  NumberDecrementStepper,
} from '@chakra-ui/react'; 
function PostRide() {
  // INSERT INTO rides (owner_id,origin,destination,available_seats,pick_up,drop_off,date_of_ride,time_of_ride,ride_image) 
  // VALUES (3,'Toronto, ON, Canada','Niagara Falls, ON, Canada',3,'126,Brook Street','2nd Avenue Niagra Falls City','2022-02-03','3:00
  // :00','https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500');                 

  const [owner_id, setOwnerId] = useState(1);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [available_seats, setAvailable_seats] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [image, setImage] = useState("");

  // useEffect(() => {
  //   axios.put("http://localhost:8000/ride",
  //     {
  //       params:
  //       {
  //         id: ,
  //       }
  //     }).then((res) => {
  //       console.log("rides", res.data);
  //       setRides(res.data)
  //     });

  // }, []);

  const [input, setInput] = useState('')

  const handleInputChange = (e) => setInput(e.target.value)

  const isError = input === '';

  return (

    <FormControl isInvalid={isError} isRequired>
      <FormLabel htmlFor='email'>Email</FormLabel>
      <Input id='email' type='email' value={input} onChange={handleInputChange} />
      {!isError ? (
        <FormHelperText>
          Enter the email you'd like to receive the newsletter on.
        </FormHelperText>
      ) : (
        <FormErrorMessage>Email is required.</FormErrorMessage>
      )}
      <NumberInput max={6} min={1}>
        <NumberInputField id='amount' />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>


    </FormControl>



  );
}
export default PostRide;
