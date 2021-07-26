// Require Dependencies
const axios = require("axios");
const openid = require("openid");

// Main Class
class SteamAuth {
  constructor({ realm, returnUrl, apiKey }) {
    if (!realm || !returnUrl || !apiKey)
      throw new Error(
        "Missing realm, returnURL or apiKey parameter(s). These are required."
      );

    this.realm = realm;
    this.returnUrl = returnUrl;
    this.apiKey = apiKey;
    this.relyingParty = new openid.RelyingParty(
      returnUrl,
      realm,
      true,
      true,
      []
    );
  }

  // Get redirect url for Steam
  async getRedirectUrl() {
    return new Promise((resolve, reject) => {
      this.relyingParty.authenticate(
        "https://steamcommunity.com/openid",
        false,
        (error, authUrl) => {
          if (error) return reject("Authentication failed: " + error);
          if (!authUrl) return reject("Authentication failed.");

          resolve(authUrl);
        }
      );
    });
  }

  // Authenticate user
  async authenticate(req) {
    return new Promise((resolve, reject) => {
      // Verify assertion
      this.relyingParty.verifyAssertion(req, async (error, result) => {
        if (error) return reject(error.message);
        if (!result || !result.authenticated)
          return reject("Failed to authenticate user.");
        if (
          !/^https?:\/\/steamcommunity\.com\/openid\/id\/\d+$/.test(
            result.claimedIdentifier
          )
        )
          return reject("Claimed identity is not valid.");

        try {
          const user = result.claimedIdentifier;
          return resolve(user);
        } catch (error) {
          reject(error);
        }
      });
    });
  }
}

// Export class
module.exports = SteamAuth;
