import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);

  const API_KEY = '616cff8c8988474eb6992953230808';

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7`);
      setWeatherData(response.data);
      setSelectedDayIndex(null);
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
          
          <div className="forecast">
            {weatherData.forecast.forecastday.map((day, index) => (
              <div key={index} className={`forecast-item ${selectedDayIndex === index ? 'selected' : ''}`} onClick={() => setSelectedDayIndex(index)}>
                <p>Date: {day.date}</p>
                <p>Condition: {day.day.condition.text}</p>
                <p>Max Temp: {day.day.maxtemp_c}°C</p>
                <p>Min Temp: {day.day.mintemp_c}°C</p>
                <img src={day.day.condition.icon} alt="Weather icon" />
              </div>
            ))}
          </div>

          {selectedDayIndex !== null && (
            <div className="weather-detail">
              <h3>Weather Detail for {weatherData.forecast.forecastday[selectedDayIndex].date}</h3>
              {selectedDayIndex !== null && (
            <div className="weather-detail">
              <p>Max Temp: {weatherData.forecast.forecastday[selectedDayIndex].day.maxtemp_c}°C</p>
              <p>Min Temp: {weatherData.forecast.forecastday[selectedDayIndex].day.mintemp_c}°C</p>
              <p>Average Temp: {weatherData.forecast.forecastday[selectedDayIndex].day.avgtemp_c}°C</p>
              <p>Condition: {weatherData.forecast.forecastday[selectedDayIndex].day.condition.text}</p>
              <p>Wind Speed: {weatherData.forecast.forecastday[selectedDayIndex].day.maxwind_kph} km/h</p>
              <p>Humidity: {weatherData.forecast.forecastday[selectedDayIndex].day.avghumidity}%</p>
              <p>Cloud Cover: {weatherData.forecast.forecastday[selectedDayIndex].day.daily_will_it_cloud}%</p>
              <p>Precipitation: {weatherData.forecast.forecastday[selectedDayIndex].day.totalprecip_mm} mm</p>
              {/* Thêm các thông tin khác mà bạn muốn hiển thị */}
            </div>
          )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
