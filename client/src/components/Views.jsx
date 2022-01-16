import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./login/Login";
import Register from "./login/Register";
import Dashboard from "./Dashboard"

function Views() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default Views;
