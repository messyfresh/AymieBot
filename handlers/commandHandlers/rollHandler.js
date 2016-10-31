// Roll a number between 1 and any number (Default 100 if not specified)
// var debug = require('debug')('aymiebot:rollHandler')

function rollHandler (msg) {
  var highNumber = msg.msgArray[2] || 100
  var rollResult = Math.round(Math.random() * highNumber)
  msg.channel.sendMessage(rollResult)
}

module.exports.rollHandler = rollHandler
