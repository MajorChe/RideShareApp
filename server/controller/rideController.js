const userfn = require("../db/queries/user");

const userRidesViewer = async (req, res) => {
  const {id} = req.params;
  const new_id = parseInt(id)
  console.log("this is the id", id)
  console.log("parsed id is: ", new_id)
  userfn.getRidesforUser(new_id).then((result) => {
    console.log(result)
    res.json({
      result
      // ride_image: r.ride_image,
      // origin: r.origin,
      // destination: r.destination,
      // cost: r.cost,
      // date: r.date,
      // time: r.time,
      // status: r.status,
    });
  });
};

module.exports = { userRidesViewer };
