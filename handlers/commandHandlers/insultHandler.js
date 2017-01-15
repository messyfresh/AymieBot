// Generates an insult
const debug = require('debug')('aymiebot:insult')
const commandHandlerHelper = require('./commandHandlerHelpers')
const insults = require('../../constants/insultList')

// Insult someone (using a mention)
function insultHandler (msg) {
  // Get Mention(s)
  let msgMentions = commandHandlerHelper.getMentions(msg)
  // Separate insult for each mention
  for (let i = 0; i < msgMentions.length; i++) {
    if (msgMentions[i].bot === false) {
      // Generate number between 0 and length of insult array and send the message
      genInsult(insults.generic, msgMentions[i], result => {
        msg.channel.sendMessage(result)
      })
    }
  }
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
