const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const cors = require('cors')


const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(cors())

// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDirPath))

// Set up routes

app.get('', (req, res) => {
    res.render('index', {
        title: 'Quick Weather',
        name: 'Bryan Waine'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Bryan Waine'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Bryan Waine',
        helpText:'These are some helpful tips while using this site:'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'You must provide an address'
        })
    } else {
        geocode(address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res
                .status(400)
                .send({ error })
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res
                    .status(400)
                    .send({ error })
                }
                res
                .status(200)
                .send({
                    address: req.query.address,
                    location: location,
                    forecast: forecastData
                })
            })
        })
    }
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorText: 'Help article not found.',
        name: 'Bryan Waine'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorText: 'Page not found.',
        name: 'Bryan Waine'
    })
})

app.listen(port, () => {
    console.log('Server is running on port ' + port)
})