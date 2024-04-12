const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const judgement_schema = Schema({
  case_id: {
    type: Schema.Types.ObjectId,
    ref: "case",
  },
  judgement: {
    type: String,
  },
  updated_by: {
    type: Schema.Types.ObjectId,
    ref: "court",
  },
});

module.exports = mongoose.model("judgement", judgement_schema);
