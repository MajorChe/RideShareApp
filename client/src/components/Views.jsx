import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./login/login";
import Register from "./login/register";
import Rides from "./rides/Rides";
import Ride from "./rides/Ride";

function Views() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/rides" element={<Rides />} />
        <Route path="/ride/:ride_id" element={<Ride />} />
      </Routes>
    </>
  );
}

export default Views;
