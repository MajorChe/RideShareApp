const bcrypt = require("bcryptjs");
const userfn = require("../db/queries/user");

const updateHandler = async (req, res) => {
  console.log(req.body);
  const id = req.session.user.id;
  const { name, email, password, contact } = req.body;
  const hashedpassword = await bcrypt.hash(password, 12);
  userfn.updateUser(id, name, email, hashedpassword, contact).then((result) => {
    req.session.user = {
      email: result.email,
      id: result.id,
      name: result.name,
    };
    res.json({ loggedIn: true, email: result.email, name: result.name, contact: result.contact });
  });
};

module.exports = { updateHandler };
