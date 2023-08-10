import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperatureHigh,
  faTemperatureLow,
  faWind,
  faTint,
  faCloud,
  faUmbrella,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);
  const [selectedHourlyIndex, setSelectedHourlyIndex] = useState(null);

  const API_KEY = "616cff8c8988474eb6992953230808";

  const fetchWeatherData = async () => {
    try {
      let response;

      if (city.match(/^[-+]?[0-9]*\.?[0-9]+,[-+]?[0-9]*\.?[0-9]+$/)) {
        const [latitude, longitude] = city.split(",");
        response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=7`
        );
      } else {
        response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7`
        );
      }

      setWeatherData(response.data);
      setSelectedDayIndex(null);
      setSelectedHourlyIndex(null);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };
  useEffect(() => {
    // Get current user's geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        // Call the fetchWeatherData function with latitude and longitude
        setCity(`${latitude},${longitude}`)
        console.log(city)
        fetchWeatherData();
      }, (error) => {
        console.error('Error getting geolocation:', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);
  const weatherIcons = {
    maxTemp: <FontAwesomeIcon icon={faTemperatureHigh} />,
    minTemp: <FontAwesomeIcon icon={faTemperatureLow} />,
    wind: <FontAwesomeIcon icon={faWind} />,
    humidity: <FontAwesomeIcon icon={faTint} />,
    cloud: <FontAwesomeIcon icon={faCloud} />,
    precipitation: <FontAwesomeIcon icon={faUmbrella} />,
  };

  return (
    <div className="App">
      <h1>Weather Checking</h1>
      <input
        type="text"
        placeholder="Enter city name or location"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeatherData}>Get Weather</button>

      {weatherData && (
        <div className="weather-info">
          <h2>
            Weather in {weatherData.location.name},{" "}
            {weatherData.location.country}
          </h2>

          <div className="forecast">
            {weatherData.forecast.forecastday.map((day, index) => (
              <div
                key={index}
                className={`forecast-item ${
                  selectedDayIndex === index ? "selected" : ""
                }`}
                onClick={() => setSelectedDayIndex(index)}
              >
                <p>
                  {weatherIcons.maxTemp} Max Temp: {day.day.maxtemp_c}°C
                </p>
                <p>
                  {weatherIcons.minTemp} Min Temp: {day.day.mintemp_c}°C
                </p>
                <p>
                  {weatherIcons.wind} Wind Speed: {day.day.maxwind_kph} km/h
                </p>
                <p>
                  {weatherIcons.humidity} Humidity: {day.day.avghumidity}%
                </p>
                <p>
                  {weatherIcons.cloud} Cloud Cover:{" "}
                  {day.day.daily_will_it_cloud}%
                </p>
                <p>
                  {weatherIcons.precipitation} Precipitation:{" "}
                  {day.day.totalprecip_mm} mm
                </p>
                <img src={day.day.condition.icon} alt="Weather icon" />
              </div>
            ))}
          </div>

          {selectedDayIndex !== null && (
            <div className="weather-detail">
              <h3>
                Weather Detail for{" "}
                {weatherData.forecast.forecastday[selectedDayIndex].date}
              </h3>
              <p>
                {weatherIcons.maxTemp} Max Temp:{" "}
                {
                  weatherData.forecast.forecastday[selectedDayIndex].day
                    .maxtemp_c
                }
                °C
              </p>
              <p>
                {weatherIcons.minTemp} Min Temp:{" "}
                {
                  weatherData.forecast.forecastday[selectedDayIndex].day
                    .mintemp_c
                }
                °C
              </p>
              <p>
                {weatherIcons.wind} Wind Speed:{" "}
                {
                  weatherData.forecast.forecastday[selectedDayIndex].day
                    .maxwind_kph
                }{" "}
                km/h
              </p>
              <p>
                {weatherIcons.humidity} Humidity:{" "}
                {
                  weatherData.forecast.forecastday[selectedDayIndex].day
                    .avghumidity
                }
                %
              </p>
              <p>
                {weatherIcons.cloud} Cloud Cover:{" "}
                {
                  weatherData.forecast.forecastday[selectedDayIndex].day
                    .daily_will_it_cloud
                }
                %
              </p>
              <p>
                {weatherIcons.precipitation} Precipitation:{" "}
                {
                  weatherData.forecast.forecastday[selectedDayIndex].day
                    .totalprecip_mm
                }{" "}
                mm
              </p>
              <img
                src={
                  weatherData.forecast.forecastday[selectedDayIndex].day
                    .condition.icon
                }
                alt="Weather icon"
              />
            </div>
          )}

          {selectedDayIndex !== null && (
            <div className="hourly-weather">
              <h3>
                Hourly Weather for{" "}
                {weatherData.forecast.forecastday[selectedDayIndex].date}
              </h3>
              <div className="hourly-items">
                {weatherData.forecast.forecastday[selectedDayIndex].hour.map(
                  (hour, index) =>
                    [0, 4, 8, 12, 16, 20].includes(index) && (
                      <div
                        key={index}
                        className={`hourly-item ${
                          selectedHourlyIndex === index ? "selected" : ""
                        }`}
                        onClick={() => setSelectedHourlyIndex(index)}
                      >
                        <h3>{hour.time.split(" ")[1]}</h3>
                        <img src={hour.condition.icon} alt="Weather icon" />
                        <p>
                          {weatherIcons.maxTemp} Temp: {hour.temp_c}°C
                        </p>
                        <p>
                          {weatherIcons.wind} Wind Speed: {hour.wind_kph} km/h
                        </p>
                        <p>
                          {weatherIcons.humidity} Humidity: {hour.humidity}%
                        </p>
                        <p>
                          {weatherIcons.cloud} Cloud Cover: {hour.cloud}%
                        </p>
                        <p>
                          {weatherIcons.precipitation} Precipitation:{" "}
                          {hour.precip_mm} mm
                        </p>
                      </div>
                    )
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
