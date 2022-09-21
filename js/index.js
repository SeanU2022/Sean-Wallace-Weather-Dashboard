// Sean Wallace September 2022
// const weatherApiFile = require('./weather_api.js');
// NOTE: js front-end does not do exports/require; only nodejs does

// DOM
const cityName = document.getElementById("city-name-input");
const btnCityNameSearch = document.getElementById("city-name-btn-search");
const btnCityListClear = document.getElementById("city-list-btn-clear");



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

// Execute press of Enter key only for search
cityName.addEventListener("keypress", function (event) {
    // If the user presses the “Enter” key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        btnCityNameSearch.click();
    }
});

// Excute the clear in weather_storage.js
btnCityListClear.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    clearCityList();
});