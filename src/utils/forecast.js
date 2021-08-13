const request = require('request')
const dotenv = require('dotenv').config()

// Set up weather api service
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.weatherapi.com/v1/current.json?key=' + process.env.API_KEY + '&q=' + latitude + ',' + longitude

    request({ url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to the Weather Service', undefined)
        } else if (body.error) {
            callback('Unable to find location')
        } else {
            callback(undefined, body.current.condition.text + '. It is currently ' + body.current.temp_c + '℃ outside. There is a ' + body.current.humidity + '% chance of rain today.')
        }
    })
}

module.exports = forecast