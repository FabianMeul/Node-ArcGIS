// geocoding.js

"use strict";

var _ = require("lodash");
var request = require("request");
var Q = require("q");

// Constants
var GEOCODE_BASE_URL = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/";

/**
 * Module exports
 */

// Defaults for every call
var _defaultOptions = {
    f: "json",
    forStorage: false
};


// Perform a request to the ArcGIS API
// @return Promise
var arcGISRequest = function arcGISRequest(requestOptions) {

    // Check if an access token is required
    // forStorage: true requires token access
    if (requestOptions.qs.forStorage) {
        console.info("This call requires API Token access.");
    }

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

// Override default params
var createParams = function createParams(params) {
    return _.assign(_.cloneDeep(_defaultOptions), params);
};

// Use the ArcGIS Geocoding Find API
// https://developers.arcgis.com/rest/geocode/api-reference/geocoding-find.htm
// @return Promise
exports.find = function find(params) {
    this.endpoint = "find";

    this.requestOptions = {
        url: GEOCODE_BASE_URL + this.endpoint,
        qs: createParams(params),

        // {
        //     // Required parameters
        //     text: address,
        //     f: _format
        //
        //     // Optional parameters
        //     // magicKey: "",
        //     // sourceCountry: "",
        //     // bbox: {};
        //     // location: {},
        //     // distance: 0,
        //     // outSR: 4326,
        //     // category: "",
        //     // outFields: "",
        //     // maxLocations: 10,
        //     // forStorage: false
        // },
        json: true
    };

    return arcGISRequest(this.requestOptions);
};

// Use the ArcGIS FindAddressCandidates API
// https://developers.arcgis.com/rest/geocode/api-reference/geocoding-find-address-candidates.htm
exports.findAddressCandidates = function findAddressCandidates(params) {
    this.endpoint = "findAddressCandidates";

    this.requestOptions = {
        url: GEOCODE_BASE_URL + this.endpoint,
        qs: createParams(params),
        // {
        //     // Required parameters
        //     f: _format,
        //
        //     // Optional parameters
        //     // singleLine: "",
        //     // address: "",
        //     // neighborhood: "",
        //     // city: "",
        //     // subregion: "",
        //     // region: "",
        //     // postal: "",
        //     // postalExt: "",
        //     // countryCode: "",
        //     // magicKey: "",
        //     // searchExtent: "",
        //     // location: "",
        //     // category: "",
        //     // outSR: 4326,
        //     // outFields: "",
        //     // maxLocations: 10,
        //     // forStorage: false,
        // },
        json: true
    };

    return arcGISRequest(this.requestOptions);
}

// Use the ArcGIS FindAddressCandidates API
// https://developers.arcgis.com/rest/geocode/api-reference/geocoding-find-address-candidates.htm
exports.geocodeAddresses = function geocodeAddresses(params) {
    this.endpoint = "geocodeAddresses";

    this.requestOptions = {
        url: GEOCODE_BASE_URL + this.endpoint,
        qs: createParams(params),
        // {
        //     // Required parameters
        //     addresses: addresses,
        //     f: _format,
        //     token: token
        //
        //     // Optional parameters
        //     // category: "",
        //     // sourceCountry: "",
        //     // outSR: 4326
        // },
        json: true
    };

    // This in an invalid parameter on the geocodeAddresses API call.
    delete this.requestOptions.qs.forStorage;

    return arcGISRequest(this.requestOptions);
};

// Use the ArcGIS ReverseGeocode API
// https://developers.arcgis.com/rest/geocode/api-reference/geocoding-reverse-geocode.htm
exports.reverseGeocode = function reverseGeocode(params) {
    this.endpoint = "reverseGeocode"

    this.requestOptions = {
        url: GEOCODE_BASE_URL + this.endpoint,
        qs: createParams(params),
        json: true
    };

    return arcGISRequest(this.requestOptions);
};

// Use the ArcGIS Geocoding Suggest API
// https://developers.arcgis.com/rest/geocode/api-reference/geocoding-suggest.htm
// @return Promise
exports.suggest = function suggest(params) {
    this.endpoint = "suggest";

    this.requestOptions = {
        url: GEOCODE_BASE_URL + this.endpoint,
        qs: createParams(params),
        json: true
    };

    return arcGISRequest(this.requestOptions);
};
