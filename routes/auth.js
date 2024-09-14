import express from "express"
const router = express.Router();
import User from "../models/User.model.js"

import bcrypt from "bcryptjs"

import jwt from "jsonwebtoken"

import authMiddleware from "../middleware/authMiddleware.js"

import BlacklistToken from "../models/BlacklistToken.js"

// User Signup
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = new User({ name, email, password });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(400).json({ message: 'Error registering user' });
    }
});

// User Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(400).json({ message: 'Login error' });
    }
});



// Get all users in a paginated format
router.get('/users', authMiddleware, async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const users = await User.find()
            .skip((page - 1) * limit)
            .limit(limit);
        
        const totalUsers = await User.countDocuments();
        
        res.json({
            totalUsers,
            totalPages: Math.ceil(totalUsers / limit),
            currentPage: page,
            users
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});


router.post('/logout', authMiddleware, async (req, res) => {
    try {
        const token = req.header('Authorization').split(' ')[1];
        
        // Save the token in the blacklist
        const blacklistedToken = new BlacklistToken({ token });
        await blacklistedToken.save();

        res.json({ msg: 'User logged out successfully' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

export default router ;