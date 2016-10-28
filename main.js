var Discord = require('discord.js')
var client = new Discord.Client()
var conf = require('./conf/conf.json')
var debug = require('debug')('aymiebot:bot')
var insults = require('./lib/insults')
var util = require('./lib/util')
var voice = require('./lib/voice')
var fact = require('./lib/fact')

client.on('ready', () => {
  // Test stuff here
  debug('Connected to ' + client.guilds.array())
})

client.on('message', msg => {
  var channel = msg.member.voiceChannel

  // Insult Ebisu if he says something into text chat
  if (msg.author.username === 'Ebisu') {
    util.randomInt(0, insults.ebi.length, function (result) {
      msg.reply(insults.ebi[result])
    })
  }

  // Stop if prefix isn't there
  if (!msg.content.startsWith(conf.settings.msgPrefix)) return

  // Split msg into array
  try {
    var msgArray = msg.content.split(' ')
  } catch (err) {
    debug(err)
  }

  // Set different options in conf
  if (msgArray[1] === 'set') {
  }

  // Insult someone (using a mention)
  if (msgArray[1] === 'insult') {
    // Get Mention
    var msgMentions = util.getFirstMention(msg)
    // Generate number between 0 and length of insult array and send the message
    insults.genInsult(insults.generic, msgMentions, function (result) {
      msg.channel.sendMessage(result)
    })
  }

  // Generate a random fact and send it as a message
  if (msgArray[1] === 'fact') {
    // Generate a fact and send it to a channel

    if (msg.channel.name !== conf.settings.defaultChannel) {
      msg.delete()
    }

    fact.genFact(function (fact) {
      // TODO make this a function, move it out to utils file, and call when needed
      // client.channels.find('name', conf.settings.defaultChannel).sendMessage(fact)
      msg.channel.sendMessage(fact)
    })
  }

  // Roll a number between 1 and 100
  if (msgArray[1] === 'roll') {
    msg.channel.sendMessage(Math.round(Math.random() * 100))
  }

  if (msgArray[1] === 'say') {
    // TODO fix this so there isn't a 'pop' between the audio generated for TTS and the added silence to make the audio file over 1 sec
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
            voice.genVoice(textToConvertString, function (vStream, outputFile, sayFile) {
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
                voice.rmOutput(outputFile, sayFile)
              })
            })
          }
        }
      })
  }

  if (msgArray[1] === 'play') {
    // TODO play audio from youtube video
  }

  if (msgArray[1] === 'test') {
    // Test stuff here
  }

  if (msgArray[1] === 'help') {
    msg.reply('My commands are "insult [username]", "fact", "roll", "say"')
  }
})

client.login(conf.discord.bot.token)
