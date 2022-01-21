const BookRideFn = require("../db/queries/bookRide");

const updateRideHandler = async (req,res) => {

    const {available_seats,ride_id}= req.body.params;

    console.log(req.body.params)

    BookRideFn.updateSeats(available_seats,ride_id)    

    .then(updatedData=>{      

        console.log("successfully updated data",updatedData);

        res.json(updatedData);

    }).catch((err) => {      

        console.log(err.message);

        res.send("failed",err.message);

    })

  }   

const addBookingHandler = async (req,res) => {

  console.log(req.body.params);    

  const {ride_id,rider_id,seats}= req.body.params;

  BookRideFn.addBooking(ride_id,rider_id,seats)
  
  .then(insertedData=>{           

      console.log("successfully inserted data",insertedData);  
      
      res.json(insertedData);

    }).catch((err) => {

      console.log(err.message);
      
      res.send("failed",err.message);
  })

}

module.exports = {addBookingHandler,updateRideHandler}