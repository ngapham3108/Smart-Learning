const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const verifyToken = require('../middleware/auth');

// @route GET /api/auth
// @desc Verify Token
// @access Public
router.get('/', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found',
            });
        }
        return res.json({
            success: true,
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
});

// @route POST /api/auth/register/
// @desc Register User
// @access Public
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Simple validation
    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: 'Missing username and/or password',
        });
    }

    try {
        // Check for existing username
        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({
                success: false,
                message: 'Username is already taken',
            });
        }

        // Looks good

        const hashedPassword = await argon2.hash(password);
        const newUser = new User({ username, password: hashedPassword });

        await newUser.save();
        // Return jwt
        const accessToken = jwt.sign(
            { userId: newUser._id },
            process.env.ACCESS_TOKEN_SECRET,
        );

        return res.json({
            success: true,
            message: 'User is created succcessfully',
            accessToken,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
});

// @route POST /api/auth/login/
// @desc User Login
// @access Public
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Simple validation
    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: 'Missing username and/or password',
        });
    }

    try {
        // Check for existing username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Incorect username or password',
            });
        }

        // Username is found

        const passwordValid = await argon2.verify(user.password, password);

        if (!passwordValid) {
            return res.status(400).json({
                success: false,
                message: 'Incorect username or password',
            });
        }

        // Looks good. Return jwt
        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET,
        );

        return res.json({
            success: true,
            message: 'User Logged in successfully',
            accessToken,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
});

module.exports = router;
