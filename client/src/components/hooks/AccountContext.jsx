import { useNavigate } from "react-router";
import axios from "axios";

const { createContext, useState, useEffect } = require("react");

export const AccountContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState({ loggedIn: null });
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("/auth/login").then((res) => {
      if (res.data.loggedIn) {
        setUser({ ...res.data });
      } else {
        setUser({ loggedIn: false });
      }
    });
  }, []);
  // useEffect(() => {
  //   fetch("/auth/login", {
  //     credentials: "include",
  //   })
  //     .catch(err => {
  //       setUser({ loggedIn: false });
  //       return;
  //     })
  //     .then(r => {
  //       if (!r || !r.ok || r.status >= 400) {
  //         setUser({ loggedIn: false });
  //         return;
  //       }
  //       return r.json();
  //     })
  //     .then(data => {
  //       if (!data) {
  //         setUser({ loggedIn: false });
  //         return;
  //       }
  //       setUser({ ...data });
  //     });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  return (
    <AccountContext.Provider value={{ user, setUser }}>
      {children}
    </AccountContext.Provider>
  );
};

export default UserContext;
