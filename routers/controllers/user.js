const userModel = require("./../../db/models/user");
// require("dotenv").config();already has configed
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const salt = Number(process.env.SALT);
const secret = process.env.SECRETKEY;

const register = async (req, res) => {

  const { email, password, role } = req.body;
  const hashed = await bcrypt.hash(password, salt)
  const newUser = new userModel({
    role,
    email,
    password: hashed,
  });
  newUser
    .save()
    .then((result) => {
      res.status("201").json(result);
    })
    .catch((err) => {
      res.status("404").json(err);
    });
};
const login = (req, res) => {
  const { email, password } = req.body;
  userModel
    .findOne({ email }) //with find will return email and say not valid if it is valid
    .then(async (result) => {
      if (result) {
        if (result.email == email) {
          const payload = {
            role: result.role,
          };
          const options = {
            expiresIn: "60m",
          };
          const token = await jwt.sign(payload, secret, options);
        //   console.log(token);
          const decrybtedPass = await bcrypt.compare(password, result.password);
          if (decrybtedPass) {
            res.status("200").json(result);
          } else {
            //   console.log("hi");
            res.status("404").json("email or password is not valid");
          }
        } else {
          // console.log("hi");
          res.status("404").json("email or password is not valid");
        }
      } else {
        res.status("404").json("does not exist");
      }
    })
    .catch((err) => res.status("404").json(err));
};

module.exports = { register, login };
