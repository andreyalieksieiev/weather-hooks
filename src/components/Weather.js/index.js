import React from 'react';
import { Weather_container } from './styled';

export const Weather = ({ 
  data: {
    name,
    sys: {country},
    main: {temp, feels_like},
    wind: {speed, deg},
    weather, 
  }
}) => {
  const iconUrl = 'http://openweathermap.org/img/wn';
  return(
    <Weather_container>
      <h2>
        {name}, {country}
      </h2>
      <h2>{temp.toFixed(0)} C</h2>
      <p>Feels like: {feels_like.toFixed(0)}</p>
      {weather && weather.map(({ description, main, icon }, i) => (
        <p key={i}>
          <img src={`${iconUrl}/${icon}@2x.png`} alt="" />
          <br />
          <b>{main}</b>
          <br />
          {description}
        </p>
      ))}
      <p>
        {deg} {speed}
      </p>
    </Weather_container>
  );
};