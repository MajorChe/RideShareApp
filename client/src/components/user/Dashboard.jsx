import { Heading } from '@chakra-ui/react';
import React from 'react'
import Footer from '../Footer';
import Navbar from "../Navbar";
import UserMetrics from './UserMetrics';
import ViewTrips from './ViewTrips';


function Dashboard() {
  return (
    <>
      <Navbar />
      <UserMetrics />
      <Heading textAlign={"center"} mt={"30px"}>COMPLETED RIDES</Heading>
      <Footer/>
    </>
  )
}

export default Dashboard
