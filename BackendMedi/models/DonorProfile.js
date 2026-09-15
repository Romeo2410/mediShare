const mongoose = require("mongoose");

const DonorProfileSchema = new mongoose.Schema(
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

    occupation: {
      type: String,
      enum: ["Transporter", "Businessman", "Seller"],
      required: true
    },

    dob: {
      type: Date,
      required: true
    },

    city: {
      type: String,
      required: true
    },

    state: {
      type: String,
      required: true
    },

    profilePic: {
      type: String
    },

    aadharImage: {
      type: String
    }
  },
  {
    versionKey: false
  }
);

const DonorProfile = mongoose.model(
  "DonorProfiles",
  DonorProfileSchema
);

module.exports = DonorProfile;