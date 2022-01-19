import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Ride.css';


function Ride({ props }) {
  let { ride_id } = useParams();
  console.log(ride_id);
  const [rides, setRides] = useState({});
  useEffect(() => {
    axios.get("/ride",
      {
        params:
        {
          id: ride_id,
        }
      }).then((res) => {
        console.log("rides", res.data);
        setRides(res.data)
      });

  }, []);



  return (
    <div class="item_container">
        
      <div id="ride-info">

        <div>
          <img id="image" src={rides.ride_image} alt="" />
        </div>
        <div>
          <h2>Origin : {rides.origin}</h2>
          <h2>Destination : {rides.destination}</h2>
          <h2>Date : {rides.date_of_ride}</h2>
          <h2>Time : {rides.time_of_ride}</h2>           
          <h6>Pick Up : {rides.pick_up} </h6>
          <h6>Drop Off : {rides.drop_off}</h6>
        </div>

      </div>

      <div id="driver-info">
        <div>
          <img id="image" src={rides.avatar} alt="" />
        </div>
        <div>
          <h2>Name : {rides.name}</h2>
          <h2>Contact : {rides.contact}</h2>
         <br/>
     
          <div class="d-grid gap-2 col-6 mx-auto">
            <button class="btn btn-primary" type="button">Book</button>
          </div>
        </div>
      </div>
    </div>
      );
}

export default Ride;