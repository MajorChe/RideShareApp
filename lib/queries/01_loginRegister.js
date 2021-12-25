const pool = require("../db");

const postUser = (email, name, contact, password) => {
  return pool
    .query(
      `INSERT INTO users (email,name,contact,password) VALUES ($1,$2,$3,$4);`,
      [email, name, contact, password]
    )
    .then((response) => {
      return;
    })
    .catch((err) => {
      console.log(err.message);
    });
};


module.exports = {postUser}