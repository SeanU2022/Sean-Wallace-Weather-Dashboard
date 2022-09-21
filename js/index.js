// Sean Wallace September 2022
// const weatherApiFile = require('./weather_api.js');
// NOTE: js front-end does not do exports/require; only nodejs does

// DOM
const cityName = document.getElementById("city-name-input");
const btnCityNameSearch = document.getElementById("city-name-btn-search");



// function btnCityNameSearch(event, cityName) {
// 	event.preventDefault();
// 	event.stopPropagation();
// 	getCityCurrentWeatherApi(buttonId);
// }

// Excute the fetch (shown as "search") button 
btnCityNameSearch.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();

    if (cityName.value === "placeholder" || cityName.value === "") {
        // showRealocatorModalDialog("#dialog-state-and-name");
		alert('enter city name');
    } else {
		getCityLatLon(cityName.value);
        // fetchResidentialProperties(locationState.value, locationName.value);
    }
});
