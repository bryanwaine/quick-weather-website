const request = require('request')

// const forecast = (latitude, longitude, callback) => {
//     const url = 'http://api.weatherstack.com/current?access_key=aa144077a6f562aef73320b10b1e9a1c&query=' + latitude + ',' + longitude

//     request({ url: url, json: true}, (error, response) => {
//         if (error) {
//             callback('Unable to connect to the Weather Service', undefined)
//         } else if (response.body.error) {
//             callback('Unable to find location')
//         } else {
//             callback(undefined, response.body.current.weather_descriptions + '. It is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike + ' degrees out.')
//         }
//     })
// }

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=aa144077a6f562aef73320b10b1e9a1c&query=' + latitude + ',' + longitude

    request({ url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to the Weather Service', undefined)
        } else if (body.error) {
            callback('Unable to find location')
        } else {
            callback(undefined, body.current.weather_descriptions + '. It is currently ' + body.current.temperature + '℃ outside. It feels like ' + body.current.feelslike + '℃.')
        }
    })
}

module.exports = forecast