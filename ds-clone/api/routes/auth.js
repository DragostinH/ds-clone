const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Session = require('../models/Session');
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const secret = process.env.JWT_SECRET;


/**
 * @route GET api/login/
 * @desc Tests login route
 * @access Public
 **/



/**
 * @route POST api/login/
 * @desc Login route
 * @access Public
 * @param {string} name
 * @param {string} password
 * @returns {string} jwt
 * @returns {string} user_id
 * @returns {string} name
 * @returns {string} email
 * @returns {string} password
 * @returns {string} _id
 **/

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    // check if user already logged in
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const sessionCheck = await Session.findOne({ user_id: user._id });
        if (sessionCheck) {
            return res.status(400).json({ message: 'User already logged in' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
        };

        const token = jwt.sign(payload, secret, { expiresIn: '10h' });

        const session = new Session({
            user_id: user.id,
            jwt: token,
        });

        await session.save();

        res.cookie('token', token, { expires: new Date(Date.now() + 36000000), httpOnly: true, secure: false, sameSite: 'none' });

        res.json({ message: 'Logged in', token, user_id: user.id, name: user.name, email: user.email, password: user.password, _id: user._id });
    } catch (error) {
        console.error(error);
        res.json({ message: error });
    }

});


/**
 * @route POST api/logout/
 * @desc Logout route
 * @access Public
 * @param {string} user_id
 * @returns {string} message
 * @returns {string} user_id
 * @returns {string} jwt
 * @returns {string} _id
 * 
 * **/

router.post('/logout', async (req, res) => {
    const { user_id } = req.body;
    try {
        const session = await Session.findOneAndDelete({ user_id });
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        res.clearCookie('token');

        res.json({ message: 'Logged out', user_id: session.user_id, jwt: session.jwt, _id: session._id });
    } catch (error) {
        console.error(error);
        res.json({ message: error });
    }
}
);


/**
 * @route POST api/register/
 * @desc Register route
 * @access Public
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @returns {string} message
 * @returns {string} name
 * @returns {string} email
 * 
 * **/

router.post('/register', async (req, res) => {

    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword,
        });

        await user.save();
        res.json({ message: 'User registered', name: user.name, email: user.email });

    } catch (error) {
        console.error(error);
        res.json({ message: error });
    }
}
);

/**
 * @route GET api/verify/
 */


const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = decoded;
        next();
    });
}


module.exports = router;