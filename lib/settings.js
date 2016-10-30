var fs = require('fs')
var settings = './settings.json'
var debug = require('debug')('aymiebot:settings')

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
  return settings
}

module.exports.saveSettings = saveSettings
