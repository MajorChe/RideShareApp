import { Heading, SimpleGrid } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AccountContext } from "../hooks/AccountContext";
import Navbar from "../Navbar";
import TripCard from "./TripCard";
import Moment from "react-moment";
import Footer from "../Footer";

const ViewTrips = () => {
  const {user, setUser} = useContext(AccountContext);
  const [trips, tripList] = useState([])
  console.log(user)
  useEffect(async () => {
    await axios.get(`/user/view/${user.id}`)
    .then((res) => {
      tripList(res.data.result)
      console.log("hello",res.data.result)
    })
  },[]);
  const ListTrips = trips.map((trip) => {
    const date = <Moment format="D MMM YYYY">{trip.date}</Moment>
    return <TripCard
    key={trip.booked_ride_id}
    ride_image={trip.ride_image}
    origin={trip.origin}
    destination={trip.destination}
    cost={"$" + trip.cost}
    date={date}
    seats_booked = {trip.seats_booked}
    status={trip.status}
    owner_image={trip.owner_image}
    owner_name={trip.owner_name}
    booked_ride_id={trip.booked_ride_id}
    booking_id={trip.booking_id}
    />
  })
  return (
    <>
      <Navbar />
      <Heading textAlign={"center"} mt={"30px"}>UPCOMING TRIPS</Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} mt={"50px"}>
        {ListTrips}
      </SimpleGrid>
      <Footer />
    </>
  );
};

export default ViewTrips;
