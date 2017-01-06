const Discord = require('discord.js')
const client = new Discord.Client()
const conf = require('./conf/conf.json')
const debug = require('debug')('aymiebot:bot')
const messageHandler = require('./handlers/messageHandler')

client.on('ready', () => {
  debug('Connected to ' + client.guilds.array())
})

client.on('message', msg => {
  // Pass message to handler... to be handled...
  messageHandler.handleMessage(msg)
})

client.on('disconnect', () => {
  client.login(conf.discord.bot.token)
})

client.login(conf.discord.bot.token)
