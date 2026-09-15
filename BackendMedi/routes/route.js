const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const upload = require("../middleware/upload");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const cloudinary = require("../cloudinary/cloudinary");
const User = require("../models/User");
const DonorProfile = require("../models/DonorProfile");
const NeedyProfile = require("../models/NeedyProfile");
const Medicine = require("../models/Medicine");
const MedicineRequest = require("../models/MedicineRequest");
const adminAuth = require("../middleware/adminAuth");

router.post("/signup", async (req, res) => {

  try {

    const { name, email, password, usertype } = req.body;

    if (!name || !email || !password || !usertype) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered"
      });
    }

    const user = new User({
      name,
      email,
      password,
      usertype
    });

    await user.save();

    res.status(201).json({
      message: "Signup successful"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});

router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }
        if (user.status === 0) {
      return res.status(403).json({
        message: "Your account has been deactivated by the admin"
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }
    
    const token = jwt.sign(
  {
    email: user.email,
    usertype: user.usertype
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "1d"
  }
);

    res.json({
      message: "Login successful",
       token,
      user: {
        name: user.name,
        email: user.email,
        usertype: user.usertype
      }
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});
// SAVE PROFILE

router.post("/donor/profile",auth,role(["Donor"]),upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "aadhar", maxCount: 1 }
  ]),
  async (req, res) => {

    try {
      if (req.body.email !== req.user.email) {
  return res.status(403).json({
    message: "Access denied"
  });
}

      const {
        name,
        contact,
        address,
        occupation,
        dob,
        city,
        state
      } = req.body;

      // Required fields
      if (
        !name ||
        !contact ||
        !address ||
        !occupation ||
        !dob ||
        !city ||
        !state
      ) {
        return res.status(400).json({
          message: "All fields are required"
        });
      }

      const profilePic = req.files?.profilePic?.[0];
      const aadhar = req.files?.aadhar?.[0];

      let profilePicUrl = "";
      let aadharUrl = "";


      // PROFILE PICTURE

      if (profilePic) {

        const result = await cloudinary.uploader.upload(
          `data:${profilePic.mimetype};base64,${profilePic.buffer.toString("base64")}`,
          {
            folder: "donor_profiles"
          }
        );

        profilePicUrl = result.secure_url;
      }


      // AADHAAR IMAGE

      if (aadhar) {

        const result = await cloudinary.uploader.upload(
          `data:${aadhar.mimetype};base64,${aadhar.buffer.toString("base64")}`,
          {
            folder: "donor_aadhar"
          }
        );

        aadharUrl = result.secure_url;
      }

      const profile = new DonorProfile({
        ...req.body,
        profilePic: profilePicUrl,
        aadharImage: aadharUrl
      });

      await profile.save();

      res.json({
        message: "Profile saved successfully"
      });

} catch (error) {

  console.log(error);

  if (error.code === 11000) {
    return res.status(409).json({
      message: "Donor profile already exists. Please use Update."
    });
  }

  res.status(500).json({
    message: "Server error"
  });

}

  }
);

// SEARCH PROFILE

router.get("/donor/profile/:email", auth, role(["Donor"]), async (req, res) => {

  try {
    if (req.user.email !== req.params.email) {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    const profile = await DonorProfile.findOne({
      email: req.params.email
    });

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found"
      });
    }

    res.json(profile);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});

// UPDATE PROFILE

router.put("/donor/profile/:email",auth, role(["Donor"]), upload.fields
  ([{ name: "profilePic", maxCount: 1 },{ name: "aadhar", maxCount: 1 }]),
  async (req, res) => {

    try {
      if (req.user.email !== req.params.email) {
  return res.status(403).json({
    message: "Access denied"
  });
}
const {
  name,
  contact,
  address,
  occupation,
  dob,
  city,
  state
} = req.body;

// Required fields
if (
  !name ||
  !contact ||
  !address ||
  !occupation ||
  !dob ||
  !city ||
  !state
) {
  return res.status(400).json({
    message: "All fields are required"
  });
}

      const profilePic = req.files?.profilePic?.[0];
      const aadhar = req.files?.aadhar?.[0];

      let updateData = {
        ...req.body
      };


      // NEW PROFILE PICTURE

      if (profilePic) {

        const result = await cloudinary.uploader.upload(
          `data:${profilePic.mimetype};base64,${profilePic.buffer.toString("base64")}`,
          {
            folder: "donor_profiles"
          }
        );

        updateData.profilePic = result.secure_url;
      }


      // NEW AADHAAR

      if (aadhar) {

        const result = await cloudinary.uploader.upload(
          `data:${aadhar.mimetype};base64,${aadhar.buffer.toString("base64")}`,
          {
            folder: "donor_aadhar"
          }
        );

        updateData.aadharImage = result.secure_url;
      }


      const updatedProfile = await DonorProfile.findOneAndUpdate(
        { email: req.params.email },
        updateData,
        { new: true,
          runValidators: true
        }
      );


      if (!updatedProfile) {
        return res.status(404).json({
          message: "Profile not found"
        });
      }


      res.json({
        message: "Profile updated successfully",
        profile: updatedProfile
      });


    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server error"
      });

    }

  }
);

