const weatherForm = document.querySelector('.search-form')
const searchInput = document.querySelector('.search-input')
const loadingParagraph = document.querySelector('.loading-paragraph')
const forecastParagraph = document.querySelector('.forecast-paragraph')

const getForecastText = (summary, temperature, chanceOfRain) => 
  `${summary} It is currently ${temperature} degress out. 
  There is a ${chanceOfRain * 100}% chance of rain.`

const errorMessage = 'Error occured, please try again later.'

weatherForm.addEventListener('submit', async (evt) => {
  evt.preventDefault()

  const searchedLocation = searchInput.value

  loadingParagraph.textContent = 'Loading...'
  forecastParagraph.textContent = ''

  try {
    const response = await fetch(`/weather?address=${searchedLocation}`)
    const { 
      forecast, 
      location, 
      error 
    } = await response.json()
    if (error) return loadingParagraph.textContent = error

    const {  
      summary,  
      temperature,
      chanceOfRain,
    } = forecast

    loadingParagraph.textContent = location
    forecastParagraph.textContent = getForecastText(summary, temperature, chanceOfRain)

  } catch {
    loadingParagraph.textContent = errorMessage
  }
})
