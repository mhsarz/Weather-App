////// Default
let apiKey = "6782ca0af433d6f05f5bb7d1e4746371";

function showTempDef(response) {
  let nowTemp = document.querySelector("#tempNum");
  let temp = Math.round(response.data.main.temp);
  nowTemp.innerHTML = temp;
  let nowDescription = document.querySelector("#description");
  let description = response.data.weather[0].description;
  nowDescription.innerHTML = description;
}

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=TEHRAN&units=metric&appid=${apiKey}`;
axios.get(apiUrl).then(showTempDef);

////// DATE AND TIME//////
function changeTime(time) {
  let hour = time.getHours();
  let minute = time.getMinutes();
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
  let htmlMonth = document.querySelector("#current-date");
  let htmlTime = document.querySelector("#time");
  let htmlWeekDay = document.querySelector("#week-day");
  if (minute >= 10) {
    htmlTime.innerHTML = `${hour}:${minute}`;
  } else {
    htmlTime.innerHTML = `${hour}:0${minute}`;
  }

  htmlWeekDay.innerHTML = weekday;
  htmlMonth.innerHTML = `${day} ${month} ${year}`;
}
let now = new Date();
changeTime(now);

/////////////////

function showTemp(response) {
  let nowCity = document.querySelector("#city-name");
  let nowTemp = document.querySelector("#tempNum");
  let nowDescription = document.querySelector("#description");
  let temp = Math.round(response.data.main.temp);
  let searchedCity = document.querySelector("#search-city");
  let city = searchedCity.value.toUpperCase();
  let description = response.data.weather[0].description;
  nowCity.innerHTML = city;
  nowTemp.innerHTML = temp;
  nowDescription.innerHTML = description;
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

