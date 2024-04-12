const citizen = require("../Models/citizen_schema");

const add_new_citizen = async (req, res) => {
  try {
    console.log(req.body);
    const new_citizen_user = await citizen.create({
      UID: req.body.uid,
      name: req.body.name,
      password: req.body.password,
      dob: req.body.dob,
      gender: req.body.gender,
      housename: req.body.housename,
      street: req.body.steet,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      phNo: req.body.phNo,
      email: req.body.email,
    });

    return res.status(200).json({
      msg: "Citizen User Created",
      data: new_citizen_user,
    });
  } catch (e) {
    return res.status(400).json({
      msg: "Citizen canot be Created",
      "error msg": e.message,
    });
  }
};

const get_all_citizens = async (req, res) => {
  try {
    citizen_data = await citizen.find();
    return res.status(200).json(citizen_data);
  } catch (e) {
    return res.status(500).json({
      msg: "Error",
      "error message": e.message,
    });
  }
};

const delete_citizen_user = async (req, res) => {
  try {
    const result = await citizen.findByIdAndDelete(id);

    if (!result) {
      return res.status(200).json({ msg: "User not found" });
    } else {
      return res.status(200).json({ msg: "User deleted successfully" });
    }
  } catch {
    return res.status(500).json({
      msg: "Error",
      "error msg": e.message,
    });
  }
};

const update_citizen_user = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await citizen.findOneAndUpdate({ _id: id }, updateData, {
      new: true,
      runValidators: true,
    });

    if (!result) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({
      msg: "New data updated",
      data: result,
    });
  } catch {
    return res.status(500).json({
      msg: "Error",
      "error msg": e.message,
    });
  }
};

const get_indudaual_citizen_user = async (req, res) => {
  try {
    const id = req.user;
    const data = await citizen.findOne({ _id: id });
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({
      msg: "Error",
      "error msg": e.message,
    });
  }
};

const search_citizen = async (req, res) => {
  try {
    const UID = req.params.UID;
    const data = await citizen.find({ UID: UID });
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({
      msg: "Error",
      "error msg": e.message,
    });
  }
};

const test = (req, res) => {
  return res.status(200).json({ message: "sucess" });
};

module.exports = {
  add_new_citizen,
  test,
  get_all_citizens,
  delete_citizen_user,
  get_indudaual_citizen_user,
  update_citizen_user,
  search_citizen,
};
