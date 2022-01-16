import React from 'react';
import './RidesListItem.css';


function RidesListItem(props) {
  return (
      
    <div class="rideContainer">
      <div class="driverInfo">

        <img id="avatar" src={props.avatar} alt=""/>
          <div>
            <br/>
              <h2>{props.name}</h2><br/>
                <h6><i class="fas fa-phone"></i>  {props.contact}</h6>
                {/* <h6 {{style="color: rgb(255, 115, 0);"}}><i class="fas fa-star"></i>  4.5</h6> */}
              </div>
          </div>
          <div class="rideInfo">
            <br/>
              <p><b>{props.date_of_ride}</b>&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;<b>{props.time_of_ride}</b></p>
              <h6><b>Origin:</b>{props.origin} </h6>
              <h6><b>Destination:</b> {props.destination}</h6>
              <h6><b>Pick Up:</b>{props.pick_up} </h6>
              <h6><b>Drop Off:</b>{props.drop_off}</h6>
          </div>
          <div class="detailsInfo">

            <div>
              <br/>
                <h6><b>Base Tariff:</b>{props.cost}$</h6>
                <h6><b>Seats Available:</b>{props.available_seats}</h6>
            </div>
            <img id="car" src={props.ride_image} alt="" />
          </div>
      </div>
    
      );
    }

      export default RidesListItem;