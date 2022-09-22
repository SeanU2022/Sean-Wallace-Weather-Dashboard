// Sean Wallace September 2022 weather_storage.js

// GLOBALS
const gLocalStorageEntryName = 'citiesLatitudeLongitude';

// let gLocalStorageCities = localStorage.getItem('citiesLatitudeLongitude');
// console.log('gLocalStorageCities XXXXXXXXXXXX EVERY TIME WE LOAD');
// if (gLocalStorageCities && gLocalStorageCities != null) {
//   console.log(gLocalStorageCities);
// } else {
//   console.log('gLocalStorageCities/citiesLatitudeLongitude is empty!');
// }

//  DOM
const citiesList = document.getElementById("cities-list");

// MVP: should search for gLocal key - to be done in future release
function clearCityList() {
  localStorage.clear();
  reload();
};

// store in local storage
// NOTE: json response data can have mutliple records which gets stored but we are only interested in 0 index record
function storeCity(cityJSONdata) {
    let storedCities = localStorage.getItem(gLocalStorageEntryName);

    // if there are stored cities we will add to them otherwise we will store the first record
    // MVP: this does not check if a city has already been stored so duplicates can occur
    if (storedCities && storedCities != null) {
      let cities = JSON.parse(storedCities);
      cities.push(cityJSONdata);
      localStorage.setItem(gLocalStorageEntryName, JSON.stringify(cities));
    } else {
      localStorage.setItem(gLocalStorageEntryName, JSON.stringify([cityJSONdata]));
  };
  reload();
};

//retrieve from local storage and render city buttons as children of #cities-list
function reload() {
  let citiesListArrayUnparsed = [];
  citiesListArrayUnparsed = localStorage.getItem(gLocalStorageEntryName);

  $("#cities-list").html("");

  if (citiesListArrayUnparsed && citiesListArrayUnparsed != null) {
    let citiesListArray = JSON.parse(citiesListArrayUnparsed);

    citiesListArray.forEach( ( element, index ) => {

      let btnCityName;
      btnCityName = document.createElement("button");
      btnCityName.setAttribute("id", "btn-city" + index);           // the index is used to name buttons uniquely
      btnCityName.setAttribute("class", "w-100 mb-1 btn btn-lg btn-outline-info fs-6");
      btnCityName.textContent = element[0].name;                    // name is an attribute of the parsed JSON data
      citiesList.appendChild(btnCityName);

      btnCityName.addEventListener("click", (e) => {
        btnCityListClick(e, e.target.id);
      });
    });
  }

  // since local storage is empty nothing is to be done on index page

};

// reload is in weather_storage.js
window.addEventListener('load', reload);