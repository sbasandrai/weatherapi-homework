//global variables for search button and cities array for localStorage
var searchBtn = $("#search");
var cities = [];

//when document loads, this will render past searched cities
$(document).ready(renderCity());

//user searches for a city, upon click of button use AJAX to query that city from weather API, city saves in localStorage, findWeather function runs
//upon refresh, any cities in localStorage persist/append to unordered list (id: past-cities), need to create <li class="list-group-item"> for each
$(searchBtn).on("click", (event) => {
  event.preventDefault();
  $("#current-weather-card").empty();
  $("#forecast-future").empty();
  var cityInput = $("#search-city").val();
  if (cityInput === "") {
    return;
  }
  storeCity(cityInput);
  findWeather(cityInput);
  futureWeather(cityInput);
  renderCity();
  $("#search-city").val("");
});

//function to set cityInput to localStorage, adding it to the cities array
function storeCity(cityInput) {
  cities.push(cityInput);
  localStorage.setItem("cities", JSON.stringify([...cities]));
}

//function to render past cities searched
function renderCity() {
  var cityDiv = $("#past-cities");
  $(cityDiv).empty();
  $.each(JSON.parse(localStorage.getItem("cities")), function (i, city) {
    var newCity = $("<li>" + city + "</li>");
    newCity.addClass("list-group-item").appendTo(cityDiv);
  });
}

//today's forecast populates to the forecast-today div (card), 5-day forecast populates to forecast-future(cards)
//defining apiKey
var apiKey = "f89051132db4ab1cb9f39239dc668ba0";

//function to get current weather information
function findWeather(cityInput) {
  var queryUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityInput +
    "&APPID=" +
    apiKey;
  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    continueFindingWeather(response);
  });
}

function continueFindingWeather(response) {
  var queryUrl2 =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    response.coord.lat +
    "&lon=" +
    response.coord.lon +
    "&APPID=" +
    apiKey +
    "&units=imperial";
  $.ajax({
    url: queryUrl2,
    method: "GET",
  }).then(function (response2) {
    renderWeather(response2, response.name);
  });
}
