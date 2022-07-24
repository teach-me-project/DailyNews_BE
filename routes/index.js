/** @format */

const express = require('express');
const app = express();
const authRouter = require('./authRouter');
const postRouter = require('./postRouter');
const usersRouter = require('./usersRouter');
const commentRouter = require('./commentRouter');
const bookmarkRouter = require('./bookmarkRouter')
const verifyAuth = require('../helper/verifyAuth');
app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/users', usersRouter);
app.use('/comment', commentRouter);
app.use('/bookmark', bookmarkRouter);


module.exports = app;
