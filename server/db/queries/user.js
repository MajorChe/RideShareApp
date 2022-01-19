const pool = require("../db");

const getUser = (email) => {
  return pool
    .query(`SELECT * FROM users WHERE email = $1`, [email])
    .then((response) => response.rows[0])
    .catch((err) => console.log("Error is:", err));
};

const postUser = (email, password) => {
  return pool
    .query(
      `INSERT INTO users (contact,name,email,password) VALUES ($1,$2,$3,$4) RETURNING *;`,
      [1,"test",email, password]
    )
    .then((response) => {
      console.log(response.rows[0]);
      return response.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { getUser, postUser };
