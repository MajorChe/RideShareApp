import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./login/login";
import Register from "./login/register";
import Rides from "./rides/Rides";

function Views() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/rides" element={<Rides />} />
      </Routes>
    </>
  );
}

export default Views;
