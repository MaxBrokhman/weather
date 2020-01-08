const get = require('lodash/get')

const { getMapBoxUrl } = require('./utils/urlUtils')
const makeRequest = require('./utils/makeRequest')

const getGeocode = async (address, onError) => {
  const url = getMapBoxUrl(address)
  try {
    const { features } = await makeRequest(url, onError)
    if(!features.length) return onError()

    const latitude = get(features, [0, 'center', 1])
    const longtitude = get(features, [0, 'center', 0])
    const location = get(features, [0, 'place_name'])

    return {
      latitude,
      longtitude,
      location,
    }
  } catch {
    onError()
  }
}

module.exports = getGeocode
