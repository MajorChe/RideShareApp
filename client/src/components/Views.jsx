import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Rides from "./rides/Rides";
import Ride from "./rides/Ride";
import Login from "./login/Login";
import Register from "./login/Register";
import Dashboard from "../components/user/Dashboard";
import ViewTrips from "./user/ViewTrips";
import PrivateRoutes from "./PrivateRoutes";
import { useContext } from "react";
import { AccountContext } from "./hooks/AccountContext";
import UserSettings from "./user/UserSettings";
import Trips from "./user/Trips";

function Views() {
  const { user } = useContext(AccountContext);
  return user.loggedIn === null ? (
    ""
  ) : (
    <Routes>
      {user.loggedIn && <Route path="/" element={<Dashboard />} />}
      {!user.loggedIn && <Route path="/" element={<Home />} />}
      {!user.loggedIn && <Route path="/login" element={<Login />} />}
      {!user.loggedIn && <Route path="/register" element={<Register />} />}
      <Route path="/rides" element={<Rides />} />
      <Route path="/ride/:ride_id" element={<Ride />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<UserSettings />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/trips/view" element={<ViewTrips />} />
      </Route>
    </Routes>
  );
}

export default Views;
