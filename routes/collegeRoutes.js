const express = require("express");
const router = express.Router();
const collegeController = require("../controllers/collegeController");

router.post("/register", collegeController.registerCollege);
router.post("/login", collegeController.loginCollege);
router.post("/:collegeId/students", collegeController.addStudent);
router.get("/:collegeId/students/:studentId", collegeController.getStudent);
router.put("/:collegeId/students/:studentId", collegeController.updateStudent);
router.delete(
  "/:collegeId/students/:studentId",
  collegeController.deleteStudent
);
router.get(
  "/:collegeId/students/:studentId/projects",
  collegeController.getProjects
);
router.put(
  "/:collegeId/students/:studentId/projects/:projectId",
  collegeController.updateProjectStatus
);

module.exports = router;
