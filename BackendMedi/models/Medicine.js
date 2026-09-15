const mongoose = require("mongoose");

const MedicineSchema = new mongoose.Schema(
  {
    medicineName: {
      type: String,
      required: true
    },

    category: {
      type: String,
      enum: ["Tablet", "Capsule", "Syrup", "Injection", "Other"],
      required: true
    },

    quantity: {
      type: Number,
      required: true
    },

    expiryDate: {
      type: Date,
      required: true
    },

    condition: {
      type: String,
      enum: ["Sealed", "Opened"],
      required: true
    },

    description: {
      type: String,
      required: true
    },

    image: {
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
    donorEmail: {
            type: String,
            required: true
        },
    isAvailable: {
            type: Boolean,
            default: true
        }
  },
  
  {
    versionKey: false,
    timestamps: true
  }
  
);

const Medicine = mongoose.model("Medicines", MedicineSchema);

module.exports = Medicine;