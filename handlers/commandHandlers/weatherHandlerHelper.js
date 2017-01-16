// Weather handler helper class
const debug = require('debug')('aymiebot:weatherHandlerHelper')
const request = require('request')
const weatherConf = require('../../conf/conf.json').weather

function getForecast (zip) {
  return new Promise((resolve, reject) => {
    let weatherOptions = {
      uri: weatherConf.forecastUrl + zip + '.json',
      json: true
    }
    request(weatherOptions, (error, response, body) => {
      debug('Received getForecast data')
      if (error) debug(error)
      try {
        let weather = {
          day: body.forecast.txt_forecast.forecastday[0].title,
          forecast: body.forecast.txt_forecast.forecastday[0].fcttext,
          high: body.forecast.simpleforecast.forecastday[0].high.fahrenheit,
          low: body.forecast.simpleforecast.forecastday[0].low.fahrenheit
        }
        // console.log(body.forecast.simpleforecast.forecastday[0])
        resolve(weather)
      } catch (err) {
        if (err) reject(err)
      }
    })
  })
}

function getLocation (zip) {
  return new Promise((resolve, reject) => {
    let weatherOptions = {
      uri: weatherConf.geoUrl + zip + '.json',
      json: true
    }
    request(weatherOptions, (error, response, body) => {
      debug('Received getLocation data')
      if (error) reject(error)
      try {
        let location = (body.location.city + ', ' + body.location.state).toString()
        resolve(location)
      } catch (err) {
        if (err) reject(err)
      }
    })
  })
}

module.exports.getForecast = getForecast
module.exports.getLocation = getLocation
