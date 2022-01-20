const userfn = require("../db/queries/user");

const userRidesViewer = async (req, res) => {
  const { id } = req.params;
  const new_id = parseInt(id);
  userfn.getRidesforUser(new_id).then((result) => {
    console.log(result);
    res.json({
      result,
    });
  });
};

const userRidePostings = (req, res) => {
  const { id } = req.params;
  const new_id = parseInt(id);
  console.log("parsed owner id is: ", new_id);
  userfn.getRidePostingsForUser(new_id).then((result) => {
    console.log(result);
    res.json({ result });
  });
};

const userRideBookings = (req, res) => {
  const { id } = req.params;
  const new_id = parseInt(id);
  userfn.getAllBookingsForOwner(new_id).then((result) => {
    console.log(result);
    res.json({ result });
  });
};

const cancelRide = (req,res) => {
  const { id } = req.params;
  const new_id = parseInt(id);
  userfn.cancelUserRide(new_id).then((result) => {
    res.json({result});
  })
};

const deleteRide = (req,res) => {
  const { id } = req.params;
  const new_id = parseInt(id);
  userfn.deleteUserRidePosting(new_id).then((result) => {
    res.json({result});
  })
}

module.exports = { userRidesViewer, userRidePostings, userRideBookings, cancelRide, deleteRide };
