const forecastBaseUrl = 'https://api.darksky.net/forecast/f95189cf083fdaa110647255402f36c3/'
const mapBoxBaseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
const forecastUnits = '?units=si'
const mapBoxAccessToken = '.json?access_token=pk.eyJ1IjoiY3Jvc3Nyb2FkMCIsImEiOiJjazUxMmxpZmYwcWN5M21zYWVjeGp3Y2R2In0.uGWsjkGK8NBw8tuADuqAgA'
const name = 'Max Brokhman'

const forecastErrorText = 'Unable to connect to weather service! Please try again later'
const geocodeErrorText = 'You must provide a valid location!'
const emptyAddressErrorText = 'You must provide an address!'

module.exports = {
  emptyAddressErrorText,
  forecastBaseUrl,
  forecastErrorText,
  forecastUnits,
  geocodeErrorText,
  mapBoxBaseUrl,
  mapBoxAccessToken,
  name,
}
