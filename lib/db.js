var debug = require('debug')('defusebot:db');
var mongoose = require('mongoose');
var db = require('../conf/conf.json').db;

//Connect to mongoDB
function connect(){
  mongoose.connect(db.uri, function(err){
    if(err){
      debug(err);
      return(err);
    }
    debug('Connecting to DB');
  });
  mongoose.connection.on('open', function(){
    debug('Connected to DB');
  })
}

module.exports.connect = connect;