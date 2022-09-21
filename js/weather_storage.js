// Sean Wallace September 2022 weather_storage.js

// GLOBALS
let gLocalStorageCities = localStorage.getItem('citiesLatitudeLongitude');
console.log('gLocalStorageCities XXXXXXXXXXXX EVERY TIME WE LOAD');
if (gLocalStorageCities && gLocalStorageCities != null) {
  console.log(gLocalStorageCities);
} else {
  console.log('gLocalStorageCities/citiesLatitudeLongitude is empty!');
}

let cities = [];


//  DOM
var chosenShortList = document.getElementById("shortList");
var buttonClearShortlist = document.getElementById("button-clear-shortlist");

function clearShortlist() {
  localStorage.clear();
  reload();
  weatherCardEl.classList.add('hide');
};

// store in local storage
function storeCity(cityJSONdata) {
  console.log(cityJSONdata);
  console.log(cityJSONdata[0].name);				
  console.log(cityJSONdata[0].lat);				
  console.log(cityJSONdata[0].lon);


  // var shortlistProperties = localStorage.getItem('shortlistProperties');

  // if (shortlistProperties && shortlistProperties != null) {
  //   var myArr = JSON.parse(shortlistProperties);
  //   myArr.push(property);
  //   localStorage.setItem('shortlistProperties', myArr);
  //   localStorage.setItem('shortlistProperties', JSON.stringify(myArr));
  // }
  // else {
  //   localStorage.setItem('shortlistProperties', JSON.stringify([property]));
  // };

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