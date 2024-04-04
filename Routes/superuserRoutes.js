const express = require("express");
const {
  add_new_citizen,
  test,
  get_all_citizens,
  update_citizen_user,
  delete_citizen_user,
  get_indudaual_citizen_user,
} = require("../Controllers/citizen_data_entry_contoller");
const {
  add_police_user,
  get_all_police_user,
  update_police_user,
  delete_police_user,
  get_indudaual_police_user,
} = require("../Controllers/police_data_entry_controller");
const {
  add_new_court_user,
  get_all_court_user,
  update_court_user,
  delete_court_user,
  get_indudaual_court_user,
} = require("../Controllers/court_data_entry_controlleres");

const superuser_router = express.Router();

// routes for citizen user 

superuser_router.post("/citizen", add_new_citizen);

superuser_router.get("/citizen", get_all_citizens);

superuser_router.put("/citizen/:id", update_citizen_user);

superuser_router.delete("/citizen/:id", delete_citizen_user);

superuser_router.get("/citizen/:id", get_indudaual_citizen_user);

// routes for police user 

superuser_router.post("/police", add_police_user);

superuser_router.get("/police", get_all_police_user);

superuser_router.put("/police/:id", update_police_user);

superuser_router.delete("/police/:id", delete_police_user);

superuser_router.get("/police/:id", get_indudaual_police_user);

// routes for court user 

superuser_router.post("/court", add_new_court_user);

superuser_router.get("/court", get_all_court_user);

superuser_router.put("/court/:id", update_court_user);

superuser_router.delete("/court/:id", delete_court_user);

superuser_router.get("/court/:id", get_indudaual_court_user);

module.exports = superuser_router;
