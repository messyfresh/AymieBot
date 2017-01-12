// Auto insults
let commandHandlerHelpers = require('./commandHandlerHelpers')
let insultsList = require('../../constants/insultList')
let settings = require('../../settings.json')

function autoInsultHandler (msg) {
  // Insult Ebisu if he says something into text chat
  if (msg.author.username === 'Ebisu' && settings.autoInsultEnable === 'on') {
    commandHandlerHelpers.randomInt(0, insultsList.ebi.length, result => {
      msg.reply(insultsList.ebi[result])
    })
  }
}

module.exports.autoInsultHandler = autoInsultHandler
