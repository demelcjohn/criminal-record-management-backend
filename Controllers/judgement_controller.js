const judgement = require("../Models/judgements_schema");

const add_judgement = async (req, res) => {
  try {
    await judgement.create({
      case_id: req.body.case_id,
      judgement: req.body.judgement,
      // updated_by:req.user
    });
    return res.status(200).json({ msg: "Judgement added" });
  } catch (e) {
    return res.status(500).json({
      msg: "Error",
      "error msg": e.message,
    });
  }
};

const get_judgememt_of_particular_case = async (req, res) => {
  const case_id = req.params.id;
  try {
    const data = await judgement.find({ case_id: case_id }).polulate({
      path: "updated_by",
      select: "-password -email -phNo -_id",
    });
    return responce;
  } catch (e) {
    return res.status(500).json({
      msg: "Error",
      "error msg": e.message,
    });
  }
};

module.exports = { get_judgememt_of_particular_case, add_judgement };
