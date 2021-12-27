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

const getRides = (from,to,seats) => {
  const queryParams = [];
  let queryString = `SELECT rides.*,users.name,users.avatar,users.contact
  FROM rides
  JOIN users ON users.id = rides.owner_id 
  WHERE 1=1 `;
  if (from) {
    queryParams.push(`${from}`);
    queryString += ` AND origin = $${queryParams.length}`;
  }
  if (to) {
    queryParams.push(`${to}`);
    queryString += ` AND destination = $${queryParams.length}`;
  }
  if (seats) {    
    queryParams.push(`${seats}`);
    queryString += ` AND available_seats >  $${queryParams.length}`;
   }
  return pool
    .query(queryString, queryParams)
    .then((response) => {     
      console.log("from",from,response.rows);
      return response.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = {postUser,getRides}