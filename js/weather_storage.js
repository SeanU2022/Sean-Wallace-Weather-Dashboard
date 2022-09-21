// Sean Wallace September 2022 weather_storage.js

// GLOBALS
const gLocalStorageEntryName = 'citiesLatitudeLongitude';

let gLocalStorageCities = localStorage.getItem('citiesLatitudeLongitude');
console.log('gLocalStorageCities XXXXXXXXXXXX EVERY TIME WE LOAD');
if (gLocalStorageCities && gLocalStorageCities != null) {
  console.log(gLocalStorageCities);
} else {
  console.log('gLocalStorageCities/citiesLatitudeLongitude is empty!');
}

//  DOM
var chosenShortList = document.getElementById("shortList");
var buttonClearShortlist = document.getElementById("button-clear-shortlist");

function clearCityList() {
  localStorage.clear();
  // reload();
  // weather elements?.classList.add('hide');
};

// store in local storage
// NOTE: json response data can have mutliple records which gets stored but we are only interested in 0 index record
function storeCity(cityJSONdata) {
console.log(cityJSONdata);
console.log(cityJSONdata[0].name);				
console.log(cityJSONdata[0].lat);				
console.log(cityJSONdata[0].lon);
    
    let storedCities = localStorage.getItem(gLocalStorageEntryName);

    // if there are stored cities we will add to them otherwise we will store the first record
    // MVP: this does not check if a city has already been stored so duplicates can occur
    if (storedCities && storedCities != null) {
      let cities = JSON.parse(storedCities);
console.log(cities);
      cities.push(cityJSONdata);
      localStorage.setItem(gLocalStorageEntryName, JSON.stringify(cities));
    } else {
      localStorage.setItem(gLocalStorageEntryName, JSON.stringify([cityJSONdata]));
  };
  // reload();
};

//retrieve from local storage
function reload() {

  var shortlistButtonId = 0;
  var shortlistProperties = [];
  shortlistProperties = localStorage.getItem('shortlistProperties');

  $("#shortList").html("");

  if (shortlistProperties && shortlistProperties != null) {
    console.log(shortlistProperties.length);

    var arrShortlist = JSON.parse(shortlistProperties);
    arrShortlist.forEach(element => {
      var shortListItem;
      shortListItem = document.createElement("button");
      if (element.listing.propertyDetails.displayableAddress) {
        shortListItem.textContent = element.listing.propertyDetails.displayableAddress;        
      } else {
        shortListItem.textContent = "Address unknown";
        console.log("storage bad record ");
        console.log("element.listing.propertyDetails.displayableAddress");
      };
      shortListItem.setAttribute("id", "btn-shortlist" + shortlistButtonId);
      chosenShortList.appendChild(shortListItem);
      shortListItem.addEventListener("click", (e) => {
        btnShortlistClick(e, e.target.id);
      });
      shortlistButtonId++;
    });
  }
};

window.addEventListener('load', reload);

// buttonClearShortlist.addEventListener("click", function (event) {
//   event.preventDefault();
//   event.stopPropagation();
//   clearShortlist();
// });