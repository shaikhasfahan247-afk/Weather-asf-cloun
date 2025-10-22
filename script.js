const apiKey = "4c805482f0e14fad6ed951ce8e334e3b"; // tumhari asli API key

const cityInput = document.getElementById("cityInput");
const getWeatherBtn = document.getElementById("getWeather");
const weatherInfo = document.getElementById("weatherInfo");

function fetchWeather() {
  const city = cityInput.value.trim();
  if(city === "") {
    alert("Please enter a city name");
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {
      if(data.cod === "404") {
        weatherInfo.innerHTML = "City not found!";
        return;
      }

      const temp = data.main.temp;
      const weather = data.weather[0].description;
      const humidity = data.main.humidity;
      const wind = data.wind.speed;

      weatherInfo.innerHTML = `
        <p><strong>City:</strong> ${city}</p>
        <p><strong>Temperature:</strong> ${temp}°C</p>
        <p><strong>Weather:</strong> ${weather}</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind Speed:</strong> ${wind} m/s</p>
      `;
    })
    .catch(err => {
      console.error("API Error:", err);
      weatherInfo.innerHTML = "Error fetching weather data!";
    });
}

// Button click
getWeatherBtn.addEventListener("click", fetchWeather);

// Enter key support
cityInput.addEventListener("keypress", (e) => {
  if(e.key === "Enter") {
    fetchWeather();
  }
});
