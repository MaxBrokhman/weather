const get = require('lodash/get')

const makeRequest = require('./utils/makeRequest')
const { getForecastUrl } = require('./utils/urlUtils')

const getForecast = async (lat, long, onError) => {
  const url = getForecastUrl(lat, long)
  try {
    const response = await makeRequest(url, onError)
    if(!response) return onError()
    const summary = get(response, ['daily', 'data', 0, 'summary'])
    const temperature = get(response, ['currently', 'temperature'])
    const chanceOfRain = get(response, ['currently', 'precipProbability'])
    return {
      summary,
      temperature,
      chanceOfRain,
    }
  } catch {
    onError()
  }
}

module.exports = getForecast
