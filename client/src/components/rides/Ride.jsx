import React,{useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Ride.css';


function Ride({props}) {
  let {ride_id} = useParams();
  console.log(ride_id);
  const [rides, setRides] = useState({});
  useEffect(() => {
    axios.get("http://localhost:8000/ride",
      { params:
            {
              id:ride_id,
              }
      }).then((res) => {
        console.log("rides", res.data); 
        setRides(res.data)      
      });
    
  }, []);

  return (
    <div class="item_container">   
    <img id="avatar" src={rides.avatar} alt="" />
     <h1>Name : {rides.name}</h1>
     <h1>Contact : {rides.contact}</h1>
     
     <h2>Time : {rides.time_of_ride}</h2>

        <h2>Date : {rides.date_of_ride}</h2>
        <h6>Origin : {rides.origin} </h6>
        <h6>Destination : {rides.destination}</h6>
        <h6>Pick Up : {rides.pick_up} </h6>
        <h6>Drop Off : {rides.drop_off}</h6>
        <div class="d-grid gap-2 col-6 mx-auto">
          <button class="btn btn-primary" type="button">Button</button>
           
       </div>
  
    </div>
  );
}

export default Ride;