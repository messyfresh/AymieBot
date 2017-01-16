// Handler for weather requests
// const debug = require('debug')('aymiebot:weatherHandler')
const weatherHelper = require('./weatherHandlerHelper')

function weatherHandler (msg) {
  let zip = msg.msgArray[2]
  Promise.all([weatherHelper.getForecast(zip), weatherHelper.getLocation(zip)])
    .then((weather) => {
      sendWeather(msg, weather)
    })
}

function sendWeather (msg, weather) {
  let message = '```Markdown\n' +
  `Weather Forecast - ${weather[0].day} - ${weather[1]}\n` +
  `Temperature - High of ${weather[0].high}°F and Low of ${weather[0].low}°F\n` +
  `${weather[0].forecast}\n` +
  '```'
  // console.log(message)
  msg.channel.sendMessage(message)
}

module.exports.weatherHandler = weatherHandler
