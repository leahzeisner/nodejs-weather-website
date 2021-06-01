const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { geocode, geocodeCurrentLocation } = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000


// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')


// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)


// Set up static directory to serve
app.use(express.static(publicDirPath))



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Leah Zeisner'
    })
})



app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Leah Zeisner'
    })
})



app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Help Message',
        name: 'Leah Zeisner'
    })
})



app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                location,
                forecast: forecastData.forecast,
                address: req.query.address
            })
        })
    })
})



app.get('/weatherFromCurrentLocation', (req, res) => {
    const latitude = req.query.latitude
    const longitude = req.query.longitude

    if (!latitude || !longitude) {
        return res.send({
            error: 'Error while fetching current location. Please try again.'
        })
    }

    geocodeCurrentLocation(latitude, longitude, (error, { location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                location,
                forecast: forecastData.forecast
            })
        })
    })
})



app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Leah Zeisner',
        errorMessage: 'Help article not found.'
    })
})



app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Leah Zeisner',
        errorMessage: 'Page not found.'
    })
})



app.listen(port, () => {
    console.log(`server is up on port ${port}`)
})