const Result = require("../model/result.Model");

addResult = async (req, res) => {
  try {
    const result = new Result({
      maths: req.body.maths,
      english: req.body.english,
      science: req.body.science,
      student_id: req.body.student_id,
      total: req.body.total,
    });
    const resultData =await result.save();
    if (resultData) {
      res.status(200).send({
        success: true,
        message: "Result inserted successfully!",
        res: resultData,
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

getResultsAllStudent = async (req, res) => {
  try {
    const resultAllStudents = await Result.find({});
    if (resultAllStudents) {
      res.status(200).send({
        success: true,
        message: "Students result get successfully!",
        res: resultAllStudents,
        total: resultAllStudents.length,
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

getResultOfStudent = async (req, res) => {
  try {
    const studentResult = await Result.findById({ _id: req.params.id });
    if (studentResult) {
      res.status(200).send({
        success: true,
        message: "tResult get successfully!",
        res: studentResult,
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

updateResult = async (req, res) => {
  try {
    const update = {
      maths: req.body.maths,
      english: req.body.english,
      science: req.body.science,
      total: req.body.total,
    };
    const updatedData = await Result.findByIdAndUpdate(
      { _id: req.params.id },
      { update },
      { new: true }
    );
    if (updatedData) {
      res.status(200).send({
        success: true,
        message: "Result updated successfully!",
        res: updatedData,
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

module.exports = { addResult, getResultsAllStudent, getResultOfStudent, updateResult };
