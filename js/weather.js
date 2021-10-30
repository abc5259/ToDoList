const API_KEY = "141da6cfd270e8ec49b9f24a3eac9a06";

function onGeoOk(position) {
  console.log(position);
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  console.log(lat, lng);
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const city = document.querySelector(".weather__city");
      const temp = document.querySelector(".weather__temp");
      const weather = document.querySelector(".weather__main");
      const maxTemp = document.querySelector(".weather__maxTemp");
      const minTemp = document.querySelector(".weather__minTemp");

      city.innerText = data.name;
      temp.innerText = `${Math.floor(data.main.temp)}℃`;
      weather.innerText = data.weather[0].description;
      maxTemp.innerText = `최고:${Math.ceil(data.main.temp_max)}℃`;
      minTemp.innerText = `최저:${Math.floor(data.main.temp_min)}℃`;
    });
}

function onGeoError() {
  alert("Can't find you. No weather for you");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
