const Student = require("../model/student.Model");

addStudent = async (req, res) => {
  try {
    const stuData = new Student({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      gender: req.body.gender,
      rollnumber: req.body.rollnumber,
      standard: req.body.standard,
    });
    const student = await stuData.save();
    if (student) {
      res.status(200).send({
        success: true,
        message: "Student inserted successfully!",
        res: student,
      });
    } else {
      res.status(403).send({
        success: false,
        message: "Something went wrong!",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};

getAllStudents = async (req, res) => {
  try {
    const allStudents =await  Student.aggregate([
      {
        $lookup: {
          from: 'results',
          localField: '_id',
          foreignField: 'student_id',
          as: 'result'
        }
      }
    ])
    if (allStudents) {
      res.status(200).send({
        success: true,
        message: "Students get successfully!",
        res: allStudents,
        total: allStudents.length,
      });
    } else {
      res.status(403).send({
        success: false,
        message: "Something went wrong!",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};

getStudentById = async (req, res) => {
  try {
    const student = await Student.findById({ _id: req.params.id });
    if (student) {
      res.status(200).send({
        success: true,
        message: "Student get successfully!",
        res: student,
      });
    } else {
      res.status(403).send({
        success: false,
        message: "Something went wrong!",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};

updateStudent = async (req, res) => {
  try {
    const existingStudent = await Student.findById({ _id: req.params.id });
    const { firstname, lastname, email, gender, rollnumber, standard } =
      req.body;
    const updatedData = {
      firstname,
      lastname,
      email,
      rollnumber,
      gender,
      standard,
    };
    if (existingStudent) {
      const updatedStu = await Student.findByIdAndUpdate(
        req.params.id,
        updatedData,
        { new: true }
      );
      if (updatedStu) {
        res.status(200).send({
          success: true,
          message: "Students updated successfully!",
          res: updatedStu,
        });
      } else {
        res.status(403).send({
          success: false,
          message: "Something went wrong!",
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};

deleteStudent = async (req, res) => {
  try {
    let deleteStudent;
    if (req.body?.status === "soft") {
      deleteStudent = await Student.findByIdAndUpdate(
        { _id: req.params.id },
        { is_deleted: true },
        { new: true }
      );
    } else {
      deleteStudent = await Student.findByIdAndDelete({
        _id: req.params.id,
      });
    }

    if (deleteStudent) {
      res.status(200).send({
        success: true,
        message: "Students deleted successfully!",
        res: deleteStudent,
      });
    } else {
      res.status(403).send({
        success: false,
        message: "Something went wrong!",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};

module.exports = {
  addStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
