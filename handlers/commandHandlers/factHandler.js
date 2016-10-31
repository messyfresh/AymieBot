// Generate a random fact and send it as a message

var debug = require('debug')('aymiebot:factHandler')
var request = require('request')

function factHandler (msg) {
  request('http://mentalfloss.com/api/1.0/views/amazing_facts.json?limit=1&display_id=xhr&bypass=1', function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var fact = JSON.parse(body)
      fact = fact[0].fact_body.replace(/<\/?[^>]+(>|$)/g, '')
      sendFact(msg, fact)
    } else {
      debug(error)
    }
  })
}

function sendFact (msg, fact) {
  msg.channel.sendMessage(fact)
}

module.exports.factHandler = factHandler
