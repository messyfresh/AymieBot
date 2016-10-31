// Message Handler Helper functions
var debug = require('debug')('aymiebot:messageHandleHelpers')

// Split msg.contents into an array and store as a property of msg
function setMsgArray (msg) {
  // Split msg into array
  try {
    msg.msgArray = msg.content.split(' ')
    return msg
  } catch (err) {
    debug(err)
  }
}

module.exports.setMsgArray = setMsgArray
