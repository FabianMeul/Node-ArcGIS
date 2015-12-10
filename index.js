// index.js
//

'use strict';

// Constants
var oAuth = require('./lib/auth/oauth.js');
var Geocode = require('./lib/geocode.js');

// Get the access token
oAuth.requestToken();

/**
 * Module exports
 */

// oAuth module
exports.oAuth = oAuth;

// Geocoding module
exports.Geocode = Geocode;
