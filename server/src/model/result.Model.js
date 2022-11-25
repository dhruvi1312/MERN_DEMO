const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    maths: { type: String, required: true, minlength: 2 },
    english: { type: String, required: true, minlength: 2 },
    science: { type: String },
    student_id : { type: mongoose.Schema.Types.ObjectId, ref: 'Student'}
  },
  {
    timestamps: true,
  }
);

const Result = mongoose.model('Result', resultSchema);
module.exports = Result;
