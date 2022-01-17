import { useContext } from "react";
import { AccountContext } from "./hooks/AccountContext";

const { Outlet, Navigate, useLocation } = require("react-router-dom");

const useAuth = () => {
  const {user} = useContext(AccountContext)
  return user && user.loggedIn;
};

const PrivateRoutes = () => {
  const location = useLocation();
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" replace state={{from: location}}/>;
};


export default PrivateRoutes;