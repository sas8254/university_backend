const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const studentRoutes = require("./routes/studentRoutes");
const collegeRoutes = require("./routes/collegeRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Replace 'your_mongodb_connection_string' with your MongoDB connection string
mongoose
  .connect("mongodb://127.0.0.1:27017/books", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to MongoDB:", error));

app.use("/student", studentRoutes);
app.use("/college", collegeRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Resource not found." });
});

app.use((error, req, res, next) => {
  res
    .status(error.status || 500)
    .json({ message: error.message || "Internal server error." });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
