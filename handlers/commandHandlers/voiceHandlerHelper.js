// Helper functions for voice commands
const debug = require('debug')('aymiebot:voiceHandlerHelper')
const Polly = require('polly-tts')
const conf = require('../../conf/conf.json')
const fs = require('fs')
const stream = require('stream')

let polly = new Polly({
  accessKeyId: conf.aws.polly.accessKeyID,
  secretAccessKey: conf.aws.polly.secret
})

function genVoiceStream (textString) {

  return new Promise((resolve, reject) => {

    const params = {
      text: textString,
      voiceId: 'Joanna'
    }

    let voiceFile = fs.createWriteStream('polly-tts.mp3')
    polly.textToSpeech( params, (err, audioStream) => {
      if (err) reject(err)
      audioStream.pipe(voiceFile)
      resolve(voiceFile)
    })


  })
}

function genTextString (msgArray) {
  return new Promise ((resolve, reject) => {
    // Init empty array
    let textToConvert = []
    // Iterate through msgArray and push what needs to be said to the textToConvert Array
    for (let i = 0; i < msgArray.length; i++) {
      if (i > 1) {
        textToConvert.push(msgArray[i])
      }

      // Check if its the end of the msgArray and convert to string
      if (i === msgArray.length - 1) {
        // Resolve the promise with the text string
        resolve(textToConvert.join(' '))
      }

    }
  })
}

module.exports.genVoiceStream = genVoiceStream
module.exports.genTextString = genTextString
