import { Routes, Route, Link, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import About from "./components/About";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  // const [currentUser, setCurrentUser] = useState(null);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const login = () => {
  //   axios.post("http://localhost:8888/login").then((res) => setCurrentUser(res.data));
  // };
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
