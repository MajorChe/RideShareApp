import React, { useEffect, useState } from "react";
import axios from "axios";

function About() {
  const [name, setName] = useState("name");
  useEffect(() => {
    axios.get("http://localhost:8888/ride").then((res) => {
      console.log(res.data);
      setName(res.data.name)
    });
    
  }, []);
  return (
    <div>
      <h1>About Page</h1>
      <h3>{name}</h3>
    </div>
  );
}

export default About;
