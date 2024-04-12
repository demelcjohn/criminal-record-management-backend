const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const case_schema = Schema({
  caseNo: {
    type: Number,
    required: true,
  },
  caseTitle: {
    type: String,
    required: true,
  },
  caseDiscription: {
    type: String,
  },
  status: {
    type: String,
  },
  usersInvolved: [
    {
      type: Schema.Types.ObjectId,
      ref: "citizen",
    },
  ],
});

module.exports = mongoose.model("case", case_schema);
