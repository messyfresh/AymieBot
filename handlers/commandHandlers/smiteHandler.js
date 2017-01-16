// Custom feature for Captawesom3
// Fetch a google sheet and parse it to list out smite builds

const conf = require('../../conf/conf.json')
const debug = require('debug')('aymiebot:smiteHandler')
const GoogleSpreadsheet = require('google-spreadsheet')

function smiteHandler (msg) {
  // Open sheet and assign its object
  let doc = new GoogleSpreadsheet(conf.smite.buildSheetID)
  // Get the God name from the msgArray
  let godName = msg.msgArray.slice(2, 5).toString().replace(/,/g, ' ')
  debug(godName)
  // let godName = msg.msgArray[3]
  doc.getRows(1, (err, rowData) => {
    if (err) debug(err)
    for (let x = 0; x < rowData.length; x++) {
      if (godName.toLowerCase() === rowData[x].gods.toLowerCase()) {
        sendSmiteInfo(msg, rowData[x])
      }
    }
  })
}

function sendSmiteInfo (msg, info) {
  let message = '```Markdown\n' +
  `${info.gods} - ${info.class} 
  Items: ${info.item1}, ${info.item2}, ${info.item3}, ${info.item4}, ${info.item5}, ${info.item6}
  Sell Item 1 For This: ${info.sellitem1forthis}\n` +
      '```'

  msg.channel.sendMessage(message)
}

module.exports.smiteHandler = smiteHandler
