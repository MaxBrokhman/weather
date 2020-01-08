const path = require('path')
const express = require('express')
const hbs = require('hbs')
const get = require('lodash/get')

const config = require('./config')
const getGeocode = require('./getGeocode')
const getForecast = require('./getForecast')
const getRenderPage = require('./utils/getRenderPage')
const onError = require('./utils/onError')

const {
  emptyAddressErrorText,
  forecastErrorText,
  geocodeErrorText,
  name,
} = config

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', getRenderPage('index', { title: 'Weather', name }))

app.get('/about', getRenderPage('about', { title: 'About Me', name }))

app.get('/help', getRenderPage('help', {
  helpText: 'This is some helpful text.',
  title: 'Help',
  name,
}))

app.get('/weather', async (req, res) => {
  const address = get(req, ['query', 'address'])

  if (!address) return onError(res, emptyAddressErrorText)()
  
  try {
    const geocode = await getGeocode(address, onError(res, geocodeErrorText))
    if(geocode.latitude && geocode.longtitude) {
      const { latitude, longtitude, location } = geocode
      try {
        const forecast = await getForecast(
          latitude, 
          longtitude, 
          onError(res, forecastErrorText),
        )
        res.send({
          forecast,
          location,
          address,
        })
      } catch {
        return res.send({ error })
      }
    }
  } catch(error) {
    return res.send({ error })
  }
})

app.get('/help/*', getRenderPage('404', {
  title: '404',
  name,
  errorMessage: 'Help article not found.',
}))

app.get('*', getRenderPage('404', {
  title: '404',
  name,
  errorMessage: 'Page not found.',
}))

app.listen(port)
