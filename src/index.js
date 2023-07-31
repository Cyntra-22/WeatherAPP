// Search Function
/*
function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#cityName");
  let cityInput = document.querySelector("#searchInput");
  cityElement.innerHTML = cityInput.value;
}

let searchform = document.querySelector("#searchForm");
searchform.addEventListener("submit", search); 
*/

//Time Format Function
function formatDate(date) {
  let hours = date.getHours();
  let mins = date.getMinutes();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let dayIndex = date.getDay();
  let day = days[dayIndex];

  return `${day} ${hours}:${mins}`;
}

let dateElement = document.getElementById("date");
let currentTime = new Date();

dateElement.textContent = formatDate(currentTime);

//Display location
function showCurrentLocation_Temperature(response) {
  let h1 = document.querySelector("h1");
  let temperature = document.querySelector("#temperature");

  let currentTemp = Math.round(response.data.main.temp);
  let currentCity = response.data.name;

  temperature.innerHTML = currentTemp;
  h1.innerHTML = currentCity;
}

//get citysearch
function searchCity(position) {
  let apiKey = "fe1483f743b581b5520a1b725af03a49";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${position}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCurrentLocation_Temperature);
}

function submit_city(event) {
  event.preventDefault();
  let city = document.querySelector("#searchInput").value;
  searchCity(city);
}

//get Location
function searchLocation(position) {
  let apiKey = "fe1483f743b581b5520a1b725af03a49";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCurrentLocation_Temperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchform = document.querySelector("#searchForm");
searchform.addEventListener("click", submit_city);

let button = document.querySelector("#currentButton");
button.addEventListener("click", getCurrentLocation);
