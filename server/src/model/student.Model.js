const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true, minlength: 2 },
    lastname: { type: String, required: true, minlength: 2 },
    rollnumber: { type: String },
    email: { type: String, required: true, unique: true },
    standard: { type: String },
    gender: { type: String },
    total: { type: String },
    is_deleted: { type: Boolean, default: false}
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
