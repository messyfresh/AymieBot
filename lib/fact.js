// Functions for fact command

var request = require('request')

function genFact (callback) {
  request('http://mentalfloss.com/api/1.0/views/amazing_facts.json?limit=1&display_id=xhr&bypass=1', function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var data = JSON.parse(body)
      var cleanData = data[0].fact_body.replace(/<\/?[^>]+(>|$)/g, '')
      callback(cleanData)
    }
  })
}

module.exports.genFact = genFact
