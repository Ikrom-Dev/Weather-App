const container = renderElement(".container")
const search = renderElement(".search-box button")
const weatherBox = renderElement(".weather-box")
const weatherDetails = renderElement(".weather-details")
const error404 = renderElement(".not-found")


search.addEventListener("click" , () => {
    const APIKey = '57874bdcd8bf6968e65ec6a62473b9bc'
    const city = renderElement(".search-box input").value  

    if(city === '')
        return ;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {

        if( json.cod === '404'){
            container.style.height = "400px"
            weatherBox.style.display = "none"
            weatherDetails.style.display = "none"
            error404.style.display = "block"
            error404.classList.add('fadeIn')
            return;
        }

        error404.style.display = 'none'
        error404.classList.remove('fadeIn')

        const image = renderElement(".weather-box img")

        const temperature = renderElement('.weather-box .temperature')

        const description = renderElement('.weather-box .description')

        const humidity = renderElement('.weather-details .humidity span')
        const wind = renderElement(".weather-details .wind span")

        switch(json.weather[0].main){
            case 'Clear' : 
            image.src = 'images/clear.png'
            break;

            case 'Rain' : 
            image.src = 'images/rain.png'
            break;

            case 'Snow' : 
            image.src = 'images/snow.png'
            break;

            case 'Clouds' : 
            image.src = 'images/cloud.png'
            break;

            case 'Haze' : 
            image.src = 'images/haze.png'
            break;

            default :
                image.src = ''
        }
        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`
        description.innerHTML = `${json.weather[0].description}`
        humidity.innerHTML = `${json.main.humidity}%`
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`

        weatherBox.style.display = ''
        weatherDetails.style.display = ''
        weatherBox.classList.add('fadeIn')
        weatherDetails.classList.add('fadeIn')
        container.style.height = "590px"
    })


})
