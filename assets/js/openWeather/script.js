// Variáveis e seleção de elementos

const openWeatherApiKey = '143b534771ccb16cbf2fbdaab38a547b';

const form = document.querySelector('.open-weather-area .form form');
const cityInput = document.querySelector('.open-weather-area .form #city-input');

const cityElement = document.querySelector('.open-weather-area #weather-data #city');
const countryFlagElement = document.querySelector('.open-weather-area #weather-data #country-flag');
const temperatureElement = document.querySelector('.open-weather-area #weather-data #temperature span');
const weatherIconElement = document.querySelector('.open-weather-area #weather-data #wheather-icon');
const weatherConditionElement = document.querySelector('.open-weather-area #weather-data #wheater-condition');
const windElement = document.querySelector('.open-weather-area #weather-data #wind abbr');
const umidityElement = document.querySelector('.open-weather-area #weather-data #humidity abbr');

// Funções

async function getWeatherData(city) {
    /**
     * Requisição a OpenWeatherAPI
     * @param city Cidade para fazer a requisição
     * @return Dados referentes a resposta da requsição no formato JSON
     */

    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherApiKey}&units=metric&lang=pt_br`;

    const response = await fetch(apiURL);

    const data = await response.json();

    return data;
}

async function showWeatherData(city) {
    /**
     * Exibi ao Front-end o que foi requisitado
     * @param city Cidade para fazer a requisição
     */

    const data = await getWeatherData(city);

    console.log(data);

    if (data.cod == 200) {

        cityElement.textContent = data.name;

        countryFlagElement.src = `https://flagsapi.com/${data.sys.country.toUpperCase()}/flat/24.png`;
        countryFlagElement.alt = data.name;

        temperatureElement.textContent = Math.floor(data.main.temp);

        weatherIconElement.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        weatherIconElement.alt = data.weather[0].description;

        weatherConditionElement.textContent = data.weather[0].description;

        windElement.textContent = `${data.wind.speed}km/h`;

        umidityElement.textContent = `${data.main.humidity}%`;

    } else if (data.cod == 404 || data.cod == 400) {

        window.alert(data.message);
        
    } else {
        
        window.alert(`Falha na requisição da OpenWeatherAPI - Error code: ${data.cod} - Message: ${data.message}`);
    }
}

// Eventos

form.addEventListener('submit', (event) => {

    event.preventDefault();

    const city = cityInput.value.toLowerCase();

    showWeatherData(city);
});

showWeatherData('são paulo');