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
