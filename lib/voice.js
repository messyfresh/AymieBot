// Functions for voice commands

var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1')
var fs = require('fs')
var spawn = require('child_process').spawn

var debug = require('debug')('aymiebot:voice')
var conf = require('../conf/conf.json')
var util = require('./util')

// Setup Text To Speech Engine
var tts = new TextToSpeechV1({
  username: conf.watson.username,
  password: conf.watson.password
})

function genVoice (textString, callback) {
  // Setup Hello Intro
  var params = {
    text: textString,
    voice: 'en-US_AllisonVoice',
    accept: 'audio/wav'
  }
  // Generate 5 digit ID for finished voice file
  var voiceStreamId = util.randomFiveDigit()

  var outputFile = 'output' + voiceStreamId + '.wav'

  // Stream response from Watson to a .wav file
  var voiceStream = tts.synthesize(params).pipe(fs.createWriteStream(outputFile))

  // Wait for voiceStream file to finish being written
  voiceStream.on('finish', function () {
    // Add 5 digit id to final .wav file
    var sayFile = 'out' + util.randomFiveDigit() + '.wav'
    debug('Adding a second of silence to the end of ', sayFile)

    // Add an extra second of silence to end of Text to Speech file due to bug in discord.js
    var concat = spawn('ffmpeg', ['-i', 'concat:' + outputFile + '|silence.wav', '-c', 'copy', sayFile])

    // Wait for concatenate operation to finish before playing file
    concat.on('exit', function (err) {
      if (err) debug('Concat Error: ', err)
      else {
        // Create ReadStream from finished file
        callback(fs.createReadStream(sayFile), outputFile, sayFile)
      }
    })
  })
}

// Delete generated wav files
function rmOutput (file1, file2) {
  fs.unlink(file1, function (err) {
    if (err) debug(err)
    debug('Deleting ' + file1)
  })
  fs.unlink(file2, function (err) {
    if (err) debug(err)
    debug('Deleting ' + file2)
  })
}

module.exports = {
  genVoice: genVoice,
  rmOutput: rmOutput
}
