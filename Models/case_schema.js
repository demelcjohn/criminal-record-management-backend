const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const case_schema = Schema({
  case_type:{
    type:String,
  },
  fillig_number:{
    type:String
  },
  filling_date:{
    type:String
  },
  registration_number:{
    type:String,
  },
  registration_date:{
    type:String
  },
  cnr_number:{
    type:String
  },
  acts:{
    type:String
  },
  sections:{
    type:String
  },
  police_station:{
    type:String
  },
  fir_number:{
    type:String
  },
  year:{
    type:String
  },
  usersInvolved: [
    {
      type: Schema.Types.ObjectId,
      ref: "citizen",
    },
  ],
  usersResponded: [
    {
      type: Schema.Types.ObjectId,
      ref: "citizen",
    },
  ],
});

module.exports = mongoose.model("case", case_schema);
