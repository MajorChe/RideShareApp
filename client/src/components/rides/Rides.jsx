import React, { useState, useEffect } from 'react';
import Map from './Map';
import axios from 'axios';
import RidesList from './RidesList';

function Rides() {

  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [search, setSearch] = useState("");
  const [rides, setRides] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/getRides",
      { params:
            {
              from: address1,
              to: address2
            }
      }).then((res) => {
        console.log("rides", res.data);
        setRides(res.data);
        
      });

  }, [search]);
  useEffect(() => {
    axios.get("http://localhost:8000/getRides",
      { params:
            {
              from:"",
              to: "",
            }
      }).then((res) => {
        console.log("rides", res.data);
        setRides(res.data);
      });
    
  }, []);

  function updateAdress1(address) {
    setAddress1(address);
    console.log(address1);
  }

  function updateAdress2(address) {
    setAddress2(address);
    console.log(address2);
  }
  function updateSearch(search) {
    setSearch(search);
    console.log(search);
  }

  return (
    <div>
      <Map updateAdress1={updateAdress1} updateAdress2={updateAdress2} adresss1={address1} adresss2={address2} 
      updateSearch={updateSearch}/>

      <RidesList rides={rides} />

    </div>

  );
}

export default Rides;