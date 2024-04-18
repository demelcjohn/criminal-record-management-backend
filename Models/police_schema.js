const { text } = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const police_Schema = Schema(
  {
    UID: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    housename:{
      type:String
    },
    street:{
      type:String
    },
    city:{
      type:String
    },
    pin:{
      type:String
    },
    state:{
      type:String
    },
    country:{
      type:String
    },
    phNo: {
      type: Number,
      
    },
    email: {
      type: String,
    },
    police_station:{
        type:String,
    },
    rank:{
        type:String,
    }
  },
  {
    // Enable partial updates
    setDefaultsOnInsert: true,
  }
);

police_Schema.pre("save", function (next) {
  const user = this;

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }

          user.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});

module.exports = mongoose.model("police", police_Schema);
