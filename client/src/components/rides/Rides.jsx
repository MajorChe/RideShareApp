import React, { useState, useEffect } from 'react';
import Map from './Map';
import axios from 'axios';
import RidesList from './RidesList';
import Moment from 'react-moment';
import Navbar from '../Navbar';
import { Box, Center, Divider, Flex, Heading, Spacer, Text, useColorModeValue } from '@chakra-ui/react'
import Footer from '../Footer';
function Rides() {
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [search, setSearch] = useState("");
  const [rides, setRides] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [only, setOnly] = useState(false);
  const [note, setNote] = useState("All the rides listed");
  let exact = "false";
  let format = "";
  if (selectedDate) {
    let month = selectedDate.getUTCMonth() + 1; //months from 1-12
    let day = selectedDate.getUTCDate();
    let year = selectedDate.getUTCFullYear();
    format = selectedDate.toUTCString();
    console.log(format);
  } else {
    format = "";
  }
  useEffect(() => {
    setRides([]);
    setNote("");
    setNote(`Showing 0 Ride Options For ${address2} To ${address1}`);    
    if (only) {
      exact = "exact";
    }
    
    axios.get("/getRides",
      {
        params:
        {
          only: exact,
          from: address1,
          to: address2,
          date: format,
        }
      })     
      .then((res) => {
        console.log("rides in search", res.data);
        setRides(res.data);
        setSelectedDate(null);
        setOnly(false);
        setNote(`Showing ${res.data.length} Ride Options to ${address2} from ${address1} `);

      }).catch((err) => {
        console.log("error in finding rides");
      }
      );
  }, [search]);
  useEffect(() => {
    axios.get("/getRides",
      {
        params:
        {
          from: "initial",
          to: "",
          date: "",
        }
      }).then((res) => {
        console.log("rides", res.data);
        setRides(res.data);
        setNote(`Listing All Available Rides `);
      });
  }, []);
  function updateAdress1(address) {
    setAddress1(address);
    console.log(address1);
  }
  function updateAdress2(address) {
    setAddress2(address);
    console.log(address2);
  }
  function updateSearch(search) {
    setSearch(search);
    console.log(search);
  }
  function updateSelectedDate(date) {
    setSelectedDate(date);
    console.log(date);
  }
  function updateOnly(val) {
    setOnly(val);
    console.log("only", only);
  }
  return (
    <>    
      <Navbar />
      <Flex bg={useColorModeValue('white', 'white')} direction={"column"}>
      <Heading textAlign={"center"} mt={"30px"}>SEARCH FOR RIDES</Heading>
      <Map
        updateAdress1={updateAdress1}
        updateAdress2={updateAdress2}
        adresss1={address1} adresss2={address2}
        selectedDate={selectedDate} updateSelectedDate={updateSelectedDate}
        only={only} updateOnly={updateOnly}
        updateSearch={updateSearch}
      />
      </Flex>
      <hr style={{height:"5px", color:"black", backgroundColor:"black"}}></hr>
      <Center mt={"20px"}>
        <Box borderColor='gray.600' w='80rem' color={'black'} rounded='md' bg='white'>
          <Text textAlign={"center"} fontWeight={"bold"} fontSize={"30px"}>{note}</Text>
        </Box>
      </Center>
      <RidesList rides={rides} />
      <br></br>
      <br></br>
      <Footer/>
    </>
  );
}
export default Rides;
