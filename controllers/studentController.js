const College = require("../models/College");
const Student = require("../models/Student");
const bcrypt = require("bcrypt");

exports.getStudentProjects = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).populate("projects");

    res.status(200).json({
      projects: student.projects,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
};

exports.signup = async (req, res) => {
  try {
    const {
      studentName,
      email,
      password,
      enrollmentNumber,
      aadharNumber,
      collegeId,
    } = req.body;
    const college = await College.findById(collegeId);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newStudent = new Student({
      studentName,
      email,
      password: hashedPassword,
      enrollmentNumber,
      aadharNumber,
      collegeId,
    });
    const student = await newStudent.save();
    college.students.push(student._id);
    await college.save();

    res.status(201).json({
      message: "Successfully Signed UP!",
      student,
    });
  } catch (error) {
    res.status(500).json({
      message: "an error occured.",
      error,
    });
  }
};
exports.editStudent = async (req, res) => {
  try {
    const { studentName, email, password, enrollmentNumber, aadharNumber } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    foundStudent = await Student.findById(req.user.id);
    const updatedStudent = await Student.findByIdAndUpdate(
      req.user.id,
      {
        studentName,
        email,
        password: hashedPassword,
        enrollmentNumber,
        aadharNumber,
      },
      { new: true }
    );
    const student = await updatedStudent.save();
    res.status(201).json({
      message: "Successfully updated!",
      student,
    });
  } catch (error) {
    res.status(500).json({
      message: "an error occured.",
      error,
    });
  }
};
