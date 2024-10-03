import bcrypt from 'bcrypt';
import User from '../models/User.js';

const signupController = async (req, res) => {
  const saltRounds = 10;
  try {
    const { username, email, password } = req.body;
    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(400).json({
        message: 'User already exists',
        success: false,
      });
    }

    const userModel = new User({ username, email, password });
    userModel.password = await bcrypt.hash(password, saltRounds);
    await userModel.save();

    return res.status(201).json({
      message: 'Signup successfully',
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Internal server error',
      success: false,
    });
  }
};

export default signupController;
