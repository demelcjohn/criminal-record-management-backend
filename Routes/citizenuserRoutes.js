const express = require("express");
const {
  citizen_login,
  login_test,
} = require("../Controllers/login_controlleres");
const {
  citizen_authentication,
  police_authentication,
  court_authentication,
} = require("../Middleware/authentication_midillewares");
const {
  add_new_request,
  accept_request,
  get_all_requests_to_a_user,
  get_all_requests_by_a_user,
} = require("../Controllers/pofile_request_controlleres");
const { get_indudaual_citizen_user } = require("../Controllers/citizen_data_entry_contoller");

const citizen_routes = express.Router();

citizen_routes.post("/login", citizen_login);


citizen_routes.get("/login", citizen_authentication, login_test);
citizen_routes.get("/pofile",citizen_authentication,get_indudaual_citizen_user);
citizen_routes.post("/request", citizen_authentication, add_new_request);
citizen_routes.put("/request/:id", citizen_authentication, accept_request);
citizen_routes.get(
  "/request/to",
  citizen_authentication,
  get_all_requests_to_a_user
);
citizen_routes.get(
  "/request/by",
  citizen_authentication,
  get_all_requests_by_a_user
);

module.exports = citizen_routes;
