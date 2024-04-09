const citizen = require("../Models/citizen_schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const police = require("../Models/police_schema");
const court = require("../Models/court_schema");

const citizen_login = async (req, res) => {
  const data = req.body;
  try {
    citizen_user = await citizen.findOne({ UID: data.UID });
    if (citizen_user === null) {
      return res.status(201).json({ msg: "User Not Found" });
    }
  } catch (e) {
    return res.status(401).json({ msg: "citizon not found", err: e.message });
  }

  const passwordEnteredByUser = data.password;
  const hash = citizen_user.password;

  try {
    bcrypt.compare(passwordEnteredByUser, hash, function (error, isMatch) {
      if (error) {
        console.log(error);
        return res.status(201).json({ error: error.message });
      } else if (!isMatch) {
        console.log("Password doesn't match!");
        return res.status(201).json({ msg: "Password Does Not Mached" });
      } else {
        console.log("Password matches!");
        id = citizen_user._id;
        const token_data = { id: id };
        const token = jwt.sign(token_data, process.env.JWT);
        return res.cookie("token", token).status(200).json({
          "msg": "Password mathced User Logined",
          "token":token
          
        });
      }
    });
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
};

const login_test = async (req, res) => {
  console.log(req.cookies);

  //   console.log(req.userID);
  return res.status(200).json({
    user: req.user,
  });
};

const court_login = async (req, res) => {
  const data = req.body;
  try {
    court_user = await court.findOne({ UID: data.UID });
    if (court_user === null) {
      return res.status(404).json({ msg: "User Not Found" });
    }
  } catch (e) {
    return res.status(404).json({ msg: "citizon not found", err: e.message });
  }

  const passwordEnteredByUser = data.password;
  const hash = court_user.password;

  try {
    bcrypt.compare(passwordEnteredByUser, hash, function (error, isMatch) {
      if (error) {
        console.log(error);
        return res.status(400).json({ error: error.message });
      } else if (!isMatch) {
        console.log("Password doesn't match!");
        return res.status(400).json({ msg: "Password Does Not Mached" });
      } else {
        console.log("Password matches!");
        id = citizen_user._id;
        const token_data = { id: id };
        const token = jwt.sign(token_data, process.env.JWT);
        return res.status(200).cookie("token", token).json({
          msg: "Password mathced User Logined",
        });
      }
    });
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
};

const police_login = async (req, res) => {
  const data = req.body;
  try {
    police_user = await police.findOne({ UID: data.UID });
    if (police_user === null) {
      return res.status(404).json({ msg: "User Not Found" });
    }
  } catch (e) {
    return res.status(404).json({ msg: "citizon not found", err: e.message });
  }

  const passwordEnteredByUser = data.password;
  const hash = police_user.password;

  try {
    bcrypt.compare(passwordEnteredByUser, hash, function (error, isMatch) {
      if (error) {
        console.log(error);
        return res.status(400).json({ error: error.message });
      } else if (!isMatch) {
        console.log("Password doesn't match!");
        return res.status(400).json({ msg: "Password Does Not Mached" });
      } else {
        console.log("Password matches!");
        id = citizen_user._id;
        const token_data = { id: id };
        const token = jwt.sign(token_data, process.env.JWT);
        return res.status(200).cookie("token", token).json({
          msg: "Password mathced User Logined",
        });
      }
    });
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
};

module.exports = { citizen_login, login_test, police_login, court_login };
