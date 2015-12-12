var expect    = require("chai").expect;
var ArcGIS    = require("../index");

describe("ArcGIS oAuth", function() {
    // Setting parameters
    describe("Configuring oAuth", function() {
        it("Sets the Client ID", function() {

            var clientID = "xxx";
            var newClientID = ArcGIS.oAuth.setClientID(clientID);

            expect(newClientID).to.be.equal(clientID)
        });

        it("Sets the Client Secret", function() {

            var clientSecret = "xxx";
            var newClientSecret = ArcGIS.oAuth.setClientSecret(clientSecret);

            expect(newClientSecret).to.be.equal(clientSecret)
        });
    });

    describe("Request an oAuth Token", function() {
        it("Successfully requests an oAuth Token", function() {

        });

        it("Fails at requesting an oAuth Token", function() {

            var clientID = "xxx";
            var clientSecret = "xxx";

            // Configure oAuth
            ArcGIS.oAuth.setClientID(clientID);
            ArcGIS.oAuth.setClientSecret(clientSecret);

            return ArcGIS.oAuth.requestToken().then().catch(
                function(rejection) {
                    expect(rejection).to.ownProperty("error")
                }
            )
        });
    });
});
