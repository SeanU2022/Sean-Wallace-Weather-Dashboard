// Sean Wallace September 2022 weather_api.js
// NOTE: js front-end does not do exports/require; only nodejs does
// MVP: the city fetch does not filter by country, eg Newcastle AUS will never be found whereas Newcastle UK will
const weatherAPIAppId = '85572fccbd008e17b2a41bc1471e6c04';

function getCityLatLon(cityNameToFetch) {
	console.log(cityNameToFetch);

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
		})
		.catch(function (response) {
			alert(response)
			console.log('fetch city failed');
		});
}

function getCityWeather(btnCityListClicked) {
	let storedCities = localStorage.getItem(gLocalStorageEntryName);

	if (storedCities && storedCities != null) {
		// retrieve the stored cities
		let parsedCities = JSON.parse(storedCities);

		// get clicked button number to target array/local storage record number
		let localStorageRow = btnCityListClicked.match(/\d+/);

		let cityLat;
		let cityLon;
		let cityName;
		let cityDateYYYYMMDDToday;

		// each city button could have many occurrances of that name: eg Newcastle, Haha (yes this is many cities)
		// we are only interested in the zero index city as that is what was used to create the button in the first place
		parsedCities[localStorageRow].forEach( (cityWithThisName, index) => {
			if (index === 0) {
				cityLat = cityWithThisName.lat;
				cityLon = cityWithThisName.lon;
				cityName = cityWithThisName.name;
			};
			console.log(`at index=${index}: this is the ${index+1}st/nd/rd/th occurance of ${cityWithThisName.name}`);
		});

		let weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + cityLat + '&lon=' + cityLon + '&units=metric' + '&appid=' + weatherAPIAppId;
		fetch(weatherUrl)
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				renderTempWindHumid(data.main.temp, data.wind.speed, data.main.humidity);
			})
			.catch(function (response){
				alert(response);
			} );
		
		let weatherUVUrl = 'https://api.openweathermap.org/data/2.5/uvi?lat=' + cityLat + '&lon=' + cityLon + '&appid=' + weatherAPIAppId;
		fetch(weatherUVUrl)
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				cityDateYYYYMMDDToday = data.date_iso;
				cityDateYYYYMMDDToday = cityDateYYYYMMDDToday.slice(0,10);
				renderCity(cityName, cityDateYYYYMMDDToday)
				renderUV(data.value)
			})
			.catch(function (response){
				alert(response);
			} );
						
			console.log('GETCITYFORECAST==> GETCITYFORECAST==> GETCITYFORECAST==>');
			console.log(cityLat);
			console.log(cityLon);
			
			// MVP: not the best code I've written; it needs refactoring but it works
			let cityDateYYYYMMDDForecast;
			let cityDateYYYYMMDDForecastArray = [];
			let bFound = false;

			let weatherForecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + cityLat + '&lon=' + cityLon + '&appid=' + weatherAPIAppId;

			fetch(weatherForecastUrl)
				.then(function (response) {
					return response.json();
				})
				.then(function (data) {
					// console.log(data);
					// console.log('DDDDDDDDDDDDDDDDDDDDD');
					data.list.forEach( (futureDate, index) => {						
						cityDateYYYYMMDDForecast = futureDate.dt_txt;
						cityDateYYYYMMDDForecast = cityDateYYYYMMDDForecast.slice(0,10);
						// add unique future dates to an array for the forecast rendering
						if (cityDateYYYYMMDDForecast > cityDateYYYYMMDDToday) {

							if (cityDateYYYYMMDDForecastArray.length > 0) {
								for (let indexFA = 0; indexFA < cityDateYYYYMMDDForecastArray.length; indexFA++) {
									if (cityDateYYYYMMDDForecast === cityDateYYYYMMDDForecastArray[indexFA]) {
										bFound = true;
									}
								}
								if (!bFound) {
									cityDateYYYYMMDDForecastArray.push(cityDateYYYYMMDDForecast);
								};
								bFound = false;
							} else {
								cityDateYYYYMMDDForecastArray.push(cityDateYYYYMMDDForecast);
							};
							console.log(cityDateYYYYMMDDForecastArray.length);
						} else {
							//  console.log( futureDate.dt_txt );
						};
					});
				})
				.catch(function (response){
					alert(response);
				} );
// what did we get?
			console.log(cityDateYYYYMMDDForecastArray);
			for (let indexRFC = 0; indexRFC < cityDateYYYYMMDDForecastArray.length; indexRFC++) {
				// const element = array[indexRFC];
				renderForecastCard(wfContainer, 'title', '', '','');
			}
	};
};
