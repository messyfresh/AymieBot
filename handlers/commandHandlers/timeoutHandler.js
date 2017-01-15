// Timeout Handler
const debug = require('debug')('aymiebot:timeoutHandler')

function timeoutHandler (msg, client) {
  debug('timeout handler called')
  // TODO: Move user to timeout channel, mute then, tell them they are in timeout
}

module.exports.timeoutHandler = timeoutHandler
