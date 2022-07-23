/** @format */

const express = require('express');
const app = express();
const authRouter = require('./authRouter');
const postRouter = require('./postRouter');
const usersRouter = require('./usersRouter')
const verifyAuth = require('../helper/verifyAuth');
app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/users', usersRouter);
module.exports = app;
