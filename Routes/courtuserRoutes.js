const express = require('express');
const { court_login } = require('../Controllers/login_controlleres');
const { add_judgement, get_judgememt_of_particular_case } = require('../Controllers/judgement_controller');

const court_routes = express.Router();

court_routes.post("/login",court_login);

court_routes.post("/judgement",add_judgement);

court_routes.get("/judgement/:id",get_judgememt_of_particular_case);

module.exports = court_routes;
