var SpotifyWebApi = require('spotify-web-api-node')
var conf = require('../conf/conf.json').spotify

var spotifyApi = new SpotifyWebApi({
  clientId: conf.clientID,
  clientSecret: conf.secret
})
