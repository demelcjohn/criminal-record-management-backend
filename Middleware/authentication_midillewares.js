const jwt = require("jsonwebtoken");
const citizen = require("../Models/citizen_schema");
const police = require("../Models/police_schema");
const court = require("../Models/court_schema");

const citizen_authentication = async (req, res, next) => {
  const token = req.cookies.token;
  try {
    const token = req.cookies.token;
    const verified_token = jwt.verify(token, process.env.jwt);
    const id = verified_token.id;
    const user = await citizen.findOne({ _id: id });
    

    if (!user) {
      return res.status(401).json({ nsg: "User Not Found" });
    } else {
      req.user = user._id;
      // console.log(user);
      next();
    }
    
  } catch (e) {
    return res.status(500).json({
      msg: "Error",
      "error msg": e.message,
    });
  }
};

const police_authentication = async (req, res, next) => {
    const token = req.cookies.token;
    try {
      const token = req.cookies.token;
      const verified_token = jwt.verify(token, process.env.jwt);
      const id = verified_token.id;
      const user = await police.findOne({ _id: id });
      
  
      if (!user) {
        return res.status(401).json({ nsg: "User Not Found" });
      } else {
        req.user = user._id;
        // console.log(user);
        next();
      }
      
    } catch (e) {
      return res.status(500).json({
        msg: "Error",
        "error msg": e.message,
      });
    }
  };

  const court_authentication = async (req, res, next) => {
    const token = req.cookies.token;
    try {
      const token = req.cookies.token;
      const verified_token = jwt.verify(token, process.env.jwt);
      const id = verified_token.id;
      const user = await court.findOne({ _id: id });
      
  
      if (!user) {
        return res.status(401).json({ nsg: "User Not Found" });
      } else {
        req.user = user._id;
        // console.log(user);
        next();
      }
      
    } catch (e) {
      return res.status(500).json({
        msg: "Error",
        "error msg": e.message,
      });
    }
  };


module.exports = { citizen_authentication,police_authentication,court_authentication };
