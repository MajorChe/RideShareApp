import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Rides from "./rides/Rides";
import Ride from "./rides/Ride";
import Login from "./login/Login";
import Register from "./login/Register";
import Dashboard from "../components/user/Dashboard";
import ViewTrips from "./user/ViewTrips";
import PostRide from "./rides/PostRide"
import PrivateRoutes from "./PrivateRoutes";
import { useContext } from "react";
import { AccountContext } from "./hooks/AccountContext";
import UserSettings from "./user/UserSettings";
import ErrorPage from "./ErrorPage";
import ViewRidePostings from "./user/ViewRidePostings";
import { TechStack } from "./TechStack";

function Views() {
  const { user } = useContext(AccountContext);
  return user.loggedIn === null ? (
    ""
  ) : (
    <Routes>
      {user.loggedIn && <Route path="/" element={<Dashboard />} />}
      <Route path="/1" element={<TechStack />} />
      {!user.loggedIn && <Route path="/" element={<Home />} />}
      {!user.loggedIn && <Route path="/login" element={<Login />} />}
      {!user.loggedIn && <Route path="/register" element={<Register />} />}
      <Route path="/rides" element={<Rides />} />
      <Route path="/ride/:ride_id" element={<Ride />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<UserSettings />} />
        <Route path="/trips/view" element={<ViewTrips />} />
        <Route path="/trips/postings" element={<ViewRidePostings />} />
        <Route path="/postRide" element={<PostRide />} />
        
      </Route>
      <Route path="/*" element={<ErrorPage />}/>
    </Routes>
  );
}

export default Views;
