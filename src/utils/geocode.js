const request = require('request')
const dotenv = require('dotenv').config()

// Set up geocoding service
const geocode = (address, callback) => {
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + process.env.ACCESS_TOKEN + '&limit=1'

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to Geocoding Service.', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try again with a different search term.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode