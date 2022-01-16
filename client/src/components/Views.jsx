import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Login from "./login/Login";
import Register from "./login/Register";
import Dashboard from "./Dashboard";
import PrivateRoutes from "./PrivateRoutes";
import { useContext } from "react";
import { AccountContext } from "./hooks/AccountContext";

function Views() {
  const {user} = useContext(AccountContext)
  return user.loggedIn === null ? "" : (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
  );
}

export default Views;
