const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

//connect database
const URL =
  "mongodb+srv://sandali:san345@cluster0.sgrgw3h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database!");
    // add your code here
  })
  .catch((err) => {
    console.error("Failed to connect to database", err);
  });

app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT} !`);
});

const eventRouter = require("./Routes/eventRoutes");

app.use("/event", eventRouter);
