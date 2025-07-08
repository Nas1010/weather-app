function getWeather() {
  const city = document.getElementById("city").value;

  if (!city) {
    alert("Please enter a city");
    return;
  }

  fetch(`/api/weather?city=${encodeURIComponent(city)}`)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
        return;
      }
      displayWeather(data.current);
      displayHourlyForecast(data.forecast.list);
    })
    .catch(err => {
      console.error(err);
      alert("Error fetching weather data. Please try again.");
    });
}


function displayWeather(data) {
  console.log('displayWeather data:', data);

  const tempDivinfo = document.getElementById("temp-div")
  const weatherInfoDiv = document.getElementById("weather-info")
  const weatherIcon = document.getElementById("weather-icon")
  const hourlyForecastDiv = document.getElementById("hourly-forecast")

  weatherInfoDiv.innerHTML = ""
  hourlyForecastDiv.innerHTML = ""
  tempDivinfo.innerHTML = ""

  if (data.cod === "404") {
    weatherInfoDiv.innerHTML = `<p>${data.message}</p>`
  } else {
    const cityName = data.name
    const temperature = Math.round(data.main.temp - 273.15)
    const description = data.weather[0].description
    const iconCode = data.weather[0].icon
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`

    const temperatureHTML = `
            <p>${temperature}°C</p>
        `
    const weatherHtml = `
            <p>${cityName}</p>
            <p>${description}</p>
        `

    tempDivinfo.innerHTML = temperatureHTML
    weatherInfoDiv.innerHTML = weatherHtml
    weatherIcon.src = iconUrl
    weatherIcon.alt = description

    showImage()
  }
}

function displayHourlyForecast(hourlyData) {
  const hourlyForecastDiv = document.getElementById("hourly-forecast")
  const next24Hours = hourlyData.slice(0, 8)

  next24Hours.forEach((item) => {
    const dateTime = new Date(item.dt * 1000)
    const hour = dateTime.getHours()
    const temperature = Math.round(item.main.temp - 273.15)
    const iconCode = item.weather[0].icon
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`

    const hourlyItemHtml = `
    <div class="hourly-item">
      <span>${hour}:00</span>
      <img src="${iconUrl}" alt="Hourly Weather Icon">
      <span>${temperature}°C</span>
    </div>
    `
    hourlyForecastDiv.innerHTML += hourlyItemHtml
  })
}

function showImage() {
  const weatherIcon = document.getElementById("weather-icon")
  weatherIcon.style.display = "block"
}