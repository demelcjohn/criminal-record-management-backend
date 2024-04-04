const cases = require("../Models/case_schema");

const add_new_case = async (req, res) => {
  try {
    const case_created = await cases.create({
      caseNo: req.body.caseNo,
      caseTitle: req.body.caseTitle,
      caseDiscription: req.body.caseDiscription,
      status: req.body.status,
      usersInvolved: req.body.usersInvolved,
    });
    return res.status(200).json({
      msg: "new case added",
      data: case_created,
    });
  } catch (e) {
    return res.status(500).json({
      msg: "Error",
      "error msg": e.message,
    });
  }
};

const get_all_cases = async (req, res) => {
  try {
    const data = await cases.find().populate({
      path: "usersInvolved",
      select: "-password -email -phNo -_id", // This will exclude the password field
    });
    return res.status(200).json({
      data: data,
    });
  } catch (e) {
    return res.status(500).json({
      msg: "Error",
      "error msg": e.message,
    });
  }
};

// const get_indudual_cases = 
module.exports = { add_new_case, get_all_cases };
