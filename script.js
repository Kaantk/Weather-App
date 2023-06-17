const APIKey = '71006bab4fe57864ccebf1679aafb1fa'
const city = document.querySelector('#search-input')
const search = document.querySelector('#search-btn')
const notFound = document.querySelector('.not-found')
const weatherBox = document.querySelector('.weather-box')
const weatherDetails = document.querySelector('.weather-details')

weatherBox.style.display = 'none'
weatherDetails.style.display = 'none'
notFound.style.display = 'none'

search.addEventListener('click', () => {
  if (city.value === '') {
    notFound.style.display = 'block'
    weatherBox.style.display = 'none'
    weatherDetails.style.display = 'none'
  } else {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=${APIKey}`
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.cod === '404') {
          weatherBox.style.display = 'none'
          weatherDetails.style.display = 'none'
          notFound.style.display = 'block'
        } else {
          notFound.style.display = 'none'

          const image = document.querySelector('#weather-img')
          const description = document.querySelector('.description')
          const temperature = document.querySelector('.temperature')
          const humidity = document.querySelector('.humidity span')
          const wind = document.querySelector('.wind span')

          switch (json.weather[0].main) {
            case 'Clear':
              image.src = './images/clear.png'
              description.innerHTML = 'Güneşli'
              break

            case 'Rain':
              image.src = './images/rain.png'
              description.innerHTML = 'Yağmurlu'
              break

            case 'Snow':
              image.src = './images/snow.png'
              description.innerHTML = 'Karlı'
              break

            case 'Clouds':
              image.src = './images/cloud.png'
              description.innerHTML = 'Bulutlu'
              break

            case 'Haze':
              image.src = './images/mist.png'
              description.innerHTML = 'Rüzgarlı'
              break

            default:
              image.src = ''
          }

          temperature.innerHTML = `${parseInt(json.main.temp)}°`
          humidity.innerHTML = `${json.main.humidity}`
          wind.innerHTML = `${json.wind.speed}`

          weatherBox.style.display = 'flex'
          weatherDetails.style.display = 'flex'
        }
      })
  }
})
