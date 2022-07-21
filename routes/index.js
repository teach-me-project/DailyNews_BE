const express = require('express');
const app = express();
const authRouter = require('./authRouter');
const authVerfity = require('../helper/verityAuth');
app.use('/auth', authRouter);
module.exports = app;
