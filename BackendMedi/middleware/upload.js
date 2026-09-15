const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,

  limits: {
    fileSize: 5 * 1024 * 1024
  },

  fileFilter: (req, file, cb) => {
      console.log(file.originalname);
  console.log(file.mimetype);

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp"
    ];

    const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];

    const extension = file.originalname
      .toLowerCase()
      .substring(file.originalname.lastIndexOf("."));

    if (
      allowedTypes.includes(file.mimetype) ||
      allowedExtensions.includes(extension)
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, JPEG, PNG and WEBP images are allowed"));
    }
  }
});

module.exports = upload;