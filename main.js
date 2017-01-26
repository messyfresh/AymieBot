// PMX
require('pmx').init({
  http: true
})

const Discord = require('discord.js')
const client = new Discord.Client()
const conf = require('./conf/conf.json')
const debug = require('debug')('aymiebot:bot')
const messageHandler = require('./handlers/messageHandler').handleMessage
const guildHandler = require('./handlers/guildHandler').guildHandler

require('events').EventEmitter.prototype._maxListeners = 100

client.on('ready', () => {
  debug('Connected to ' + client.guilds.array())
  guildHandler(client)
})

client.on('message', msg => {
  // Pass message to handler... to be handled...
  messageHandler(msg)
})

client.on('disconnect', () => {
  client.login(conf.discord.bot.token)
})

client.login(conf.discord.bot.token)
