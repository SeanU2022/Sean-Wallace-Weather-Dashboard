// Sean Wallace September 2022
// show weather details on index used by logic in weather_api.js and weather_storage.js

const cwcCity = document.querySelector("#cwc-city");
const cwcTemp = document.querySelector("#cwc-temp");
const cwcWind = document.querySelector("#cwc-wind");
const cwcHumidity = document.querySelector("#cwc-humidity");
const cwcUV = document.querySelector("#cwc-UV");
const cwcUnits = document.querySelector("#cwc-units");

function renderCity (cityName, cityDate) {
    cwcCity.textContent = cityName + ' ' + cityDate;
    cwcUnits.textContent = "Units are metric"
};

function renderTempWindHumid (cityTemp, cityWind, cityHumidity) {
    cwcTemp.textContent = 'Temperature: ' + cityTemp;
    cwcWind.textContent = 'Wind speed: ' + cityWind;
    cwcHumidity.textContent = 'Humidity: ' + cityHumidity;
};

function renderUV (cityUV) {
    cwcUV.textContent = 'UV Index: ' + cityUV;
};




