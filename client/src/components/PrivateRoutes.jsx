import { useContext } from "react";
import { AccountContext } from "./hooks/AccountContext";

const { Outlet, Navigate } = require("react-router-dom");

const useAuth = () => {
  const {user} = useContext(AccountContext)
  return user && user.loggedIn;
};

const PrivateRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};


export default PrivateRoutes;