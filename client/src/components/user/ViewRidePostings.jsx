import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar";
import PostRideCard from "./PostRideCard";
import { Heading, propNames, SimpleGrid } from "@chakra-ui/react";
import axios from "axios";
import { AccountContext } from "../hooks/AccountContext";

const ViewRidePostings = () => {
  const {user,setUser} = useContext(AccountContext);
  const [postingList,SetPostingList] = useState([]);
  const[bookings, SetAllBookings] = useState([]);
  useEffect(() => {
    axios.get(`/user/viewpostings/${user.id}`)
    .then((res) => {
      console.log("All postings",res.data.result);
      SetPostingList(res.data.result);
    })
  },[]);

  useEffect(() => {
    axios.get(`/user/viewpostings/bookings/${user.id}`)
    .then((res) => {
      SetAllBookings(res.data.result);
      console.log(res.data);
    })
  },[]);

  const postListings = postingList.map((posting,index) => {
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
        ride_id = {posting.ride_id}
        bookings={new_arr}
        is_active={posting.is_active}
        available_seats={posting.available_seats}
      />
    );
  })
  return (
    <>
      <Navbar />
      <Heading textAlign={"center"} mt={"30px"}>YOUR RIDE POSTINGS</Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} mt={"50px"}>
      {postListings}
      </SimpleGrid>
    </>
  );
};

export default ViewRidePostings;
