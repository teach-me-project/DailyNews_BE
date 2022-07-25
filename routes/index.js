/** @format */

const express = require('express');
const app = express();
const authRouter = require('./authRouter');
const postRouter = require('./postRouter');
const usersRouter = require('./usersRouter');
const commentRouter = require('./commentRouter');
const likeunlikeRouter = require('./likeRouter');
const bookmarkRouter = require('./bookmarkRouter');
const notificationRouter = require('./notificationRouter');
const verifyAuth = require('../helper/verifyAuth');

app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/users', usersRouter);
app.use('/comment', commentRouter);
app.use('/like', likeunlikeRouter);
app.use('/bookmark', bookmarkRouter);
app.use('/notification', notificationRouter);

module.exports = app;
