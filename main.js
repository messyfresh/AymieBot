var Discord = require('discord.js')
var client = new Discord.Client()
var conf = require('../conf/conf.json')
var debug = require('debug')('defusebot:bot')
// var youtubeStream = require('youtube-audio-stream')
var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1')
var fs = require('fs')
var spawn = require('child_process').spawn

var tts = new TextToSpeechV1({
  username: conf.watson.username,
  password: conf.watson.password
})

var ebiInsults = [
  'Have you fallen off a mountain today?',
  'Did you get gold dps yet?',
  'Have you missed an LB today?',
  'Don\'t forget to change your batteries!',
  'WORDS WORDS WORDS!',
  'Is that like a trebushet?  Because you know, it\'s trebuchet.',
  'Wow, at least you\'re saying more than just "Look!"',
  'Do they have that at Chili\'s?',
  'Let me guess, you\'re really AFK...'
]

function randomInt (low, high) {
  Math.floor(Math.random() * (high - low) + low)
}

client.on('ready', () => {
})

client.on('message', msg => {
  var channel = msg.member.voiceChannel

  if (msg.author.username === 'Ebisu') {
    var insultNum = randomInt(0, ebiInsults.length)
    msg.reply(ebiInsults[insultNum])
  }

  // Set the prefix
  var prefix = '!ab'

  // Stop if prefix isn't there
  if (!msg.content.startsWith(prefix)) return

  // Split msg into array
  try {
    var msgArray = msg.content.split(' ')
    // debug(msgArray)
  } catch (err) {
    debug(err)
  }

  if (msgArray[1] === 'messy') {
    msg.channel.sendMessage('is slow!')
    msg.channel.sendMessage(':stuck_out_tongue:')
  }

  if (msgArray[1] === 'rem') {
    msg.channel.sendMessage('is in charge!')
  }

  if (msgArray[1] === 'capt') {
    msg.channel.sendMessage('is delusional!')
  }

  if (msgArray[1] === 'ping') {
    msg.channel.sendMessage('wong!')
  }

  if (msgArray[1] === 'dragon') {
    msg.channel.sendMessage('SHHH, It\'s sleeping over there')
  }

  if (msgArray[1] === 'say') {
    var textToConvert = []

    for (var i = 0; i < msgArray.length; i++) {
      if (i > 1) {
        textToConvert.push(msgArray[i])
      }
      if (i === msgArray.length - 1) {
        var textToConvertString = textToConvert.join(' ')
        console.log(textToConvertString)
      }
    }
  }

  if (msgArray[1] === 'summon') {
    channel.join()
      .then(connection => {
        // Watson Test
        var params = {
          text: 'Hello everyone, I\'m Aymie, Spelled A. Y. M. I. E. Do you feel like you need a nap now?',
          voice: 'en-US_AllisonVoice',
          accept: 'audio/wav'
        }

        var voiceStream = tts.synthesize(params).pipe(fs.createWriteStream('output.wav'))
        voiceStream.on('finish', function () {
          var concat = spawn('ffmpeg', ['-i', 'concat:output.wav|silence.wav', '-c', 'copy', 'out.wav'])

          concat.on('exit', function (err) {
            console.log('finished concating files')
            if (err) console.log(err)
            else {
              var vStream = fs.createReadStream('out.wav')
              var intent = connection.playStream(vStream, {volume: 0.5})
              intent.on('start', function () {
                console.log('playing file')
              })
              intent.on('end', function () {
                console.log('finished playing file, deleting now')
                fs.unlink('out.wav')
              })
            }
          })
          // connection.playStream(youtubeStream('https://www.youtube.com/watch?v=sS76eS34Y0c', {filter: 'audioonly', volume: '0.1'}));
        })

        return connection
      })
  }

  if (msgArray[1] === 'play') {
    // Debug Voice Channel ID tied to message
    // debug(msg.author.username + "\'s voice channel id is " + msg.member.voiceChannelID);
    // TODO check to see if bot is already in channel

  }

  if (msgArray[1] === 'test') {
    var connection = client.connection
    var params = {
      text: 'Hello Everyone, I\'m Defuse-Bot',
      voice: 'en-US_AllisonVoice',
      accept: 'audio/wav'
    }
    var voiceStream = tts.synthesize(params)
    connection.playStream(voiceStream)
  }
})

client.login(conf.discord.bot.token)

// Play youtube stream on channel
// connection.playStream(youtubeStream('https://www.youtube.com/watch?v=' + msgArray[2]), {filter: 'audioonly', volume: '0.1'});
