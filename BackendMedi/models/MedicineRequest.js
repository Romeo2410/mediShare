const mongoose = require("mongoose");

const MedicineRequestSchema = new mongoose.Schema(
  {
    medicineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicines",
      required: true
    },

    medicineName: {
      type: String,
      required: true
    },

    needyEmail: {
      type: String,
      required: true
    },

    donorEmail: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending"
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

const MedicineRequest = mongoose.model(
  "MedicineRequests",
  MedicineRequestSchema
);

module.exports = MedicineRequest;