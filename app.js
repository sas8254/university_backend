const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const collegeRoutes = require("./routes/collegeRoutes");
const studentRoutes = require("./routes/studentRoutes");
const projectRoutes = require("./routes/projectRoutes");
const authRoutes = require("./routes/authRoutes");
const bodyParser = require("body-parser");

dotenv.config();

mongoose
  .connect(
    "mongodb+srv://sarvaiyadarshan41:LYtJVbANLvfF41Mh@cluster0.pfwm9yu.mongodb.net/test",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/colleges", collegeRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3100;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
