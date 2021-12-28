let apiKey = "6782ca0af433d6f05f5bb7d1e4746371";

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

function showTemp(response) {
  let cityElement = document.querySelector("#city-name");
  let tempElement = document.querySelector("#tempNum");
  let descriptionElement = document.querySelector("#description");

  tempElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;

  //adding the searched city
  let d = new Date();
  let localTime = d.getTime();
  let localOffset = d.getTimezoneOffset() * 60000;
  let utc = localTime + localOffset;
  let nDate = new Date(utc + 1000 * response.data.timezone);
  changeTime(nDate);
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

searchedCity("tehran");
let searchForm = document.querySelector("#search-engine");
searchForm.addEventListener("submit", changeCity);