// PUBLISH MEDICINE
router.post("/medicine", auth, role(["Donor"]),upload.single("image"),
  async (req, res) => {
    try {

      const {
        medicineName,
        category,
        quantity,
        expiryDate,
        condition,
        description,
        state,
        city
      } = req.body;

      // Required fields
      if (
        !medicineName ||
        !category ||
        !quantity ||
        !expiryDate ||
        !condition ||
        !description ||
        !state ||
        !city
      ) {
        return res.status(400).json({
          message: "All fields are required"
        });
      }

      // Expiry date validation
      if (isNaN(new Date(expiryDate).getTime())) {
        return res.status(400).json({
          message: "Invalid expiry date"
        });
      }
      if (new Date(expiryDate) <= new Date()) {
        return res.status(400).json({
          message: "Medicine must not be expired"
        });
      }

      // Image validation
      const image = req.file;

      if (!image) {
        return res.status(400).json({
          message: "Medicine image is required"
        });
      }

      const donorEmail = req.user.email;

    const result = await cloudinary.uploader.upload(
      `data:${image.mimetype};base64,${image.buffer.toString("base64")}`,
      {
        folder: "medicines"
      }
    );

    const medicine = new Medicine({
      medicineName,
      category,
      quantity,
      expiryDate,
      condition,
      description,
      image: result.secure_url,
      state,
      city,
      donorEmail
    });

    await medicine.save();

    res.status(201).json({
      message: "Medicine published successfully",
      medicine
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to publish medicine"
    });

  }
});
// GET ONE MEDICINE
router.get("/medicine/id/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid medicine ID"
      });
    }
    const medicine = await Medicine.findOne(
      {
        _id: req.params.id,
        isAvailable: true,
        expiryDate: { $gte: new Date() }
      },
      {
        donorEmail: 0
      }
    );

    if (!medicine) {
      return res.status(404).json({
        message: "Medicine not found"
      });
    }

    res.json(medicine);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch medicine"
    });
  }
});

// GET ALL MEDICINES
router.get("/medicines", async (req, res) => {
  try {

const medicines = await Medicine.find(
  {
    isAvailable: true,
    expiryDate: { $gte: new Date() }
  },
  {
    donorEmail: 0
  }
);

    res.json(medicines);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to fetch medicines"
    });

  }
});
router.get("/medicine/edit/:id", auth, role(["Donor"]),
  async (req, res) => {

    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
  return res.status(400).json({
    message: "Invalid medicine ID"
  });
}

      const medicine = await Medicine.findById(req.params.id);

      if (!medicine) {
        return res.status(404).json({
          message: "Medicine not found"
        });
      }

      if (medicine.donorEmail !== req.user.email) {
        return res.status(403).json({
          message: "Access denied"
        });
      }

      res.json(medicine);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Failed to fetch medicine"
      });

    }
  }
);
router.get("/medicine/states", async (req, res) => {
  try {

    const states = await Medicine.distinct("state", {
      isAvailable: true,
      expiryDate: { $gte: new Date() }
    });

    res.json(states);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to fetch states"
    });

  }
});
router.get("/medicine/cities", async (req, res) => {
  try {

    const { state } = req.query;

    if (!state) {
      return res.status(400).json({
        message: "State is required"
      });
    }

    const cities = await Medicine.distinct("city", {
      state: state,
      isAvailable: true,
      expiryDate: { $gte: new Date() }
    });

    res.json(cities);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to fetch cities"
    });

  }
});
router.get("/medicines/location", async (req, res) => {
  try {

    const { state, city } = req.query;

    if (!state || !city) {
      return res.status(400).json({
        message: "State and city are required"
      });
    }

    const medicines = await Medicine.find({
      state: state,
      city: city,
      isAvailable: true,
      expiryDate: { $gte: new Date() }
    }).select("-donorEmail");

    res.json(medicines);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to fetch medicines"
    });

  }
});
// GET ALL MEDICINES OF DONOR
router.get("/medicine/:email", auth, role(["Donor"]), async (req, res) => {
  try {
    if (req.user.email !== req.params.email) {
  return res.status(403).json({
    message: "Access denied"
  });
}

    const medicines = await Medicine.find({
      donorEmail: req.params.email
    });

    res.json(medicines);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to fetch medicines"
    });

  }
});
router.put("/medicine/:id",auth, role(["Donor"]), upload.single("image"), async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
  return res.status(400).json({
    message: "Invalid medicine ID"
  });
}
    const medicine = await Medicine.findById(req.params.id);

