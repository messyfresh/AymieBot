// Non command specific helper functions
const debug = require('debug')()

// Generate a random integer between 2 numbers
function randomInt (low, high, callback) {
  callback(Math.floor(Math.random() * (high - low) + low))
}

// Generate a random 5 digit number
function randomFiveDigit () {
  return Math.floor(Math.random() * 90000) + 10000
}

// Gets first mention from a message and return it
function getFirstMention (msg) {
  let mention = msg.mentions.users.array()
  return mention[0]
}

// Get all mentions from a message and return them
function genMentions (msg) {
  return msg.mentions.users.array().join(' ')
}

module.exports.randomInt = randomInt
module.exports.randomFiveDigit = randomFiveDigit
module.exports.getFirstMention = getFirstMention
module.exports.genMentions = genMentions
