/** @format */

require('dotenv').config();
const express = require('express');
const app = express();
const port = 3289;
const bodyParser = require('body-parser');
const router = require('./routes');
const cors = require('cors');
const path = require('path');
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/upload', express.static(path.join(__dirname, 'upload')));
app.use('/api/v1', router);
app.listen(port, () => {
	console.log(`TeachMe-DailyNews-Backend ${port}`);
});

//TES PUSH/PULL
//TEST PUSH 2
