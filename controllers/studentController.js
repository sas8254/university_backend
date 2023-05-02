const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Student = require("../models/student");

const registerStudent = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingStudent = await Student.findOne({ email });

    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const student = new Student({ name, email, password: hashedPassword });

    await student.save();

    res.status(201).json({ message: "Student registered successfully." });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, student.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ id: student._id }, "your_jwt_secret", {
      expiresIn: "1h",
    });

    res.status(200).json({ token, studentId: student._id });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

const addProject = async (req, res) => {
  try {
    const studentId = req.studentId;
    const { title, description } = req.body;

    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    student.projects.push({ title, description });

    await student.save();

    res.status(201).json({ message: "Project added successfully." });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

const getProjects = async (req, res) => {
  try {
    const studentId = req.studentId;

    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.status(200).json(student.projects);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

module.exports = {
  registerStudent,
  loginStudent,
  addProject,
  getProjects,
};
