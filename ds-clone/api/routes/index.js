// route for testing index route for the API

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const client = require('../../app/lib/db')

router.get('/', async (req, res) => {
    try {
        console.log('Connecting to MongoDB');

        await client.connect();
        res.json({ message: 'Connected to MongoDB' });
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        res.status(500).json({ message: 'Error connecting to MongoDB' });
    }
}
);

module.exports = router;
