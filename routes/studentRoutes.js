const express = require("express");
const studentController = require("../controllers/studentController");
const authMiddleware = require("../utils/authMiddleware");

const router = express.Router();

router.get(
  "/projects",
  authMiddleware.isStudent,
  studentController.getStudentProjects
);

router.post("/signup", studentController.signup);

router.patch(
  "/student",
  authMiddleware.isStudent,
  studentController.editStudent
);

module.exports = router;
