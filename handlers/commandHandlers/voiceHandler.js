// Voice handler
// Uses aws polly for voice

const debug = require('debug')('aymiebot:voiceHandler')
const voiceHandlerHelper = require('./voiceHandlerHelper')
const Polly = require('polly-tts')
const conf = require('../../conf/conf.json')
const fs = require('fs')
const stream = require('stream')

let polly = new Polly({
  accessKeyId: conf.aws.polly.accessKeyID,
  secretAccessKey: conf.aws.polly.secret
})

function voiceHandler (msg) {

  // Set Voice channel to the channel the user sent the command from
  const channel = msg.member.voiceChannel

  // Generate the voice
  voiceHandlerHelper.genTextString(msg.msgArray)
    .then((textString) => {
      voiceHandlerHelper.genVoiceStream(textString)
        .then((voiceObject) => {
          channel.join()
            .then((connection) => {
              let intent = connection.playFile('polly-tts.mp3')
              intent.on('end', () => {
                fs.unlink('polly-tts.mp3', (err) => {
                  if (err) debug(err)
                })
              })
            })
            .catch((err) => {
              if(err) debug(err)
            })
        })
        .catch((err) => {
          if(err) debug(err)
        })
    })
    .catch((err) => {
     if(err) debug(err)
    })
}


module.exports.voiceHandler = voiceHandler
