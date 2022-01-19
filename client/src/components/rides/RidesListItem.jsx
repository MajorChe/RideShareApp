import React from 'react';
import './RidesListItem.css';
import {Link} from "react-router-dom";

function RidesListItem(props) {


  let format= new Date(props.date_of_ride).toUTCString();
  console.log(format);
  var month =  new Date(props.date_of_ride).getUTCMonth() + 1; //months from 1-12
  var day =  new Date(props.date_of_ride).getUTCDate();
  var year =  new Date(props.date_of_ride).getUTCFullYear();
  let formatted = day + "-" + month + "-" + year;
  console.log(formatted);
  return (

    <div class="rideContainer">
      <div class="driverInfo">

        <img id="avatar" src={props.avatar} alt="" />
        <div>
          <br />
          <h2>{props.name}</h2><br />
          <h6><i class="fas fa-phone"></i>  {props.contact}</h6>
          {/* <h6 {{style="color: rgb(255, 115, 0);"}}><i class="fas fa-star"></i>  4.5</h6> */}
        </div>
      </div>
      <div class="rideInfo">
        <br />
        <p><b>Date :</b>{formatted}&nbsp;&nbsp; &nbsp; <b>Time :</b>{props.time_of_ride}</p>
        <h6><b>From:</b>{props.origin} </h6>
        <h6><b>To:</b> {props.destination}</h6>
        <h6><b>Pick Up:</b>{props.pick_up} </h6>
        <h6><b>Drop Off:</b>{props.drop_off}</h6>

      </div>
      <div class="detailsInfo">

        <div>
          <br />
          <h6><b>Base Tariff:</b>{props.cost}$</h6>
          <h6><b>Seats Available:</b>{props.available_seats}</h6>
          <br /><br />
         
          <Link to={
            {
              pathname: "/ride/" + props.ride_id,
              
            }
          }>
            View
          </Link>
        </div>
        <img id="car" src={props.ride_image} alt="" />
      </div>

    </div>

  );
}

export default RidesListItem;