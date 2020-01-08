const rp = require('request-promise-native')

const makeRequest = (url, onError) => {
  return new Promise((resolve, reject) => {
    rp({ url, json: true })
      .then((body) => {
        body.error 
          ? reject(body.error) 
          : resolve(body)
      })
      .catch(() => {
        onError()
      })
  })
}

module.exports = makeRequest
