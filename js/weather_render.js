// Sean Wallace September 2022
// show weather details on index used by logic in weather_api.js and weather_storage.js

const cwcCity = document.querySelector("#cwc-city");
const cwcTemp = document.querySelector("#cwc-temp");
const cwcWind = document.querySelector("#cwc-wind");
const cwcHumidity = document.querySelector("#cwc-humidity");
const cwcUV = document.querySelector("#cwc-UV");
const cwcUnits = document.querySelector("#cwc-units");

const wfContainer = document.querySelector("#weather-forecast-container");

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

function renderForecastCard(wfContainerParent, titleText, cardDate, cardTemp, cardWind, cardHumidity) {

    let cardElement;
    let cardElementSubContainer;
    let cardElementCardHeader;
    let cardElementCardHeaderTitle;
    let cardBody;
    // let cardTitle;
    let cardUL;
    let cardLI;

    cardElement = document.createElement('div');
    cardElement.setAttribute("class", "col");
    
    cardElementSubContainer = document.createElement('div');
    cardElementSubContainer.setAttribute("class", "card mb-4 rounded-3 shadow-sm");
    
    
    cardElementCardHeader =  document.createElement('div');
    cardElementCardHeader.setAttribute("class", "card-header py-3");

    cardElementCardHeaderTitle =  document.createElement('h4');
    cardElementCardHeaderTitle.setAttribute("class", "my-0 fw-normal");
    cardElementCardHeaderTitle.textContent = "Forecast Date";

    cardBody = document.createElement('div');
    cardBody.setAttribute("class", "card-body");
    
    cardUL = document.createElement('ul');
    cardUL.setAttribute("class", "list-unstyled mt-3 mb-4");
        cardLI = document.createElement('li');
        cardLI.textContent = "the temp";
        cardUL.appendChild(cardLI);

        cardLI = document.createElement('li');
        cardLI.textContent = "the wind";
        cardUL.appendChild(cardLI);

        cardLI = document.createElement('li');
        cardLI.textContent = "the Humidity";
        cardUL.appendChild(cardLI);
    cardBody.appendChild(cardUL);

    cardElementCardHeader.appendChild(cardElementCardHeaderTitle);
    cardElementSubContainer.appendChild(cardElementCardHeader);
    cardElementSubContainer.appendChild(cardBody);
    cardElement.appendChild(cardElementSubContainer);

// cardElement.appendChild(cardElementSubContainer);

    wfContainerParent.appendChild(cardElement);
    
}


