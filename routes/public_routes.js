const express = require('express')
const router = express.Router();
const userfn = require("../lib/queries/01_loginRegister")
require('dotenv').config()

module.exports = () => {
  router.get('/',(req,res) => {
    res.render("index");
  });
  
  router.get('/login',(req,res) => {
    const login_active = 'is-active';
    const register_active = null
    res.render("login",{login_active,register_active});
  });

  router.post('/register', (req,res) => {
    const {email,name,contact,password,confirm_password} = req.body;
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
    res.render('login', { errors, login_active,register_active});
    } else {
      userfn.postUser(email,name,contact,password)
      .then(result => {
        res.redirect("/");
      })
      .catch(err => {
        console.log(err)
      })
    }
});

router.get('/ridesShow',(req,res) => { 
  let api_key =  process.env.API_KEY;
  console.log("api",api_key);
  const from = null;
  const to= null;
  const seats=0;
  userfn.getRides(from,to,seats)
  .then(result => {
    let rides=result;
    console.log(rides);
    res.render('getRides',{ api_key ,rides ,from,to});
  }) 
  .catch(err => {
    console.log(err)
  })
 
});
router.post('/search',(req,res) => { 
  let api_key =  process.env.API_KEY;
  console.log("api",api_key);
  const from = req.body.from;
  const to= req.body.to;
  const seats = req.body.seats;
  console.log("post f,t,s",from)
  userfn.getRides(from,to,seats)
  .then(result => {
    let rides=result;
    console.log("in post",rides);
   
    res.render('getRides',{ api_key ,rides,from,to});
  }) 
  .catch(err => {
    console.log(err)
  })
 
});

  return router;
}

