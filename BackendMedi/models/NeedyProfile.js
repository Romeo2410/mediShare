const mongoose = require("mongoose");

const NeedyProfileSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },

    name: {
      type: String,
      required: true
    },

    contact: {
      type: String,
      required: true
    },

    address: {
      type: String,
      required: true
    },

    state: {
      type: String,
      required: true
    },

    city: {
      type: String,
      required: true
    },

    userType: {
      type: String,
      enum: ["NGO", "Self"],
      required: true
    },

    healthProblems: {
      type: String,
      required: true
    },

    idProof: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

const NeedyProfile = mongoose.model(
  "NeedyProfiles",
  NeedyProfileSchema
);

module.exports = NeedyProfile;