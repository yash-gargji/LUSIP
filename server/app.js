const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors")
const connectDB = require("./DB/conn");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());

app.use(cors({
  credentials: true,
  origin: true}));  
app.set("trust proxy",1); 
app.use(express.json());

dotenv.config({path:"./.env"})

require("./model/userSchema")
require("./model/projectSchema")
require("./model/bookingSchema")

app.use(require("./router/authRoutes"));
app.use(require("./router/bookingRoutes"));
app.use(require("./router/hallRoutes"));

connectDB();

const PORT = process.env.PORT

app.listen(PORT, () => {
   console.log("Server is running on Port",PORT);
});
