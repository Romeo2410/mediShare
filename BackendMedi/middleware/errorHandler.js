const errorHandler = (error, req, res, next) => {

  if (error.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      message: "File size must be less than 5 MB"
    });
  }

  if (
    error.message ===
    "Only JPG, JPEG, PNG and WEBP images are allowed"
  ) {
    return res.status(400).json({
      message: error.message
    });
  }

  res.status(500).json({
    message: "Server error"
  });

};

module.exports = errorHandler;