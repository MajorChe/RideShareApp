const express = require("express");
const router = express.Router();
const pool = require("../db/db");

var axios = require("axios");

module.exports = () => {
  router.get("/", (req, res, next) => {
    let from= req.query.from;
    let to =req.query.to;    
   
    console.log("from",from);
    console.log("to",to);

    const queryParams = [];
        let queryString = `SELECT rides.*,users.name,users.avatar,users.contact,
                            to_char(date_of_ride, 'DD/MM/YYYY') as date
                            FROM rides
                            JOIN users ON users.id = rides.owner_id 
                            WHERE 1=1 `;        
        return pool
              .query(queryString, queryParams)
              .then((response) => {        
                return response.rows;
              })
              .then(result2 => {

                if(!from){
                  console.log("initial rendering type",typeof(rides));
                  res.json(result2) ;
                }
                else
                {
                  rides = [];
                  console.log("in post result", result2);
                  let axios_dist = [];
                  //compute distance for each entry and then only render based on distance < 50
                  for (const ride of result2) 
                  {
                    var config = {
                        method: 'get',
                        url: `https://maps.googleapis.com/maps/api/directions/json?origin=${ride.origin}&destination=${from}&units=metric&mode=driving&key=${process.env.KEY}`,
                        headers: {}
                        };
                    axios(config)
                      .then(function (response) {
                        let obj = JSON.stringify(response.data);
                        const object = JSON.parse(obj);
                        let distance = object.routes[0].legs[0].distance.text.split(" ")[0];
                        // console.log("distance",distance);
                        // console.log("ride", ride);
                        axios_dist.push(distance);
                        if (Number(distance)< 50) {
                          rides.push(ride);                      
                          console.log("rides",rides);  
                        }
                        console.log(axios_dist);
                        if(axios_dist.length===result2.length){
                          console.log("rides after dista axios",rides);
                          console.log(typeof(rides));                          
                          res.json(rides);   
                        }                      
                    })  //axios    
                  }//for 
              
                }
              })            
          });
          return router;
        };
    
  


