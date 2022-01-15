const pool = require("../db");

const getUser = (email) => {
  return pool
    .query(`SELECT * FROM users WHERE email = $1`, [email])
    .then((response) => response.rows[0])
    .catch(err => console.log("Error is:",err))
};

module.exports = {getUser}


