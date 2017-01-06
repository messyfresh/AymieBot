// Generates an insult
// let debug = require('debug')('aymiebot:insult')
let commandHandlerHelper = require('./commandHandlerHelpers')
let insults = require('../../constants/insultList')

// Insult someone (using a mention)
function insultHandler (msg) {
  // Get Mention
  let msgMentions = commandHandlerHelper.getFirstMention(msg)
  // Generate number between 0 and length of insult array and send the message
  genInsult(insults.generic, msgMentions, result => {
    msg.channel.sendMessage(result)
  })
}

// Generate an insult
// TODO change function arguments into a context so not all arguments are required to be passed
function genInsult (insultList, mentions, callback) {
  commandHandlerHelper.randomInt(0, insultList.length, result => {
    let mentionedInsult = insultList[result].replace('$mention', mentions)
    callback(mentionedInsult)
  })
}

module.exports.insultHandler = insultHandler
