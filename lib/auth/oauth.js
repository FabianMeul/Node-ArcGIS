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
};

// Set the Client Secret
exports.setClientSecret = function setClientSecret(clientSecret) {
    _clientSecret = clientSecret;
};

// Return the token
exports.token = _token;

// Request token
exports.requestToken = function requestToken() {
    this.hasDependencyErrors = false;

    // Check clientID
    if (_clientID.length === 0) {
        this.hasDependencyErrors = true;
        console.error("node-arcgis: A valid clientID is required.");
    }

    // Check clientSecret
    if (_clientSecret.length === 0) {
        this.hasDependencyErrors = true;
        console.error("node-arcgis: A valid clientSecret is required.");
    }

    // Check if all dependencies are met
    if (this.hasDependencyErrors) {
        return;
    }

    var _deferred = Q.defer();

    // Request the access token
    request.post({
        url: "https://www.arcgis.com/sharing/rest/oauth2/token/",
        json: true,
        form: {
            "f": "json",
            "client_id": _clientID,
            "client_secret": _clientSecret,
            "grant_type": "client_credentials",
            "expiration": "1440"
        }
    }, function(error, response, body) {
        if (!error) {
            // Set the token
            _token = body.access_token;

            // Resolve the promise
            _deferred.resolve(body.access_token);
        }
        else {
            // Reject the promise on request error
            _deferred.reject(error);
        }
    });

    return _deferred.promise;

};
