const pool = require("../db");

const getUser = (email) => {
  return pool
    .query(`SELECT * FROM users WHERE email = $1`, [email])
    .then((response) => response.rows[0])
    .catch((err) => console.log("Error is:", err));
};

const postUser = (name, email, password) => {
  return pool
    .query(
      `INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING *;`,
      [name, email, password]
    )
    .then((response) => {
      console.log(response.rows[0]);
      return response.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const updateUser = (id, name, email, password, contact) => {
  return pool
    .query(
      `UPDATE users SET name=$1, email=$2, password=$3, contact=$4 WHERE id = $5 RETURNING *;`,
      [name, email, password, contact, id]
    )
    .then((response) => {
      console.log(response.rows[0]);
      return response.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { getUser, postUser, updateUser };
