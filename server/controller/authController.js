const bcrypt = require("bcryptjs");
const userfn = require("../db/queries/user");

const checkCookies = async (req,res) => {
  if(req.session.user && req.session.user.email) {
    console.log("loggedin")
    await res.json({ loggedIn: true, email: req.session.user.email})
  } else {
    await res.json({ loggedIn: false})
  }
}

const handleLogin = async (req,res) => {
  userfn.getUser(req.body.email).then(async(result) => {
    if (result) {
      const checkPassword = await bcrypt.compare(req.body.password, result.password);
      if (checkPassword) {
        req.session.user = {
          email: req.body.email,
          id: result.id,
        };
        res.json({ loggedIn: true, status: req.body.email });
      } else {
        console.log("password doesnt match");
        res.json({ loggedIn: false, status: "Wrong email or password" });
      }
    } else {
      console.log("Wrong email");
      res.json({ loggedIn: false, status: "Wrong email or password" });
    }
  });
}

const handleRegister = async (req,res) => {
  userfn.getUser(req.body.email).then(async (result) => {
    if (result) {
      res.json({ loggedIn: false, status: "email exists!! Please login" });
    } else {
      const hashedpassword = await bcrypt.hash(req.body.password, 12);
      userfn.postUser(req.body.email, hashedpassword).then((result) => {
        req.session.user = {
          email: req.body.email,
          id: result.id,
        };
        res.json({ loggedIn: true, email: req.body.email });
      });
    }
  });
}

const handleLogout = (req,res) => {
  res.clearCookie("sid");
  res.json({loggedIn: false})
}

module.exports = {handleLogin, handleRegister, checkCookies, handleLogout}