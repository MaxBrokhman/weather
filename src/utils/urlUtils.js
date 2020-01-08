const config = require('../config')

const { 
  forecastBaseUrl,
  forecastUnits,
  mapBoxBaseUrl, 
  mapBoxAccessToken,
} = config

const getMapBoxUrl = (address) => `${mapBoxBaseUrl}${address}${mapBoxAccessToken}` 

const getForecastUrl = (lat, long) => `${forecastBaseUrl}${lat},${long}${forecastUnits}`

module.exports = {
  getMapBoxUrl,
  getForecastUrl
}
