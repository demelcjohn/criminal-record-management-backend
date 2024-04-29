const cases = require("../Models/case_schema");

const add_new_case = async (req, res) => {
  try {
    console.log(req.body);
    const case_created = await cases.create({
      case_type: req.body.case_type,
      fillig_number: req.body.filing_number,
      filling_date: req.body.filing_date,
      registration_number: req.body.registration_number,
      registration_date: req.body.registration_date,
      cnr_number: req.body.cnr_number,
      acts: req.body.acts,
      sections: req.body.sections,
      police_station: req.body.police_station,
      fir_number: req.body.fir_number,
      year: req.body.year,
      usersInvolved: req.body.petitioner,
      usersResponded: req.body.usersResponded,
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
    const data = await cases
      .find()
      .populate({
        path: "usersInvolved",
        select: "-password -email -phNo -_id", // This will exclude the password field
      })
      .populate({
        path: "usersResponded",
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

const get_indudual_cases = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await cases.findOne({ _id: id }).populate({
      path: "usersInvolved",
      select: "-password -email -phNo -_id", // This will exclude the password field
    });
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({
      msg: "Error",
      "error msg": e.message,
    });
  }
};

const search_cnr = async (req, res) => {
  const cnr = req.params.id;
  console.log(cnr);
  try {
    const data = await cases
      .findOne({ cnr_number: cnr })
      .populate({
        path: "usersInvolved",
        select: "-password -email -phNo -_id", // This will exclude the password field
      })
      .populate({
        path: "usersResponded",
        select: "-password -email -phNo -_id", // This will exclude the password field
      });
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({
      msg: "Error",
      "error msg": e.message,
    });
  }
};
module.exports = {
  add_new_case,
  get_all_cases,
  get_indudual_cases,
  search_cnr,
};
