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
				// assumption: since the 0 index record always exists if length <> 0 we assume it's the best lat/lon data record
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

// const weatherCardEl = document.getElementById('weatherInfoCard');


function getCityCurrentWeather(btnCityListClicked) {
	let storedCities = localStorage.getItem(gLocalStorageEntryName);

	if (storedCities && storedCities != null) {
		// retrieve the stored cities
		let parsedCities = JSON.parse(storedCities);

		// get clicked button number to target array/local storage record number
		let localStorageRow = btnCityListClicked.match(/\d+/);

		let cityLat;
		let cityLon;

		// each city button could have many occurrances of that name: eg Newcastle, Haha (yes this is many cities)
		// we are only interested in the zero index city as that is what was used to create the button in the first place
		parsedCities[localStorageRow].forEach( (cityWithThisName, index) => {
			if (index === 0) {
				cityLat = cityWithThisName.lat;
				cityLon = cityWithThisName.lon;
			};
			console.log(`at index=${index}: this is the ${index+1}st/nd/rd/th occurance of ${cityWithThisName.name}`);
		});

console.log('XXXXXXXXXXXXXXXXXXXXXXZZZZZZZZZZZZZZZZZZZZZYYYYYYYYYYYYYYYYYYYYYYYYYYYY');
console.log(cityLat);
console.log(cityLon);

		let weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + cityLat + '&lon=' + cityLon + '&units=metric' + '&appid=' + weatherAPIAppId;
		fetch(weatherUrl)
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				// document.querySelector("#temp").innerHTML = data.main.temp;
				// document.querySelector("#feels-like").innerHTML = data.main.feels_like;
				// document.querySelector("#wind").innerHTML = data.wind.speed;
				// document.querySelector("#humidity").innerHTML = data.main.humidity;
				// weatherCardEl.classList.remove('hide');
				// document.getElementById("weatherInfoCard").scrollIntoView();
console.log(data.main.temp);
console.log(data.wind.speed);
console.log(data.main.humidity);
			})
			.catch(function (response){
				alert(response);
			} );
	};
};
