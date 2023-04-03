const userModel = require("../models/userModel");
const validator = require("../validators/validations");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

const register = async function (req, res) {
  try {
    const body = req.body;
    const { fname, lname, email, phone, password, gender, profession } = body;
    //let password = body.password;

    // <--------reqBody validation----------------->
    if (!validator.isValidBody(body))
      return res
        .status(400)
        .send({ status: false, message: "Provide details inside body" });

    // <---------Fname validation---------------->
    if (!fname)
      return res
        .status(400)
        .send({ status: false, message: "fname is required" });
    if (!/^[A-Za-z]{2,15}$/.test(fname.trim()))
      return res
        .status(400)
        .send({ status: false, message: "fname not valid" });

    // <--------lname validation---------------->
    if (!lname)
      return res
        .status(400)
        .send({ status: false, message: "lname is required" });
    if (!/^[A-Za-z]{2,15}$/.test(lname.trim()))
      return res
        .status(400)
        .send({ status: false, message: "lname not valid" });

    // <--------email validation---------------->
    if (!email)
      return res
        .status(400)
        .send({ status: false, message: "please enter email" });
    if (!validator.isValidEmail(email))
      return res
        .status(400)
        .send({ status: false, message: "please enter valid email" });

    // <--------Check Email is Exist in db or not-------------->
    const uniqueEmail = await userModel.findOne({ email });
    if (uniqueEmail)
      return res
        .status(409)
        .send({ status: false, message: "email is already exist" });

    // <---------Password validation & encrpt that---------->
    if (!password)
      return res
        .status(400)
        .send({ status: false, message: "password is required" });
    if (!validator.isValidPassword(password))
      return res.status(400).send({
        status: false,
        message: "password is not in the valid formate",
      });
    let encryptPassword = await bcrypt.hash(password, saltRounds);
    // console.log(encryptPassword, "encryptPassword");

    body["password"] = encryptPassword;

    // <----------gender validation----------->
    if (!gender)
      return res
        .status(400)
        .send({ status: false, message: "gender is required" });
    if (!validator.isValid(gender))
      return res
        .status(400)
        .send({ status: false, message: "gender should be in correct format" });

    if (!["Male", "Female", "Custom"].includes(gender))
      return res
        .status(400)
        .send({
          status: false,
          message: `gender should be in ${["Male", "Female", "Custom"]}`,
        });
    // <-----------profession validation----------->
    if (!profession)
      return res
        .status(400)
        .send({ status: false, message: " please enter your profession " });
    if (!validator.isValid(profession))
      return res
        .status(400)
        .send({
          status: false,
          message: " profession should be in correct format",
        });

    // <----------Create a document of user---------->
    const userData = await userModel.create(body);
    return res
      .status(201)
      .send({ status: true, message: "Success", data: userData });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

// <-------------------logIn ------------------------->

const login = async function (req, res) {
  try {
    const { email, password } = req.body;

    if (!validator.isValidBody(req.body))
      return res
        .status(400)
        .send({ status: false, message: "req body is invalid !!" });

    // <--------email validation---------------->
    if (!email)
      return res
        .status(400)
        .send({ status: false, message: "email is required" });
    if (!validator.isValidEmail(email))
      return res
        .status(400)
        .send({ status: false, message: "Enter valid email" });

    const data = await userModel.findOne({ email });
    // console.log(data);
    if (!data)
      return res
        .status(401)
        .send({ status: false, message: "email id is incorrect !" });
    // <--------password validation---------------->
    if (!password)
      return res
        .status(400)
        .send({ status: false, message: "password is required" });
    const decryptPassword = await bcrypt.compare(password, data.password);
    if (!decryptPassword)
      return res
        .status(401)
        .send({ status: false, message: "password is incorrect" });

    // <-------generate JWT Token --------------->
    let payload = {
      userId: data._id,
    };
    let token = jwt.sign(payload, process.env.SECRET_KEY);
    res.setHeader("x-api-key", token);
    res.status(200).send({
      status: true,
      message: "user logged in successfully",
      data: token,
    });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = { register, login };
