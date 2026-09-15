require("dotenv").config();
const express = require("express");
const app = express();
const {connectDB}= require("../database/db")
connectDB();
app.use(express.json());
app.use(express.urlencoded({extended : true}));

const cors = require("cors");

app.use(cors({
  origin: "https://medi-share-wine.vercel.app",
  credentials: true
}));
const routes = require("../routes/route");
const errorHandler = require("../middleware/errorHandler");

app.use("/api", routes);
app.use(errorHandler);

module.exports =app;