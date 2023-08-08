import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const API_KEY = '616cff8c8988474eb6992953230808';

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeatherData}>Get Weather</button>

      {weatherData && (
  <div className="weather-info">
    <h2>Weather in {weatherData.location.name}, {weatherData.location.country}</h2>
    <p>Temperature: {weatherData.current.temp_c}°C</p>
    <p>Condition: {weatherData.current.condition.text}</p>
    <img src={weatherData.current.condition.icon} alt="Weather icon" />

    <p>Wind: {weatherData.current.wind_kph} km/h, {weatherData.current.wind_dir}</p>
    <p>Pressure: {weatherData.current.pressure_mb} mb</p>
    <p>Precipitation: {weatherData.current.precip_mm} mm</p>
    <p>Humidity: {weatherData.current.humidity}%</p>
    <p>Cloud Cover: {weatherData.current.cloud}%</p>
    <p>Feels Like: {weatherData.current.feelslike_c}°C</p>
    <p>Visibility: {weatherData.current.vis_km} km</p>
  </div>
)}
    </div>
  );
}

export default App;
