const police = require("../Models/police_schema");

const add_police_user = async (req, res) => {
  try {
    console.log(req.data);
    police_user = await police.create({
      UID: req.body.UID,
      name: req.body.name,
      password: req.body.password,
      housename: req.body.housename,
      street: req.body.steet,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      phNo: req.body.phNo,
      email: req.body.email,
      police: req.body.police_station,
      rank: req.body.rank,
    });

    return res.status(200).json(police_user);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: "Error",
      "error msg": e.message,
    });
  }
};

const get_all_police_user = async (req, res) => {
  try {
    data = await police.find();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({
      msg: "Error",
      "error msg": e.message,
    });
  }
};

const delete_police_user = async (req, res) => {
  try {
    const result = await police.findByIdAndDelete(id);

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

const update_police_user = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await police.findOneAndUpdate({ _id: id }, updateData, {
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

const get_indudaual_police_user = async (req, res) => {
  try {
    const id = request.id;
    const data = police.findOne({ _id: id });
    return res.status(200).json(data);
  } catch {
    return res.status(500).json({
      msg: "Error",
      "error msg": e.message,
    });
  }
};

module.exports = {
  add_police_user,
  get_all_police_user,
  delete_police_user,
  update_police_user,
  get_indudaual_police_user,
};
