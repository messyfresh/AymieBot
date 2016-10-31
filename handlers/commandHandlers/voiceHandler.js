// Voice handler
var debug = require('debug')('aymiebot:voiceHandler')
var voiceHandlerHelper = require('./voiceHandlerHelper')

function voiceHandler (msg) {
// TODO fix this so there isn't a 'pop' between the audio generated for TTS and the added silence to make the audio file over 1 sec
// Join Voice Channel
  var channel = msg.member.voiceChannel
  channel.join()
    .then(function (connection) {
      // Initialize empty array to store voice string
      var textToConvert = []
      // Iterate thru msg.msgArray and push what needs to be said to the textToConvert Array
      for (var i = 0; i < msg.msgArray.length; i++) {
        if (i > 1) {
          textToConvert.push(msg.msgArray[i])
        }

        // Check if its the end of the msg.msgArray and convert the array to a string
        if (i === msg.msgArray.length - 1) {
          // Converts to string, replacing commands with spaces
          var textToConvertString = textToConvert.join(' ')
          debug(textToConvertString)

          // Generate Voice and Play it
          voiceHandlerHelper.genVoice(textToConvertString, function (vStream, outputFile, sayFile) {
            // Start playing returned voice stream
            var intent = connection.playStream(vStream, {volume: 0.5})

            // Debug to print when voice file is playing
            intent.on('start', function () {
              debug('Playing Voice File')
            })

            // Deleted generated wav files when they are done playing
            intent.on('end', function () {
              debug('Finished Playing Voice File')

              // Delete generated wav files
              voiceHandlerHelper.rmOutput(outputFile, sayFile)
            })
          })
        }
      }
    })
}

module.exports.voiceHandler = voiceHandler
