// A playground to test stuff
const debug = require('debug')('aymiebot:test')

function testHandler (msg) {
  debug('testHandler called')
}

module.exports.testHandler = testHandler
