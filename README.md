# simple-node-steam-openid

[![npm version](https://badge.fury.io/js/node-steam-openid.svg)](https://badge.fury.io/js/node-steam-openid)
[![dependencies](https://img.shields.io/david/gitBaiano/simple-node-steam-openid?style=plastic)](https://img.shields.io/david/gitBaiano/simple-node-steam-openid?style=plastic)

A lightweight wrapper package around Steam's Authentication API, which supports promises :)

## Usage

Install the package by typing `npm i node-steam-openid` in your project folder.

### Setup

```javascript
const SteamAuth = require("node-steam-openid");

const steam = new SteamAuth({
  realm: "http://localhost:5000", // Site name displayed to users on logon
  returnUrl: "http://localhost:5000/auth/steam/authenticate", // Your return route
  apiKey: "XXXXXXXXXXXXXXXXXXXXXXXXXX" // Steam API key
});
```

### Routes

```javascript
app.get("/auth/steam", async (req, res) => {
  const redirectUrl = await steam.getRedirectUrl();
  return res.redirect(redirectUrl);
});

app.get("/auth/steam/authenticate", async (req, res) => {
  try {
  // user = steam64 ID
    const user = await steam.authenticate(req);

    //...do something with the data
  } catch (error) {
    console.error(error);
  }
});
```

## Methods

### getRedirectUrl

Gets the redirect URL to Steam.

#### Parameters

None

#### Returns

- Promise (String)

#### Example

```javascript
steam.getRedirectUrl().then(url => {
  //...do something with the url
});
```

### authenticate

Authenticates the user with oAuth.

#### Parameters

- request (ExpressJsRequest, Object)

#### Returns

- Promise (UserObject)

#### Example

```javascript
steam.authenticate(req).then(user => {
  //...do something with the user
});
```

## Objects

### UserObject

Object which holds user's steamID64 from request.

#### Example

```javascript
"12345678912345678"
```

## License

MIT <3
