const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const College = require("../models/college");
const Student = require("../models/student");

const registerCollege = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingCollege = await College.findOne({ email });

    if (existingCollege) {
      return res.status(400).json({ message: "College already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const college = new College({ name, email, password: hashedPassword });

    await college.save();

    res.status(201).json({ message: "College created successfully." });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

const loginCollege = async (req, res) => {
  try {
    const { email, password } = req.body;

    const college = await College.findOne({ email });

    if (!college) {
      return res.status(404).json({ message: "College not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, college.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ id: college._id }, "your_jwt_secret", {
      expiresIn: "1h",
    });

    res.status(200).json({ token, collegeId: college._id });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

const addStudent = async (req, res) => {
  try {
    const { collegeId } = req.params;
    const { name, email, password } = req.body;

    const existingStudent = await Student.findOne({ email });

    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const student = new Student({
      name,
      email,
      password: hashedPassword,
      college: collegeId,
    });

    await student.save();

    await College.findByIdAndUpdate(collegeId, {
      $push: { students: student._id },
    });

    res.status(201).json({ message: "Student added successfully." });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

const getStudent = async (req, res) => {
  try {
    const { collegeId, studentId } = req.params;

    const college = await College.findById(collegeId);

    if (!college) {
      return res.status(404).json({ message: "College not found." });
    }

    const student = await Student.findById(studentId).populate("college");

    if (!student || student.college._id.toString() !== collegeId) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { collegeId, studentId } = req.params;
    const { name, email, password } = req.body;

    const college = await College.findById(collegeId);

    if (!college) {
      return res.status(404).json({ message: "College not found." });
    }

    const student = await Student.findById(studentId);

    if (!student || student.college.toString() !== collegeId) {
      return res.status(404).json({ message: "Student not found." });
    }

    const hashedPassword = password
      ? await bcrypt.hash(password, 12)
      : student.password;

    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { name, email, password: hashedPassword },
      { new: true }
    );

    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { collegeId, studentId } = req.params;

    const college = await College.findById(collegeId);

    if (!college) {
      return res.status(404).json({ message: "College not found." });
    }

    const student = await Student.findById(studentId);

    if (!student || student.college.toString() !== collegeId) {
      return res.status(404).json({ message: "Student not found." });
    }

    await Student.findByIdAndDelete(studentId);

    await College.findByIdAndUpdate(collegeId, {
      $pull: { students: studentId },
    });

    res.status(200).json({ message: "Student deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

const getProjects = async (req, res) => {
  try {
    const { collegeId, studentId } = req.params;

    const college = await College.findById(collegeId);

    if (!college) {
      return res.status(404).json({ message: "College not found." });
    }

    const student = await Student.findById(studentId);

    if (!student || student.college.toString() !== collegeId) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.status(200).json(student.projects);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

const updateProjectStatus = async (req, res) => {
  try {
    const { collegeId, studentId, projectId } = req.params;
    const { status } = req.body;

    const college = await College.findById(collegeId);

    if (!college) {
      return res.status(404).json({ message: "College not found." });
    }

    const student = await Student.findById(studentId);

    if (!student || student.college.toString() !== collegeId) {
      return res.status(404).json({ message: "Student not found." });
    }

    const projectIndex = student.projects.findIndex(
      (project) => project._id.toString() === projectId
    );

    if (projectIndex === -1) {
      return res.status(404).json({ message: "Project not found." });
    }

    student.projects[projectIndex].status = status;

    await student.save();

    res.status(200).json({ message: "Project status updated successfully." });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

module.exports = {
  registerCollege,
  loginCollege,
  addStudent,
  getStudent,
  updateStudent,
  deleteStudent,
  getProjects,
  updateProjectStatus,
};
