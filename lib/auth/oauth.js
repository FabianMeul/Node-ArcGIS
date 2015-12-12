// oauth.js
// Provide oAuth authentication for the node-arcgis module

"use strict";

var request = require("request");
var Q = require("q");

/**
 * Private properties
 */
var _clientID = "";
var _clientSecret = "";
var _token = "";


/**
 * Module exports.
 */

// Set the Client ID
exports.setClientID = function setClientID(clientID) {
    _clientID = clientID;
    return _clientID;
};

// Set the Client Secret
exports.setClientSecret = function setClientSecret(clientSecret) {
    _clientSecret = clientSecret;
    return _clientSecret;
};

// Return the token
exports.token = _token;

// Request token
exports.requestToken = function requestToken() {

    var _deferred = Q.defer();

    // Request the access token
    request.get({
        url: "https://www.arcgis.com/sharing/rest/oauth2/token/",
        qs: {
            "f": "json",
            "client_id": _clientID,
            "client_secret": _clientSecret,
            "grant_type": "client_credentials",
            "expiration": "1440"
        },
        json: true
    }, function(error, response, body) {
        if (!error) {

            // Check if the body contains an error
            if (!body.error) {
                // Set the token
                _token = body.access_token;

                // Resolve the promise
                _deferred.resolve(body.access_token);
            }
            else {
                // Reject the promise on body error
                _deferred.reject(body);
            }
        }
        else {
            // Reject the promise on request error
            _deferred.reject(error);
        }
    });

    return _deferred.promise;
};
