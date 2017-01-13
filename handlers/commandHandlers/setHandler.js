// This file is called by commandHandler to change settings
const debug = require('debug')('aymiebot:set')
const fs = require('fs')
let settings = require('../../settings.json')

function setHandler (msg) {
// Check what the command after 'set' is
  switch (msg.msgArray[2].toLowerCase()) {
    // Auto Insult
    case 'autoinsult':
      switch (msg.msgArray[3]) {
        case 'off':
          if (settings.autoInsultEnable === 'off') {
            msg.channel.sendMessage('AutoInsult is ALREADY disabled, those were valuable CPU cycles I will NEVER get back.')
          } else {
            settings.autoInsultEnable = 'off'
            saveSettings(settings)
            msg.channel.sendMessage('AutoInsult is now turned off. I guess someone is feeling nice today.')
          }
          break
        case 'on':
          if (settings.autoInsultEnable === 'on') {
            msg.channel.sendMessage('AutoInsult is ALREADY enabled, those were valuable CPU cycles I will NEVER get back.')
          } else {
            settings.autoInsultEnable = 'on'
            saveSettings(settings)
            msg.channel.sendMessage('AutoInsult is now turned on. May god have mercy on their soul.')
          }
          break
      }
    // TODO insert more settings (defaultChannel, etc)
  }
}

function saveSettings (update) {
  // Try catch to update settings
  try {
    fs.writeFile(settings, JSON.stringify(update, null, 2), err => {
      if (err) debug('Error ', err)
      debug('Write Success!')
    })
    debug(update)
  } catch (err) {
    debug('Save Settings Error ', err)
  }
}

module.exports.setHandler = setHandler
