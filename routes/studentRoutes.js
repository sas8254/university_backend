const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

router.post("/register", studentController.registerStudent);
router.post("/login", studentController.loginStudent);
router.post("/projects", studentController.addProject);
router.get("/projects", studentController.getProjects);

module.exports = router;
