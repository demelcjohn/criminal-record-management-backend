const { text } = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const citizen_Schema = Schema(
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
    dob: {
      type: String,
    },
    gender: {
      type: String,
    },
    housename: {
      type: String,
    },
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    pin: {
      type: String,
    },
    country: {
      type: String,
    },
    phNo: {
      type: Number,
    },
    email: {
      type: String,
    },
  },
  {
    // Enable partial updates
    setDefaultsOnInsert: true,
  }
);

citizen_Schema.pre("save", function (next) {
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

module.exports = mongoose.model("citizen", citizen_Schema);
