// Sean Wallace September 2022 weather_api.js
// NOTE: js front-end does not do exports/require; only nodejs does
// MVP: the city fetch does not filter by country, eg Newcastle AUS will never be found whereas Newcastle UK will
const weatherAPIAppId = '85572fccbd008e17b2a41bc1471e6c04';

function getCityLatLon(cityNameToFetch) {
	console.log(cityNameToFetch);

	// var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + locationLat + '&lon=' + locationLon + '&units=metric' + '&appid=' + weatherAPIAppId;
	// var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + locationLat + '&lon=' + locationLon + '&units=metric' + '&appid=' + weatherAPIAppId;

	let citySearchURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityNameToFetch + '&limit=5&appid=' + weatherAPIAppId

	fetch(citySearchURL)
		.then(function (response) {
			return response.json();
		})
		.then(function (dataCityLatLon) {
			if (dataCityLatLon.length === 0) {
				console.log('unknown city found')
			} else {
				// assumption: since the 0 index record always exists if lenght <> 0 we assume it's the best lat/lon data record
				// API documentation confirms: fetch result is JSON
				storeCity(dataCityLatLon);
			};

			// document.querySelector("#temp").innerHTML = data.main.temp;
			// document.querySelector("#feels-like").innerHTML = data.main.feels_like;
			// document.querySelector("#wind").innerHTML = data.wind.speed;
			// document.querySelector("#humidity").innerHTML = data.main.humidity;
			// weatherCardEl.classList.remove('hide');
			// document.getElementById("weatherInfoCard").scrollIntoView();
		})
		.catch(function (response) {
			alert(response)
			console.log('fetch city failed');
		});
}

// weather authentication

const weatherCardEl = document.getElementById('weatherInfoCard');


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
			})
			.catch(function (response){
				alert(response);
			} );
	};
};


function btnShortlistClick(event, buttonId) {
	event.preventDefault();
	event.stopPropagation();
	getCityCurrentWeatherApi(buttonId);
}
