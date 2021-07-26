const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const cors = require('cors')


// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))


const app = express()

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


// <------Old routes; for reference purposes------>
// app.get('', (req, res) => {
//     res.send('<h1>Hello Express!</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send('<h1>Help Page</h1>')
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About Us</h1>')
// })
// <------Old routes for reference purposes------>

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

// res.send({
//     address: req.query.address,
//     location: 'Abuja',
//     forecast: 'It is 24 degrees out. It feels like 28 degrees out'
//})


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

app.listen(3000, () => {
    console.log('Server is running on port 3000.')
})