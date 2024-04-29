const { default: mongoose } = require("mongoose");
const judgement = require("../Models/judgements_schema");
const case_schema = require("../Models/case_schema");

const add_judgement = async (req, res) => {
  try {
    console.log(req.body);
    await judgement.create({
      case_id: req.body.case_id,
      judgement_title:req.body.judgement_title,
      judgement: req.body.judgement,
      // updated_by: req.user
    });
    return res.status(200).json({ msg: "Judgement added" });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({
      msg: "Error",
      "error msg": e.message,
    });
  }
};

const get_judgememt_of_particular_case = async (req, res) => {
  const case_id = req.params.id;
  try {
    const data = await judgement.find({ case_id: case_id });
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({
      msg: "Error",
      "error msg": e.message,
    });
  }
};

module.exports = { get_judgememt_of_particular_case, add_judgement };
