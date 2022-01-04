let apiKey = "6782ca0af433d6f05f5bb7d1e4746371";

//changing to C or F

function changeToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#tempNum");
  temperatureElement.innerHTML = Math.round(celTemp);
}

function changeToFahrenheit(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let temperatureElement = document.querySelector("#tempNum");
  temperatureElement.innerHTML = Math.round(celTemp * 1.8 + 32);
}

let celsiusLink = document.querySelector("#celsius");
let fahrenheitLink = document.querySelector("#fahrenheit");

celsiusLink.addEventListener("click", changeToCelsius);
fahrenheitLink.addEventListener("click", changeToFahrenheit);

/////

function changeTime(time) {
  let hour = time.getHours();
  let minute = time.getMinutes();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minute < 10) {
    minute = `0${minute}`;
  }

  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekday = weekdays[time.getDay()];
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
  let month = months[time.getMonth()];
  let day = time.getDate();
  let year = time.getFullYear();
  let monthElement = document.querySelector("#current-date");
  let timeElement = document.querySelector("#time");
  let weekdayElement = document.querySelector("#week-day");

  timeElement.innerHTML = `${hour}:${minute}`;
  weekdayElement.innerHTML = weekday;
  monthElement.innerHTML = `${day} ${month} ${year}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        ` <div class="col">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${formatDay(forecastDay.dt)}</h5>
              <p class="card-text">
              <img
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt=""
              />
               ${Math.round(forecastDay.temp.day)}°C</p>
            </div>
          </div>
        </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemp(response) {
  let cityElement = document.querySelector("#city-name");
  let tempElement = document.querySelector("#tempNum");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#icon");
  celTemp = response.data.main.temp;

  tempElement.innerHTML = Math.round(celTemp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.main.description);
  //adding the searched city
  let d = new Date();
  let localTime = d.getTime();
  let localOffset = d.getTimezoneOffset() * 60000;
  let utc = localTime + localOffset;
  let nDate = new Date(utc + 1000 * response.data.timezone);
  changeTime(nDate);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  getForecast(response.data.coord);
}

function searchedCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
}

function changeCity(event) {
  event.preventDefault();
  let searched = document.querySelector("#search-city");
  searchedCity(searched.value);
}
let celTemp = null;

searchedCity("tehran");
let searchForm = document.querySelector("#search-engine");
searchForm.addEventListener("submit", changeCity);
