'use strict';

const request = require('request');
const url = require('url');

const helper = require('../config/helper');


//Print Error messages
function printError(error){
	console.error(error.message);
}

module.exports = function(){

	return function(req, res, next) {
		
		let localization;
		
		let hostGoogle = helper.GOO_URL; 
		let format = helper.GOO_FORMAT;
		let key =  helper.GOO_API_KEY;
		
			   
		const options = {
			protocole: "https",
			host: hostGoogle,
			pathname: format,
			query: {address : req.body.address, key : key}
		};
			
		const geocodingUrl = url.format(options);
		console.log(geocodingUrl); 

		request(geocodingUrl, function(err, res, body){
			
			localization = JSON.parse(body);
			console.log(localization);
		
		});
	
		setTimeout(function(){
			
						
			req.lieu = localization.results[0].formatted_address;
			console.log(req.lieu);
			req.lat =  localization.results[0].geometry.location.lat;
			console.log(req.lat);
			req.lng =  localization.results[0].geometry.location.lng;
			console.log(req.lng);
			
			
			next();

		}, 2000);
	};
};

