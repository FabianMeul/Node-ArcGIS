// routing.js

"use strict";

//var _ = require("lodash");
var request = require("request");
var Q = require("q");

// Contstants
var ROUTING_SYNC_URL = "http://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World/";
var ROUTING_ASYNC_URL = "http://logistics.arcgis.com/arcgis/rest/services/World/Route/GPServer/FindRoutes/";

/**
 * Module exports
 */

 // Defaults for every call
 /*var _defaultOptions = {
     f: "json"
 };*/

 // Use the ArcGIS Routing API (Synchronous)
 // http://resources.arcgis.com/en/help/arcgis-rest-api/#/Route_service_with_synchronous_execution/02r300000036000000/
 // @return Promise
 exports.solve = function solve(params) {
     this.endpoint = "solve";

     this.requestOptions = {
         url: ROUTING_SYNC_URL + this.endpoint,
         // TODO
         // Add default params
         qs: params,
         json: true
     };

     var deferred = Q.defer();

     // Perform the request
     request.get(this.requestOptions, function(error, response, body) {
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

// Use the ArcGIS Routing API (Asynchronous)
// http://resources.arcgis.com/en/help/arcgis-rest-api/#/Route_service_with_asynchronous_execution/02r300000275000000/
// @return Promise
 exports.submitJob = function submitJob(params) {
     this.endpoint = "submitJob";

     this.requestOptions = {
         url: ROUTING_ASYNC_URL + this.endpoint,
         qs: params,
         json: true
     };
 };

 exports.jobs = function jobs(jobID, params) {
     this.endpoint = "jobs/";

     this.requestOptions = {
         url: ROUTING_ASYNC_URL + this.endpoint + jobID,
         qs: params,
         json: true
     };
 };
