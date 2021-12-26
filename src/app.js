////// Default
let apiKey = "6782ca0af433d6f05f5bb7d1e4746371";

function formatTime(timestamp) {
  let date = new Date(timestamp * 1000);
  let hour = date.getHours();
  let minute = date.getMinutes();
  console.log(timestamp);
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${hour}:${minute}`;
}

function formatWeek(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[date.getDay()];
}

function formatYear(timestamp) {
  let date = new Date(timestamp * 1000);
  let year = date.getFullYear();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];
  let day = date.getDate();

  return `${day} ${month} ${year}`;
}

function showTempDef(response) {
  let tempertureElement = document.querySelector("#tempNum");
  let descriptionElement = document.querySelector("#description");
  let timeElement = document.querySelector("#time");
  let weekdayElememt = document.querySelector("#week-day");
  let yearElement = document.querySelector("#current-date");
  weekdayElememt.innerHTML = formatWeek(response.data.dt);
  yearElement.innerHTML = formatYear(response.data.dt);
  timeElement.innerHTML = formatTime(response.data.dt);
  tempertureElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
}

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=TEHRAN&units=metric&appid=${apiKey}`;
axios.get(apiUrl).then(showTempDef);

////// DATE AND TIME//////

/////////////////

function showTemp(response) {
  let cityElement = document.querySelector("#city-name");
  let searchedCity = document.querySelector("#search-city");
  cityElement.innerHTML = searchedCity.value;
  let tempertureElement = document.querySelector("#tempNum");
  let descriptionElement = document.querySelector("#description");
  let timeElement = document.querySelector("#time");
  let weekdayElememt = document.querySelector("#week-day");
  let yearElement = document.querySelector("#current-date");
  weekdayElememt.innerHTML = formatWeek(response.data.dt);
  yearElement.innerHTML = formatYear(response.data.dt);
  timeElement.innerHTML = formatTime(response.data.dt);
  tempertureElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
}

function changeCity(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#search-city");
  let city = searchedCity.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
}

let searchForm = document.querySelector("#search-engine");
searchForm.addEventListener("submit", changeCity);

//////////////
