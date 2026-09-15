const dns = require("dns"); dns.setServers(["1.1.1.1", "8.8.8.8"]);
const data =require("mongoose")
exports.connectDB = async () => {
  try {
    await data.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err.message);
  }
};
