const express = require('express')
const router = express.Router();
const userfn = require("../lib/queries/01_loginRegister")
require('dotenv').config();
var axios = require("axios");

module.exports = () => {
  router.get('/', (req, res) => {
    res.render("index");
  });

  router.get('/login', (req, res) => {
    const login_active = 'is-active';
    const register_active = null
    res.render("login", { login_active, register_active });
  });

  router.post('/register', (req, res) => {
    const { email, name, contact, password, confirm_password } = req.body;
    let errors = [];

    if (password != confirm_password) {
      errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
      let login_active = null;
      let register_active = 'is-active';
      res.render('login', { errors, login_active, register_active });
    } else {
      userfn.postUser(email, name, contact, password)
        .then(result => {
          res.redirect("/");
        })
        .catch(err => {
          console.log(err)
        })
    }
  });

  router.get('/ridesShow', (req, res) => {
    let api_key = process.env.API_KEY;
    console.log("api", api_key);
    const from = null;
    const to = null;
    const seats = 0;

    userfn.getRides(from, to, seats)
      .then(result => {
        let rides = result;
        console.log(rides);
        res.render('getRides', { api_key, rides, from, to });
      })
      .catch(err => {
        console.log(err)
      })
  });

  
  router.post('/ridesShow', (req, res) => {
    let api_key = process.env.API_KEY;
    console.log("api", api_key);   
    const from = req.body.from;
    const to = req.body.to;
    const seats = req.body.seats;
    let rides;
    //get all rides from db based on frm to and seats 
    //:pending date,is_booked ,is_active to be added 
    userfn.getRides(from, to, seats)
      .then(result => {
        rides = result;
        let rides_result = result;
        console.log("in post", result);
        //=====
        if (result.length === 0) {
          let rides1=[];
          // console.log("in post if");
          userfn.getRides(null, null, 0)
            .then(result2 => {
              rides = [];
              console.log("in post result", rides);
              let axios_dist = [];
              //compute distance for each entry and then only render based on distance < 50
              for (const ride of result2) 
              {
                var config = {
                  method: 'get',
                  url: `https://maps.googleapis.com/maps/api/directions/json?origin=${ride.origin}&destination=${from}&units=metric&mode=driving&key=${api_key}`,
                  headers: {}
                };
                axios(config)
                  .then(function (response) {
                    let obj = JSON.stringify(response.data);
                    const object = JSON.parse(obj);
                    let distance = object.routes[0].legs[0].distance.text.split(" ")[0];
                    //console.log(distance);
                    //console.log("ride", ride);
                    axios_dist.push(distance);
                    if (Number(distance)< 50) {
                      rides.push(ride);                      
                      //console.log("rides",rides);  
                    }
                    //console.log("axios_dist",axios_dist);
                    if(axios_dist.length===result2.length){
                      res.render('getRides', { api_key, rides, from, to });   
                    }
                  })      
              }//for             
            })      
        } else {
          // console.log("after if post result", rides);
          res.render('getRides', { api_key, rides, from, to });
        }
      })
      .catch(err => {
        console.log(err)
      })
  });
  return router;
}