if (!medicine) {
  return res.status(404).json({
    message: "Medicine not found"
  });
}

if (medicine.donorEmail !== req.user.email) {
  return res.status(403).json({
    message: "Access denied"
  });
}
    const {
      medicineName,
      category,
      quantity,
      expiryDate,
      condition,
      description,
      state,
      city
    } = req.body;

    // Required fields
    if (
      !medicineName ||
      !category ||
      !quantity ||
      !expiryDate ||
      !condition ||
      !description ||
      !state ||
      !city
    ) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // Expiry date validation
    if (isNaN(new Date(expiryDate).getTime())) {
      return res.status(400).json({
        message: "Invalid expiry date"
      });
    }
    if (new Date(expiryDate) <= new Date()) {
      return res.status(400).json({
        message: "Medicine must not be expired"
      });
    }

    let updateData = {
      medicineName,
      category,
      quantity,
      expiryDate,
      condition,
      description,
      state,
      city
    };

    // If a new image is uploaded
    if (req.file) {

      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        {
          folder: "medicines"
        }
      );

      updateData.image = result.secure_url;
    }

    const updatedMedicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      updateData,
      {new: true, runValidators: true }
    );

    if (!updatedMedicine) {
      return res.status(404).json({
        message: "Medicine not found"
      });
    }

    res.json({
      message: "Medicine updated successfully",
      medicine: updatedMedicine
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to update medicine"
    });

  }
});

