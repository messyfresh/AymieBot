var Discord = require('discord.js')
var client = new Discord.Client()
var conf = require('./conf/conf.json')
var debug = require('debug')('aymiebot:bot')
var messageHandler = require('./handlers/messageHandler')

client.on('ready', () => {
  debug('Connected to ' + client.guilds.array())
})

client.on('message', msg => {
  // Pass message to handler... to be handled...
  messageHandler.handleMessage(msg)
})

client.login(conf.discord.bot.token)
