const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const requireDb = require("../middleware/requireDb");

const router = express.Router();

/*
REGISTER
*/
router.post("/register", requireDb, async (req, res) => {

    try {

        const {
            name,
            companyName,
            email,
            phone,
            password
        } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered"
            });
        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const user = new User({
            name,
            companyName,
            email,
            phone,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            message: "Registration Successful"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

/*
LOGIN
*/
router.post("/login", requireDb, async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        const user =
            await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid Email"
            });
        }

        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Password"
            });
        }

        const token =
            jwt.sign(
                {
                    userId: user._id
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "7d"
                }
            );

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});
router.get("/me", async (req, res) => {
    res.json({
        message: "User Auth Route Working"
    });
});
module.exports = router;