var Discord = require('discord.js')
var client = new Discord.Client()
var conf = require('./conf/conf.json')
var debug = require('debug')('aymiebot:bot')
var con = require('./lib/constants')
var util = require('./lib/util')
var voice = require('./lib/voice')
var fact = require('./lib/fact')

client.on('ready', () => {
})

client.on('message', msg => {
  var channel = msg.member.voiceChannel

  if (msg.author.username === 'Ebisu') {
    util.randomInt(0, con.ebiInsults.length, function (result) {
      msg.reply(con.ebiInsults[result])
    })
  }

  // Set the prefix
  var prefix = '!ab'

  // Stop if prefix isn't there
  if (!msg.content.startsWith(prefix)) return

  // Split msg into array
  try {
    var msgArray = msg.content.split(' ')
  } catch (err) {
    debug(err)
  }

  // Generate a random fact and send it as a message
  if (msgArray[1] === 'fact') {
    // Generate a fact and send it to a channel
    fact.genFact(function (fact) {
      msg.channel.sendMessage(fact)
    })
  }

  // Roll a number between 1 and 100
  if (msgArray[1] === 'roll') {
    msg.channel.sendMessage(Math.round(Math.random() * 100))
  }

  if (msgArray[1] === 'say') {
    // Join Voice Channel
    channel.join()
      .then(function (connection) {
        // Initialize empty array to store voice string
        var textToConvert = []

        // Iterate thru msgArray and push what needs to be said to the textToConvert Array
        for (var i = 0; i < msgArray.length; i++) {
          if (i > 1) {
            textToConvert.push(msgArray[i])
          }

          // Check if its the end of the msgArray and convert the array to a string
          if (i === msgArray.length - 1) {
            // Converts to string, replacing commands with spaces
            var textToConvertString = textToConvert.join(' ')
            debug(textToConvertString)

            // Generate Voice and Play it
            voice.genVoice(textToConvertString, function (vStream) {
              // Start playing returned voice stream
              var intent = connection.playStream(vStream, {volume: 0.5})

              // Debug to print when voice file is playing
              intent.on('start', function () {
                debug('Playing Voice File')
              })

              // TODO delete generated .wav files
              intent.on('end', function () {
                debug('Finished Playing Voice File')
              })
            })
          }
        }
      })
  }

  if (msgArray[1] === 'summon') {
    channel.join()
      .then(connection => {
        // I'm  not sure if i will be keeping this command
      })
  }

  if (msgArray[1] === 'play') {
    // TODO play audio from youtube video
  }

  if (msgArray[1] === 'test') {
    // TODO does not work, fix it
    // var connection = client.connection
    // debug('Connected to ' + connection.channel)
  }
})

client.login(conf.discord.bot.token)
