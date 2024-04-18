const express = require("express");
const {
  add_new_case,
  get_all_cases,
} = require("../Controllers/case_controlleres");
const {
  police_login,
  login_test,
} = require("../Controllers/login_controlleres");
const {
  police_authentication,
} = require("../Middleware/authentication_midillewares");
const {
  search_citizen,
} = require("../Controllers/citizen_data_entry_contoller");

const police_routes = express.Router();

police_routes.post("/login", police_login);

police_routes.get("/login", login_test);

police_routes.post("/case", police_authentication, add_new_case);

police_routes.get("/cases", police_authentication, get_all_cases);

police_routes.get("/citizen", police_authentication, search_citizen);

module.exports = police_routes;
