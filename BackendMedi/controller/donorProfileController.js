const DonorProfile = require("../models/DonorProfile");

const searchDonorProfile = async (req, res) => {
  try {
    const email = req.params.email;

    const profile = await DonorProfile.findOne({ email });

    if (!profile) {
      return res.status(404).json({
        message: "Donor profile not found"
      });
    }

    res.status(200).json(profile);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error"
    });
  }
};

module.exports = {searchDonorProfile};