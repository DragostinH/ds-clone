// route for testing index route for the API

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API' });
}   
);

module.exports = router;
