import { useNavigate } from "react-router";
import axios from "axios";

const { createContext, useState, useEffect } = require("react");

export const AccountContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState({ loggedIn: null });
  useEffect(() => {
    axios.get("/auth/login").then((res) => {
      if (res.data.loggedIn) {
        setUser({ ...res.data });
      } else {
        setUser({ loggedIn: false });
      }
    });
  }, []);
  
  return (
    <AccountContext.Provider value={{ user, setUser }}>
      {children}
    </AccountContext.Provider>
  );
};

export default UserContext;
