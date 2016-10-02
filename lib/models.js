var mongoose = require('mongoose')

var Schema = mongoose.Schema

var userSchema = new Schema({
  username: {
    type: String,
    require: true
  }
})

var User = mongoose.model('users', userSchema)

var model = {User}

module.exports.model = model