// REQUEST MEDICINE
router.post("/medicine/request", auth, role(["Needy"]), async (req, res) => {
  try {

    const { medicineId } = req.body;

    if (!medicineId) {
      return res.status(400).json({
        message: "Medicine ID is required"
      });
    }
    if (!mongoose.Types.ObjectId.isValid(medicineId)) {
  return res.status(400).json({
    message: "Invalid medicine ID"
  });
}

    // Get needy email from JWT
    const needyEmail = req.user.email;

    const needyProfile = await NeedyProfile.findOne({
      email: needyEmail
    });

    if (!needyProfile) {
      return res.status(400).json({
        message: "Please complete your needy profile before requesting medicine"
      });
    }

    const medicine = await Medicine.findById(medicineId);

    if (!medicine) {
      return res.status(404).json({
        message: "Medicine not found"
      });
    }

    if (!medicine.isAvailable) {
      return res.status(400).json({
        message: "This medicine is no longer available"
      });
    }

    if (new Date(medicine.expiryDate) < new Date()) {
      return res.status(400).json({
        message: "This medicine has expired"
      });
    }

    const existingRequest = await MedicineRequest.findOne({
      medicineId,
      needyEmail
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "You have already requested this medicine"
      });
    }

    const request = new MedicineRequest({
      medicineId,
      medicineName: medicine.medicineName,
      needyEmail,
      donorEmail: medicine.donorEmail
    });

    await request.save();

    res.status(201).json({
      message: "Medicine requested successfully",
      request
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to request medicine"
    });

  }
});
// GET MY MEDICINE REQUESTS
router.get("/medicine/requests/:email", auth, role(["Needy"]), async (req, res) => {
  try {

    if (req.user.email !== req.params.email) {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    const requests = await MedicineRequest.find({
      needyEmail: req.params.email
    });

    res.json(requests);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to fetch medicine requests"
    });

  }
});
// GET DONOR MEDICINE REQUESTS
router.get("/medicine/requests/donor/:email", auth, role(["Donor"]), async (req, res) => {
  try {

    if (req.user.email !== req.params.email) {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    const requests = await MedicineRequest.find({
      donorEmail: req.params.email
    });

    res.json(requests);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to fetch donor requests"
    });

  }
});
router.put("/medicine/request/:id", auth, role(["Donor"]), async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
  return res.status(400).json({
    message: "Invalid request ID"
  });
}
    const { status } = req.body;

    if (!["Accepted", "Rejected"].includes(status)) {
      return res.status(400).json({
        message: "Invalid request status"
      });
    }

    const request = await MedicineRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found"
      });
    }
    if (request.donorEmail !== req.user.email) {
  return res.status(403).json({
    message: "Access denied"
  });
}

    if (status === "Accepted") {

      const medicine = await Medicine.findById(request.medicineId);

      if (!medicine) {
        return res.status(404).json({
          message: "Medicine not found"
        });
      }

      if (!medicine.isAvailable) {
        return res.status(400).json({
          message: "This medicine has already been accepted by another needy user"
        });
      }

      request.status = "Accepted";
      await request.save();

      medicine.isAvailable = false;
      await medicine.save();
    }

    if (status === "Rejected") {

      request.status = "Rejected";
      await request.save();

      const acceptedRequest = await MedicineRequest.findOne({
        medicineId: request.medicineId,
        status: "Accepted"
      });

      if (!acceptedRequest) {
        await Medicine.findByIdAndUpdate(request.medicineId, {
          isAvailable: true
        });
      }
    }

    res.json({
      message: `Request ${status.toLowerCase()} successfully`,
      request
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to update request"
    });
  }
});
router.delete("/medicine/:id", auth, role(["Donor"]), async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
  return res.status(400).json({
    message: "Invalid medicine ID"
  });
}
    const medicine = await Medicine.findById(req.params.id);

    if (!medicine) {
      
      return res.status(404).json({
        message: "Medicine not found"
      });
      
    }
          if (medicine.donorEmail !== req.user.email) {
  return res.status(403).json({
    message: "Access denied"
  });
}

    await Medicine.findByIdAndDelete(req.params.id);

    await MedicineRequest.deleteMany({
      medicineId: req.params.id
    });

    res.json({
      message: "Medicine deleted successfully"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to delete medicine"
    });
  }
});
// CREATE / UPDATE NEEDY PROFILE
router.post("/needy/profile", auth, role(["Needy"]), upload.single("idProof"),
  async (req, res) => {
    try {

      const {
        name,
        contact,
        address,
        state,
        city,
        userType,
        healthProblems
      } = req.body;

      // Get email from JWT
      const email = req.user.email;

      if (
        !name ||
        !contact ||
        !address ||
        !state ||
        !city ||
        !userType ||
        !healthProblems
      ) {
        return res.status(400).json({
          message: "All fields are required"
        });
      }

      let idProof;

      if (req.file) {

        const result = await cloudinary.uploader.upload(
          `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
          {
            folder: "needy_profiles"
          }
        );

        idProof = result.secure_url;
      }

      const existingProfile = await NeedyProfile.findOne({
        email
      });

      if (existingProfile) {

        const updateData = {
          name,
          contact,
          address,
          state,
          city,
          userType,
          healthProblems
        };

        if (idProof) {
          updateData.idProof = idProof;
        }

        const updatedProfile = await NeedyProfile.findOneAndUpdate(
          { email },
          updateData,
          {  new: true,
            runValidators: true }
        );

        return res.json({
          message: "Profile updated successfully",
          profile: updatedProfile
        });
      }

      if (!idProof) {
        return res.status(400).json({
          message: "ID proof is required"
        });
      }

      const profile = new NeedyProfile({
        email,
        name,
        contact,
        address,
        state,
        city,
        userType,
        healthProblems,
        idProof
      });

      await profile.save();

      res.status(201).json({
        message: "Profile created successfully",
        profile
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Failed to save needy profile"
      });

    }
  }
);
// GET NEEDY PROFILE
router.get("/needy/profile/:email", auth, async (req, res) => {
  try {

    let profile;

    if (req.user.email === req.params.email) {

      // Needy viewing their own profile
      profile = await NeedyProfile.findOne({
        email: req.params.email
      });

    } else {

      // Someone else viewing the profile
      profile = await NeedyProfile.findOne(
        { email: req.params.email },
        { idProof: 0 }
      );

    }

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found"
      });
    }

    res.json(profile);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch needy profile"
    });
  }
});
router.post("/admin/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        message: "Invalid admin credentials"
      });
    }

    const token = jwt.sign(
      {
        email: email,
        role: "Admin"
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    res.json({
      message: "Admin login successful",
      token: token
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});
router.get("/admin/users", adminAuth, async (req, res) => {

  try {

    const users = await User.find().select("-password");

    res.json(users);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to fetch users"
    });

  }

});
router.put("/admin/users/:id/status", adminAuth, async (req, res) => {

  try {

    const { id } = req.params;
    const { status } = req.body;

    if (status !== 0 && status !== 1) {
      return res.status(400).json({
        message: "Status must be 0 or 1"
      });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      message: "User status updated successfully",
      user: user
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to update user status"
    });

  }

});
router.get("/admin/email", (req, res) => {

  res.json({
    email: process.env.ADMIN_EMAIL
  });

});
module.exports = router;