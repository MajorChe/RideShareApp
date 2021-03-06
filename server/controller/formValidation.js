const Yup = require("yup");

const formSchema = Yup.object({
  name: Yup.string(),
  email: Yup.string()
    .required("email required"),
  password: Yup.string()
    .required("Password required")
    .min(6, "Password too short")
    .max(28, "Password too long!"),
});

const validateForm = (req, res, next) => {
  const formData = req.body;
  console.log(req.body);
  formSchema
    .validate(formData)
    .catch((err) => {
      res.status(422).send();
      console.log(err.errors);
    })
    .then((valid) => {
      if (valid) {
        next();
        console.log("form is good");
      } else {
        res.status(422).send();
      }
    });
};

module.exports = validateForm;
