const mongoDB = require('./mongodb');
const cors = require('cors');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

async function main() {
    try {
        await mongoDB.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(error);
    }
}

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
}))

main();

app.use(express.json());

app.use('/api', indexRouter);

app.use('/api', usersRouter);

module.exports = app;