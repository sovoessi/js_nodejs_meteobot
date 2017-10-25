'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const geocoding = require('./controllers/geocodingController');
const darksky = require('./controllers/darkskyController');

const port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false}));

app.get('/api/', (req, res) => {
	
	res.render('index');
});

app.post('/api/meteo',geocoding(), darksky(), (req, res) => {
	
	 for(let i = 0; i < 3; i++){
		 	console.log(`À ${req.lieu} ${req.daysArr[i].sommaire}`);
	 }	
	res.send('Done');
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});