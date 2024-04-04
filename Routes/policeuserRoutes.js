const express = require('express');
const { add_new_case, get_all_cases } = require('../Controllers/case_controlleres');
const { police_login } = require('../Controllers/login_controlleres');
const { police_authentication } = require('../Middleware/authentication_midillewares');

const police_routes = express.Router();

police_routes.post("/login",police_login);

police_routes.post("/case",police_authentication,add_new_case);

police_routes.get("/cases",police_authentication,get_all_cases);

module.exports = police_routes;