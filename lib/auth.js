var passport = require('passport');
var DiscordStrategy = require('passport-discord').Strategy;
var db = require('./db');
var dbUri = require('../conf/conf.json').db.uri;

var models = require('./models.js');


//Connect to Database
db.connect();

//Call Passport
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

var scopes;