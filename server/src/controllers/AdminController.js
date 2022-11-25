const Admin = require("../model/admin.Model");
const jwt = require('jsonwebtoken');

addAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new Admin({
        email,password
    })
    const admin = await user.save({ email: email, password: password });
    if (admin) {
      res.status(200).send({
        success: true,
        message: "Admin inserted successfully!",
        res: admin,
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

signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email }).select('-password');
    if (admin) {
      const token = jwt.sign(
        { email: admin.email, id: admin._id },
        process.env.SECRET
      );
      res.status(200).send({
        success: true,
        message: "Admin inserted successfully!",
        res: admin,
        token: token,
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

module.exports = { addAdmin, signIn}
