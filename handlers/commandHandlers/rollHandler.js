// Roll a number between 1 and any number (Default 100 if not specified)
// var debug = require('debug')('aymiebot:rollHandler')

function rollHandler (msg) {
  let highNumber = msg.msgArray[2] || 100
  let rollResult = Math.round(Math.random() * highNumber)
  msg.channel.sendMessage(rollResult)
}

module.exports.rollHandler = rollHandler
