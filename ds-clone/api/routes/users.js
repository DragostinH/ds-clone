const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const keys = require('../../config/keys');
const passport = require('passport');


/**
 * @route   GET api/users/`
 * @desc    Tests users route
 * @access  Public
 *  
 * */

router.get('/users', async (req, res) => {
    try {
        const users = await User.find().limit(10);
        res.json(users);
    } catch (error) {
        console.error(error);
        res.json({ message: error });
    }
});

/**
 * @route   POST api/users/register
 * @desc    Register user
 * @access  Public
 */

router.post('/create', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({
            name,
            email,
            password,
        });
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (error) {
        console.error(error);
        res.json({ message: error });
    }
});

module.exports = router;