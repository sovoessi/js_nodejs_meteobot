'use strict';

var request = require('request');
var url = require('url');
var https = require('https');

const helper = require('../config/helper');

const numDays = 3;
var darksky;


//Print Error messages
function printError(error){
	console.error(error.message);
}

module.exports = function(){

		return function(req, res, next) {
		
			let choixLang = {
								fr : "fr",
								si : 'si'
							};
			
			let hostDarksky = helper.DARKSKY_URL; 
			let key =  helper.DARKSKY_API_KEY;
			let exclude = `currently,minutely,hourly`;
			let lang = choixLang.fr || 'en';
			let units =  choixLang.si || 'us';
			
			let daysArr = [];
			let darksky;
			
			var options = {
				protocole: "https",
				host: hostDarksky,
				pathname: `${key}/${req.lat},${req.lng}`,
				query: {
							exclude : exclude,
							lang : lang,
							units : units 
					}
			};
			
			var meteoUrl = url.format(options);
			console.log(meteoUrl); 	

		
				
			request(meteoUrl, function(err, res, body){
					
				darksky = JSON.parse(body);

				if(err) printError(err);
			});
			
			setTimeout(function(){
				
				for(let i = 0; i < numDays; i++){
					
					req["jour"+i] = {};
					
					req["jour"+i] = {
							sommaire : darksky.daily.data[i].summary,
							tempCelsius : darksky.daily.data[i].temperatureMax,
							date : darksky.daily.data[i].time
						};
						console.log(req["jour"+i].sommaire);
						console.log(req["jour"+i].tempCelsius);
						console.log(req["jour"+i].date);
						
						daysArr.push(req["jour"+i]);

				}
				req.daysArr =  daysArr;
				console.log(req.daysArr);	
				
				next();
			}, 1000);
			
		};
};