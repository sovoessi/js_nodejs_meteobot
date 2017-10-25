'use strict';

const config = require('./config');


module.exports = {

	DARKSKY_URL : config.darksky.url,
	DARKSKY_API_KEY : config.darksky.APIKey,
	
	GOO_URL : config.geocodingGoogle.urlGoogle,
	GOO_FORMAT : config.geocodingGoogle.formatGoogle,
	GOO_API_KEY : config.geocodingGoogle.apiKey
};

