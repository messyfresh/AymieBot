const debug = require('debug')('aymiebot:playHandler')
const youtubeStream = require('youtube-audio-stream')
const youtubeUrl = 'https://www.youtube.com/watch?v='
const nyanCode = 'QH2-TGUlwu4'

function playHandler (msg) {
  // Check if user is in a voice channel
  if (getVoiceChannel(msg) === true) {
    let channel = msg.member.voiceChannel
    channel.join().then((connection) => {
      switch (msg.msgArray[2]) {
        case 'nyan':
          let nyanStream = youtubeStream(youtubeUrl + nyanCode)
          let intent = connection.playStream(nyanStream, {volume: 0.5})
          intent.on('start', () => {
            debug('Playing Youtube audio')
          })
          intent.on('end', () => {
            debug('Finished playing Youtube audio')
          })
          break
        case 'stop':
          connection.disconnect()
          break
      }
    })
  } else {
    debug('no voice channel')
  }
}

function getVoiceChannel (msg) {
  return !!msg.member.voiceChannel
}

module.exports.playHandler = playHandler
