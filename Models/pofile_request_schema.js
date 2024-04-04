const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const profile_request_schema = Schema({
  requested_by: {
    type: Schema.Types.ObjectId,
    ref: "citizen",
    required: true,
  },
  requested_to: {
    type: Schema.Types.ObjectId,
    ref: "citizen",
    required: true,
  },
  is_approved: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("profile_request", profile_request_schema);
