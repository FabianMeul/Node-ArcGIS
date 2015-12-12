# node-arcgis
Node.js implementation for the ArcGIS REST API.

[![Build Status](https://travis-ci.org/FabianMeul/Node-ArcGIS.svg?branch=develop)](https://travis-ci.org/FabianMeul/Node-ArcGIS)

##Install
```
npm install node-arcgis
```

##Usage
```
var ArcGIS = require("node-arcgis");
```

### Geocode
To make use of the Geocode API, you can use `ArcGIS.Geocode` property. All of the operations that are possible on the [ArcGIS REST API: World Geocoding Service](https://developers.arcgis.com/rest/geocode/api-reference/overview-world-geocoding-service.htm) are available. The function names correspond with the operation name that is provided as an ArcGIS Geocode service.

* ArcGIS.Geocode.find
* ArcGIS.Geocode.findAddressCandidates
* ArcGIS.Geocode.geocodeAddresses
* ArcGIS.Geocode.reverseGeocode
* ArcGIS.Geocode.suggest

This module provides some defaults. These default will be overwritten if explicitly put in the requestParams object.

**Defaults**

```
var _defaultOptions = {
    f: "json",    
    forStorage: false
};
```


#### ArcGIS.Geocode.find(requestParams)
See the available params at [ArcGIS Geocode Find](https://developers.arcgis.com/rest/geocode/api-reference/geocoding-find.htm).

#### ArcGIS.Geocode.findAddressCandidates(requestParams)
See the available params at [ArcGIS Geocode findAddressCandidates](https://developers.arcgis.com/rest/geocode/api-reference/geocoding-find-address-candidates.htm).

#### ArcGIS.Geocode.geocodeAddresses(requestParams)
See the available params at [ArcGIS Geocode GeocodeAddresses](https://developers.arcgis.com/rest/geocode/api-reference/geocoding-geocode-addresses.htm).

#### ArcGIS.Geocode.reverseGeocode(requestParams)
See the available params at [ArcGIS Geocode ReverseGeocode](https://developers.arcgis.com/rest/geocode/api-reference/geocoding-reverse-geocode.htm).

#### ArcGIS.Geocode.suggest(requestParams)
See the available params at [ArcGIS Geocode Suggest](https://developers.arcgis.com/rest/geocode/api-reference/geocoding-suggest.htm).