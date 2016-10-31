// Primary message handler file, links to all other command handlers from here

// var debug = require('debug')('aymiebot:commandHandler')
var settings = require('../settings.json')
var helpers = require('./messageHandlerHelpers')
var setHandler = require('./commandHandlers/setHandler')
var factHandler = require('./commandHandlers/factHandler')
var rollHandler = require('./commandHandlers/rollHandler')
var insultHandler = require('./commandHandlers/insultHandler')
var helpHandler = require('./commandHandlers/helpHandler')
var voiceHandler = require('./commandHandlers/voiceHandler')
var autoInsultHandler = require('./commandHandlers/autoInsultHandler')

// Primary Message Handler
function handleMessage (msg) {
  // Check message to see if user needs to be insulted
  autoInsultHandler.autoInsultHandler(msg)

  // Stop if prefix isn't there
  if (!msg.content.startsWith(settings.msgPrefix)) return

  // Add array to msg object
  helpers.setMsgArray(msg)

  switch (msg.msgArray[1]) {
    case 'set':
      setHandler.setHandler(msg)
      break
    case 'say':
      voiceHandler.voiceHandler(msg)
      break
    case 'insult':
      insultHandler.insultHandler(msg)
      break
    case 'fact':
      factHandler.factHandler(msg)
      break
    case 'roll':
      rollHandler.rollHandler(msg)
      break
    case 'help':
      helpHandler.helpHandler(msg)
      break
  }
}

module.exports.handleMessage = handleMessage
