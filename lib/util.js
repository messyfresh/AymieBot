// Helper functions

// Generate a random integer between 2 numbers
function randomInt (low, high, callback) {
  callback(Math.floor(Math.random() * (high - low) + low))
}

// Generate a random 5 digit number
function randomFiveDigit () {
  return Math.floor(Math.random() * 90000) + 10000
}

module.exports.randomInt = randomInt
module.exports.randomFiveDigit = randomFiveDigit

// Example to play youtube audio
// youtubeStream('https://www.youtube.com/watch?v=sS76eS34Y0c', {filter: 'audioonly', volume: '0.1'});
