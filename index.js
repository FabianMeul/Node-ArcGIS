// index.js
//

"use strict";

// Constants
var oAuth = require("./lib/auth/oauth");
var Geocode = require("./lib/geocode");
var Routing = require("./lib/routing");

/**
 * Module exports
 */
// oAuth module
exports.oAuth = oAuth;

// Geocoding module
exports.Geocode = Geocode;

// Routing module
exports.Routing = Routing;
