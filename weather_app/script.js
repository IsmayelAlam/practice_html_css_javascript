"use strict";

// inputs
const inputBtn = document.querySelector(".search");
const inputName = document.querySelector(".input_name");

// output
const forecast = document.querySelector(".forecasting");
const weather = document.querySelector(".weather");
const currentTemp = document.querySelector(".current_temp");
const weatherIcon = document.querySelector(".weather_icon");
const weatherFeelLike = document.querySelector(".feels_like");
const weatherDescription = document.querySelector(".description");
const maxWeather = document.querySelector(".max span");
const minWeather = document.querySelector(".min span");
const cityDetails = document.querySelector(".city_details");
const cityName = document.querySelector(".cityname");
const sunrise = document.querySelector(".sunrise");
const sunset = document.querySelector(".sunset");
const extraInfo = document.querySelector(".extra_info");
const pressure = document.querySelector(".pressure p");
const humidity = document.querySelector(".humidity p");
const wind = document.querySelector(".wind p");
const errorMassage = document.querySelector(".error");

//open weather map api for weather data
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
const apiKey = "appid=08ffe2af33c25aff75263b1e5";
let lat;
let long;
let searchCity;

// get current location
window.navigator.geolocation.getCurrentPosition((location) => {
  long = location.coords.longitude;
  lat = location.coords.latitude;
});

async function renderWeather(event) {
  try {
    // defaults
    event.preventDefault();
    errorMassage.classList.add("hidden");
    weather.classList.remove("hidden");
    cityDetails.classList.remove("hidden");
    extraInfo.classList.remove("hidden");
    //   get city name
    searchCity = inputName.value;
    const coordinates = `lat=${lat.toFixed(2)}&lon=${long.toFixed(2)}`;

    //     get weather data from api
    const data = await fetch(
      `${apiUrl}${apiKey}&${
        inputName.value ? `q=${searchCity}` : coordinates
      }&units=metric`
    );
    const response = await data.json();

    // render the weather data
    weatherIcon.src = `https://openweathermap.org/img/wn/${response.weather[0].icon}@4x.png`;
    currentTemp.innerHTML = `${response.main.temp.toFixed(1)}<span> ℃</span>`;
    weatherFeelLike.innerHTML =
      `Feels like ${response.main.feels_like.toFixed(1)}` + `℃`;
    weatherDescription.innerHTML = response.weather[0].description;
    minWeather.innerHTML = `min ${response.main.temp_min.toFixed(1)}℃`;
    maxWeather.innerHTML = `max ${response.main.temp_max.toFixed(1)}℃`;
    cityName.innerHTML = response.name;
    sunrise.innerHTML = `sunrise ${new Date(
      response.sys.sunrise
    ).getHours()}:${new Date(response.sys.sunrise).getMinutes()}`;
    sunset.innerHTML = `sunset ${new Date(
      response.sys.sunset
    ).getHours()}:${new Date(response.sys.sunset).getMinutes()}`;
    pressure.innerHTML = `pressure ${response.main.pressure} hPa`;
    humidity.innerHTML = `humidity ${response.main.humidity}%`;
    wind.innerHTML = `wind-speed ${response.wind.speed} m/s`;

    //     clear the input
    inputName.value = "";
  } catch (err) {
    errorMassage.classList.remove("hidden");
    weather.classList.add("hidden");
    cityDetails.classList.add("hidden");
    extraInfo.classList.add("hidden");
  }
}

// show weather on page load
window.addEventListener("load", renderWeather);
// show search city weather
inputBtn.addEventListener("click", renderWeather);
