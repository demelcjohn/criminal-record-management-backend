const cases = require("../Models/case_schema");
const citizen = require("../Models/citizen_schema");
const judgement = require("../Models/judgements_schema");

const profile_request = require("../Models/pofile_request_schema");

const add_new_request = async (req, res) => {
  try {
    // var requested_by = "6601df17d9a53a93efa098b6";
    // // requested_by = req.user;
    const new_request = await profile_request.create({
      requested_by: req.user,
      requested_to: req.body.userid,
    });
    return res.status(200).json({
      data: new_request,
    });
  } catch (e) {
    return res.status(500).json({
      msg: "Error",
      "error msg": e.message,
    });
  }
};

const accept_request = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await profile_request.findOneAndUpdate(
      { _id: id },
      { is_approved: true }
    );
    return res.status(200).json({ msg: "pofile request approved " });
  } catch (e) {
    return res.status(500).json({
      msg: "Error",
      "error msg": e.message,
    });
  }
};

const get_all_requests_to_a_user = async (req, res) => {
  try {
    const requests = await profile_request
      .find({ requested_to: req.user })
      .populate({
        path: "requested_to",
        select: "-password -email -phNo -_id", // This will exclude the password field
      })
      .populate({
        path: "requested_by",
        select: "-password -email -phNo -_id", // This will exclude the password field
      });

    return res.status(200).json(requests);
  } catch (e) {
    return res.status(500).json({
      msg: "Error",
      "error msg": e.message,
    });
  }
};

const get_all_requests_by_a_user = async (req, res) => {
  try {
    const requests = await profile_request
      .find({ requested_by: req.user })
      .populate({
        path: "requested_to",
        select: "-password -email -phNo -_id", // This will exclude the password field
      })
      .populate({
        path: "requested_by",
        select: "-password -email -phNo -_id", // This will exclude the password field
      });

    return res.status(200).json(requests);
  } catch (e) {
    return res.status(500).json({
      msg: "Error",
      "error msg": e.message,
    });
  }
};

const get_judgment = async (caseId) => {
  try {
    let judgments = [];
    judgments = await judgement.find({ case_id: caseId });
    console.log(judgments);
    return judgments;
  } catch (error) {
    console.error("Error fetching judgments:", error);
    return []; // Return an empty array if there's an error
  }
};

const get_public_profile = async (req, res) => {
  try {
    const requestid = req.params.id;
    const request = await profile_request.findOne({ _id: requestid });
    console.log(request.requested_by);
    console.log(req.user);
    console.log(request.is_approved);
    if (
      request.is_approved === true &&
      request.requested_by.toString() === req.user.toString()
    ) {
      const case_data = await cases.find({
        usersInvolved: request.requested_to,
      });
      var profile_data = [];
      for (var i = 0; i < case_data.length; i++) {
        let judgments = [];
        let caseId = case_data[i]._id;
        judgments = await judgement.find({ case_id: caseId });
        profile_data[i] = {
          case: case_data[i],
          judgements: judgments,
        };
      }
      // console.log(profile_data);
      return res.status(200).json(profile_data);
    } else {
      return res
        .status(403)
        .json({ msg: "You are not authenticated to view the public profile" });
    }
  } catch (e) {
    return res.status(500).json({
      msg: "Error",
      "error msg": e.message,
    });
  }
};

const get_my_public_profile = async (req, res) => {
  try {
    console.log(req.user);
    const user = req.user;
    const userdata = await citizen.findOne({ _id: user });
    const case_data = await cases.find({
      usersInvolved: user,
    });

    var profile_data = [];
    for (var i = 0; i < case_data.length; i++) {
      let judgments = [];
      let caseId = case_data[i]._id;
      judgments = await judgement.find({ case_id: caseId });
      profile_data[i] = {
        case: case_data[i],
        judgements: judgments,
      };
    }

    const data = {
      userdata: userdata,
      profile_data: profile_data,
    };
    // console.log(profile_data);
    return res.status(200).json(data);
    return res.status(200).json({ msg: "sucess" });
  } catch (e) {
    return res.status(500).json({
      msg: "Error",
      "error msg": e.message,
    });
  }
};

const get_indudual_request = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await profile_request.findOne({ _id: id });
    console.log(data);
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({
      msg: "Error",
      "error msg": e.message,
    });
  }
};
module.exports = {
  add_new_request,
  add_new_request,
  get_all_requests_by_a_user,
  get_all_requests_to_a_user,
  accept_request,
  get_public_profile,
  get_indudual_request,
  get_my_public_profile,
};
