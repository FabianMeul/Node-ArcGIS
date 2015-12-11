var expect    = require("chai").expect;
var ArcGIS    = require("../index");

describe("ArcGIS Geocode", function() {
    // Find Address
    describe("ArcGIS Geocode Find Address", function() {
        it("fetches an address", function() {

            // Allow 5000ms for this test
            this.timeout(5000);

            var requestObject = {
                text: "Veldkant 35c, Kontich"
            };

            return ArcGIS.Geocode.find(requestObject).then(
                function(response) {
                    expect(response).to.ownProperty("locations");
                    expect(response.locations).to.be.an("array");
                }
            )
        });
    });

    // Suggest Addresses
    describe("ArcGIS Geocode Suggest Address", function() {
        it("fetches suggestions", function() {

            // Allow 5000ms for this test
            this.timeout(5000);

            var requestObject = {
                text: "Veldkant 35c"
            };

            return ArcGIS.Geocode.suggest(requestObject).then(
                function(response) {
                    expect(response).to.ownProperty("suggestions");
                    expect(response.suggestions).to.be.an("array");
                }
            )
        });
    });

    // Find Address candidates
    describe("ArcGIS Geocode Find Address Candidates", function() {
        it("Finds an address candidate based on parameters", function() {

            // Allow 5000ms for this test
            this.timeout(5000);

            var requestObject = {
                address: "Veldkant 35c",
                city: "Kontich",
                countryCode: "BEL"
            };

            return ArcGIS.Geocode.findAddressCandidates(requestObject).then(
                function(response) {
                    expect(response).to.ownProperty("candidates");
                    expect(response.candidates).to.be.an("array");
                    expect(response).to.ownProperty("spatialReference");
                }
            )
        });
    });

    // Geocode Address
    describe("ArcGIS Geocode Address", function() {
        it("requires a token", function() {

            // Allow 5000ms for this test
            this.timeout(5000);

            var requestObject = {
                addresses: {
                    records: [
                        {
                            attributes: {
                                OBJECTID: 1,
                                SingleLine: "Veldkant 35c, Kontich"
                            }
                        }
                    ]
                }
            };

            return ArcGIS.Geocode.geocodeAddresses(requestObject).then(
                function(response) {
                    expect(response).to.ownProperty("error");
                    expect(response.error).to.ownProperty("code");
                    expect(response.error.code).to.be.equal(499);
                }
            )
        });
    });

    // Reverse Geocode
    describe("ArcGIS Geocode Reverse Geocode", function() {
        it("fetches an address based on coordinates", function() {

            // Allow 5000ms for this test
            this.timeout(5000);

            var requestObject = {
                // TODO
                // Fix this

                // This does not work :-()
                // location: {
                //     x: 4.443045333000441,
                //     y: 51.141962693000494
                // }

                // This works
                location: "4.443045333000441, 51.141962693000494"
            };

            return ArcGIS.Geocode.reverseGeocode(requestObject).then(
                function(response) {
                    expect(response).to.ownProperty("address");
                    expect(response).to.ownProperty("location");
                    expect(response.location).to.ownProperty("spatialReference");
                }
            )
        });
    });
});
