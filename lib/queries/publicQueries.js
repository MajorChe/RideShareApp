const pool = require("../db");

const postUser = (email, name, contact, password) => {
  return pool
    .query(
      `INSERT INTO users (email,name,contact,password) VALUES ($1,$2,$3,$4) RETURNING *;`,
      [email, name, contact, password]
    )
    .then((response) => {
      console.log(response.rows[0]);
      return response.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getUser = (email) => {
  return pool
    .query(`SELECT * FROM users WHERE email = $1`, [email])
    .then((response) => {
      return response.rows[0];
    });
};


module.exports = {postUser,getUser}