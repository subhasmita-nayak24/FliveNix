import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';


const loginController = async (req, res) => {
    const saltRounds = 10;
    try {
        const { email, password } = req.body;
        // Check if the user exists
        const existUser = await User.findOne({ email });
        if (!existUser) {
            return res.status(403).json({
                message: 'password is wrong',
                success: false,
            });
        }

        // Compare the provided password with the hashed password in the database
        const isPassEqual = await bcrypt.compare(password, existUser.password);
        if (!isPassEqual) {
            return res.status(403).json({
                message: 'password is wrong',
                success: false,
            });
        }
        // If the password matches, generate a JWT token
        const token = jwt.sign(
            { email: existUser.email, _id: existUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )
        // Send a success response with the token and user details
        return res.status(200).json({
            message: 'Login successfully',
            success: true,
            token: token,
            email,
            username: existUser.username
        })
    } catch (err) {
        return res.status(500).json({
            message: 'Internal server error',
            success: false,
        })
    }
}

export default loginController;
