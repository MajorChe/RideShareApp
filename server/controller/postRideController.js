

const PostRideFn = require("../db/queries/postRide");

const postRideHandler = async (req,res) => {

    console.log(req.body.params);    

    const {owner_id,origin,destination,available_seats,date_of_ride,time_of_ride}= req.body.params;

    PostRideFn.postRide(owner_id,origin,destination,available_seats,date_of_ride,time_of_ride)
    
    .then(result=>{

      res.json(result);

      console.log("successfully inserted data");

    }).catch((err) => {      

      console.log(err.message);

      res.send("failed",err.message);

  })

}

module.exports = {postRideHandler}