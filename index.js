const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const superuser_router = require("./Routes/superuserRoutes");
const police_routes = require("./Routes/policeuserRoutes");
const citizen_routes = require("./Routes/citizenuserRoutes");

require("dotenv").config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000', // specify the origin
  credentials: true,  // allow credentials
}));
app.use(cookieParser());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// data base connection 

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Data Base Connected");
  })
  .catch((e) => {
    console.error(e);
    console.log("error");
  });

app.use("/admin", superuser_router);
app.use("/police", police_routes);
app.use("/citizen", citizen_routes);


app.listen(process.env.PORT, () => {
  console.log("Server started at port 8000");
});
