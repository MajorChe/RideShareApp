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
import {useNavigate} from 'react-router-dom';


function PostRide() {
  const navigate = useNavigate();
  const { user } = useContext(AccountContext);
  const [seats, setSeats] = useState("1");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [image, setImage] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

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
        time_of_ride: " 23:35:44",
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
      <div id="details">
        <form onSubmit={handleSubmit} class="form-horizontal">
          <FormControl >
            <Stack spacing={5}>

              <Places updateAdress={updateAdress1} adresss1={address1} location={"from"} />
              <Places updateAdress={updateAdress2} adresss1={address2} location={"to"} />
              <InputGroup>
                <FormLabel>Date</FormLabel>
                <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} minDate={new Date()} />
              </InputGroup>
              <InputGroup>
                <FormLabel>Seats</FormLabel>
                <Menu>
                  {({ isOpen }) => (
                    <>
                      <MenuButton isActive={isOpen} as={Button} >
                        {isOpen ? seats : seats}
                      </MenuButton>
                      <MenuList>
                        <MenuItem onClick={() => setSeats(1)}>1</MenuItem>
                        <MenuItem onClick={() => setSeats(2)}>2</MenuItem>
                        <MenuItem onClick={() => setSeats(3)}>3</MenuItem>
                        <MenuItem onClick={() => setSeats(4)}>4</MenuItem>
                      </MenuList>
                    </>
                  )}
                </Menu>
              </InputGroup>

              <TimePicker
                placeholder="Select Time"
                use24Hours
                showSecond={true}
                focusOnOpen={true}
                format="hh:mm"
                onChange={e => setSelectedTime(e.format('HH:mm:ss'))}
              />

            </Stack>
            <div class="col-12">
              <button type="submit" class="btn btn-primary">Post</button>
            </div>
          </FormControl >
        </form>
      </div>
    </>


  );
}
export default PostRide;
