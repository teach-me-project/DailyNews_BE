/** @format */

const express = require('express');
const app = express();
const authRouter = require('./authRouter');
const postRouter = require('./postRouter');
const authVerfity = require('../helper/verityAuth');
app.use('/auth', authRouter);
app.use('/post', postRouter);

module.exports = app;
