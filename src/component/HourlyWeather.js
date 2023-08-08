import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureHigh, faWind, faTint, faCloud, faUmbrella } from '@fortawesome/free-solid-svg-icons';

function HourlyWeather({ hourlyData }) {
  return (
    <div className="hourly-weather">
      {hourlyData.map((hour, index) => (
        <div key={index} className="hourly-item">
          <p>Time: {hour.time}</p>
          <p>{hour.temp_c}°C</p>
          <FontAwesomeIcon icon={faTemperatureHigh} />
          <p>{hour.wind_kph} km/h</p>
          <FontAwesomeIcon icon={faWind} />
          <p>{hour.humidity}%</p>
          <FontAwesomeIcon icon={faTint} />
          <p>{hour.cloud}%</p>
          <FontAwesomeIcon icon={faCloud} />
          <p>{hour.precip_mm} mm</p>
          <FontAwesomeIcon icon={faUmbrella} />
          {/* Thêm thông tin khác nếu cần */}
        </div>
      ))}
    </div>
  );
}

export default HourlyWeather;
