import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar";
import PostRideCard from "./PostRideCard";
import { Heading, propNames, SimpleGrid } from "@chakra-ui/react";
import axios from "axios";
import { AccountContext } from "../hooks/AccountContext";

const ViewRidePostings = () => {
  const {user,setUser} = useContext(AccountContext);
  const [postingList,SetpostingList] = useState([]);
  const[bookings, SetAllBookings] = useState([]);
  useEffect(() => {
    axios.get(`/user/viewpostings/${user.id}`)
    .then((res) => {
      console.log(res.data.result);
      SetpostingList(res.data.result);
    })
  },[]);

  useEffect(() => {
    axios.get(`/user/viewpostings/bookings/${user.id}`)
    .then((res) => {
      SetAllBookings(res.data.result);
      console.log(res.data);
    })
  },[]);

  const postListings = postingList.map((posting,index) => { //ride_id of 1 and ride_id of 3
    const new_arr = [];
    for (let booking of bookings) {
      if(booking.ride_id === posting.ride_id) {
        new_arr.push(booking);
      }
    }
    return(
      <PostRideCard 
        key={index}
        id={index + 1}
        origin={posting.origin}
        destination={posting.destination}
        bookings={new_arr}
      />
    );
  })
  return (
    <>
      <Navbar />
      <Heading mt={"50px"} textAlign={"center"}>Your Ride Postings</Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} mt={"50px"}>
      {postListings}
      </SimpleGrid>
    </>
  );
};

export default ViewRidePostings;
