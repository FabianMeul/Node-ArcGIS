// geocoding.js

"use strict";

var request = require("request");
var Q = require("q");

// Constants
var GEOCODE_BASE_URL = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/";

/**
 * Module exports
 */

// Defaults
var _format = "json";


// Perform a request to the ArcGIS API
// @return Promise
var arcGISRequest = function arcGISRequest(requestOptions) {
    var deferred = Q.defer();

    // Perform the request
    request.get(requestOptions, function(error, response, body) {
        if (!error) {
            deferred.resolve(body);
        }
        else {
            deferred.reject(error);
        }
    });

    // Return the promise
    return deferred.promise;
};

// Set the format
exports.setFormat = function setFormat(format) {
    _format = format;
};

// Use the ArcGIS Geocoding Find API
// https://developers.arcgis.com/rest/geocode/api-reference/geocoding-find.htm
// @return Promise
exports.find = function find(address) {
    this.endpoint = "find";

    this.requestOptions = {
        url: GEOCODE_BASE_URL + this.endpoint,
        qs: {
            // Required parameters
            text: address,
            f: _format

            // Optional parameters
            // magicKey: "",
            // sourceCountry: "",
            // bbox: {};
            // location: {},
            // distance: 0,
            // outSR: 4326,
            // category: "",
            // outFields: "",
            // maxLocations: 10,
            // forStorage: false
        },
        json: true
    };

    return arcGISRequest(this.requestOptions);
};

// Use the ArcGIS FindAddressCandidates API
// https://developers.arcgis.com/rest/geocode/api-reference/geocoding-find-address-candidates.htm
exports.findAddressCandidates = function findAddressCandidates() {
    this.endpoint = "findAddressCandidates";

    this.requestOptions = {
        url: GEOCODE_BASE_URL + this.endpoint,
        qs: {
            // Required parameters
            f: _format,

            // Optional parameters
            // singleLine: "",
            // address: "",
            // neighborhood: "",
            // city: "",
            // subregion: "",
            // region: "",
            // postal: "",
            // postalExt: "",
            // countryCode: "",
            // magicKey: "",
            // searchExtent: "",
            // location: "",
            // category: "",
            // outSR: 4326,
            // outFields: "",
            // maxLocations: 10,
            // forStorage: false,
        },
        json: true
    };

    return arcGISRequest(this.requestOptions);
}

// Use the ArcGIS FindAddressCandidates API
// https://developers.arcgis.com/rest/geocode/api-reference/geocoding-find-address-candidates.htm
exports.geocodeAddresses = function geocodeAddresses(addresses) {
    this.endpoint = "geocodeAddresses";

    this.requestOptions = {
        url: GEOCODE_BASE_URL + this.endpoint,
        qs: {
            // Required parameters
            addresses: addresses,
            f: _format,
            token: token

            // Optional parameters
            // category: "",
            // sourceCountry: "",
            // outSR: 4326
        },
        json: true
    };

    return arcGISRequest(this.requestOptions);
};

// Use the ArcGIS ReverseGeocode API
// https://developers.arcgis.com/rest/geocode/api-reference/geocoding-reverse-geocode.htm
exports.reverseGeocode = function reverseGeocode(location, token) {
    this.endpoint = "reverseGeocode"

    this.requestOptions = {
        url: GEOCODE_BASE_URL + this.endpoint,
        qs: {
            // Required parameters
            location: location,
            f: _format,
            token: token

            // Optional parameters
            // distance: 0,
            // outSR: 4326,
            // langCode: "en",
            // forStorage: false,
            // returnIntersection: false
        },
        json: true
    };

    return arcGISRequest(this.requestOptions);
};

// Use the ArcGIS Geocoding Suggest API
// https://developers.arcgis.com/rest/geocode/api-reference/geocoding-suggest.htm
// @return Promise
exports.suggest = function suggest(address) {
    this.endpoint = "suggest";

    this.requestOptions = {
        url: GEOCODE_BASE_URL + this.endpoint,
        qs: {
            text: address,
            f: _format
        },
        json: true
    };

    return arcGISRequest(this.requestOptions);
};
