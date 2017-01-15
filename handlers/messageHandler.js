// Primary message handler file, links to all other command handlers from here

const debug = require('debug')('aymiebot:messageHandler')
const settings = require('../settings.json')
const helpers = require('./messageHandlerHelpers')
const setHandler = require('./commandHandlers/setHandler')
const factHandler = require('./commandHandlers/factHandler')
const rollHandler = require('./commandHandlers/rollHandler')
const insultHandler = require('./commandHandlers/insultHandler')
const helpHandler = require('./commandHandlers/helpHandler')
const voiceHandler = require('./commandHandlers/voiceHandler')
const playHandler = require('./commandHandlers/playHandler')
const autoInsultHandler = require('./commandHandlers/autoInsultHandler')
const redditHandler = require('./commandHandlers/redditHandler')
const smiteHandler = require('./commandHandlers/smiteHandler')
const testHandler = require('./commandHandlers/testHandler')
const timeoutHandler = require('./commandHandlers/timeoutHandler')
const commandHandlerHelper = require('./commandHandlers/commandHandlerHelpers')

// Primary Message Handler
function handleMessage (msg, client) {
  // Check message to see if user needs to be insulted
  autoInsultHandler.autoInsultHandler(msg)

  // Stop if prefix isn't there or bot isn't mentioned first
  try {
    let firstMention = commandHandlerHelper.getFirstMention(msg)
    let msgPrefix = msg.content.startsWith(settings.msgPrefix)
    if (firstMention) {
      debug('mention found, continuing')
    } else if (!firstMention && msgPrefix) {
      debug('"!ab" prefix found, continuing')
    } else if (!firstMention && !msgPrefix) {
      debug('not my command...  ignoring...')
      return
    }
  } catch (err) {
    debug(err)
  }

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
    case 'play':
      playHandler.playHandler(msg)
      break
    case 'build':
    case 'smite':
      smiteHandler.smiteHandler(msg)
      break
    case 'test':
      testHandler.testHandler(msg)
      break
    case 'timeout':
      timeoutHandler.timeoutHandler(msg, client)
      break
    default:
      helpHandler.helpHandler(msg)
      break
  }
}

module.exports.handleMessage = handleMessage
