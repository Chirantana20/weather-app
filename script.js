const OPEN_CAGE_KEY = "1973de9ff41d4f0689a289f87cf6ebb2";

function getCoordinates(city) {
  return fetch(`https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${OPEN_CAGE_KEY}`)
    .then(response => response.json())
    .then(data => {
      const { lat, lng } = data.results[0].geometry;
      return { lat, lng };
    });
}

function getWeather(city) {
  getCoordinates(city).then(({ lat, lng }) => {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`)
      .then(response => response.json())
      .then(data => {
        const temperature = data.current_weather.temperature;
        const condition = `Weather code: ${data.current_weather.weathercode}`; 

        document.getElementById("weatherResult").innerHTML = `
          <h2>Weather in ${city}</h2>
          <p>🌡 Temperature: ${temperature}°C</p>
          <p>🌥️ ${condition}</p>
        `;
      })
      .catch(error => {
        console.error("Weather fetch error:", error);
        document.getElementById("weatherResult").innerHTML = `<p>Could not retrieve weather.</p>`;
      });
  });
}

document.getElementById("searchBtn").addEventListener("click", () => {
  const city = document.getElementById("city").value;
  if (city) {
    getWeather(city);
  }
});
