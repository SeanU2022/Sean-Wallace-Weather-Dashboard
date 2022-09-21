// Sean Wallace update September 2022

// weather authentication
var weatherAPIAppId = '85572fccbd008e17b2a41bc1471e6c04';
var weatherCardEl = document.getElementById('weatherInfoCard');

// DOM
var buttonFetchPropertyList = document.getElementById("button-fetch-property-list");

function getCityCurrentWeatherApi(btnShortlistClicked) {
	var shortlistProperties = localStorage.getItem('shortlistProperties');

	if (shortlistProperties && shortlistProperties != null) {

		// get clicked button number to target array/local storage record number
		var localStorageRow = btnShortlistClicked.match(/\d+/);

		var storedShortlistProperties = JSON.parse(shortlistProperties);

		var locationLat = storedShortlistProperties[localStorageRow].listing.propertyDetails.latitude;
		var locationLon = storedShortlistProperties[localStorageRow].listing.propertyDetails.longitude;

		//Loop over the data to generate a table, each table row will have a link to the repo url
		var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + locationLat + '&lon=' + locationLon + '&units=metric' + '&appid=' + weatherAPIAppId;
		fetch(weatherUrl)
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				document.querySelector("#temp").innerHTML = data.main.temp;
				document.querySelector("#feels-like").innerHTML = data.main.feels_like;
				document.querySelector("#wind").innerHTML = data.wind.speed;
				document.querySelector("#humidity").innerHTML = data.main.humidity;
				weatherCardEl.classList.remove('hide');
				document.getElementById("weatherInfoCard").scrollIntoView();
			});
	};
};


function btnShortlistClick(event, buttonId) {
	event.preventDefault();
	event.stopPropagation();
	getCityCurrentWeatherApi(buttonId);
}
