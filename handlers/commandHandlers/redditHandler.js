// Handler for anything reddit related
const conf = require('./../../conf/conf.json')
const Snoowrap = require('snoowrap')

// Reddit Authentication
const reddit = new Snoowrap({
  userAgent: conf.reddit.userAgent,
  clientId: conf.reddit.clientID,
  clientSecret: conf.reddit.clientSecret,
  refreshToken: conf.reddit.refreshToken
})

// Handle 'showerthoughts' command
function showerThoughtHandler (msg) {
  // Generate a random int between 0 and 24 since
  // the reddit api returns 24 results at a time
  let randomInt = Math.floor(Math.random() * 24)

  reddit.getSubreddit('ShowerThoughts').getHot().map(post => post.title).then(data => {
    msg.channel.sendMessage(data[randomInt])
  })
}

module.exports.showerThoughtHandler = showerThoughtHandler
