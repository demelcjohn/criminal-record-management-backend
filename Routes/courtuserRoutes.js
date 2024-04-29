const express = require("express");
const { court_login } = require("../Controllers/login_controlleres");
const {
  add_judgement,
  get_judgememt_of_particular_case,
} = require("../Controllers/judgement_controller");
const {
  get_all_cases,
  search_cnr,
  get_indudual_cases,
} = require("../Controllers/case_controlleres");

const court_routes = express.Router();

court_routes.post("/login", court_login);

court_routes.post("/judgement", add_judgement);

court_routes.get("/cases", get_all_cases);

court_routes.get("/case/:id",get_indudual_cases);

court_routes.get("/cases/:id",search_cnr);

court_routes.get("/judgement/:id", get_judgememt_of_particular_case);

module.exports = court_routes;
