// Primary message handler file, links to all other command handlers from here

// var debug = require('debug')('aymiebot:commandHandler')
let settings = require('../settings.json')
let helpers = require('./messageHandlerHelpers')
let setHandler = require('./commandHandlers/setHandler')
let factHandler = require('./commandHandlers/factHandler')
let rollHandler = require('./commandHandlers/rollHandler')
let insultHandler = require('./commandHandlers/insultHandler')
let helpHandler = require('./commandHandlers/helpHandler')
let voiceHandler = require('./commandHandlers/voiceHandler')
let autoInsultHandler = require('./commandHandlers/autoInsultHandler')
let redditHandler = require('./commandHandlers/redditHandler')

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
    case 'showerthought':
      redditHandler.showerThoughtHandler(msg)
      break
    case 'help':
      helpHandler.helpHandler(msg)
      break
  }
}

module.exports.handleMessage = handleMessage
