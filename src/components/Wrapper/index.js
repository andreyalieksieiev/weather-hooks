import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Container, Content } from './styled';
import { getLocation } from '../../utils';
import { Weather } from '../Weather.js';
import { SearchForm } from '../SearchForm.js';

const API_URL = 'http://api.openweathermap.org/data/2.5';
const API_KEY = '051150af1472493cc78c677d8f4fccb5';

export const Wrapper = () => {
  const [store, setStore] = useState({
      data: undefined
    }
  )

  useEffect(() => { fetchCoords() }, [])

  const fetchCoords = async () => {
    const  coords  = await getLocation()
    fetchWeather({lon: coords.coords.longitude.toFixed(2), lat: coords.coords.latitude.toFixed(2)});
  }

  const fetchWeather = async ({ lon, lat }) => {
    const response = await axios(`${API_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    const data = response;
    setCurrentWeather(data);
  }

  const setCurrentWeather = ({ data }) => {
    const {
      main: { temp, feels_like },
      wind: { speed: wind_speed, deg: wind_degree},
      sys: { country, sunrise, sunset },
      name,
      weather
    } = data;
    setStore({ 
      data: {main: { temp, feels_like }, 
      wind: { speed: wind_speed, deg: wind_degree}, 
      sys: { country, sunrise, sunset }, 
      name,
      weather}})
  }

  const search = async value =>  {
    try {
      const response = await axios(`${API_URL}/weather?appid=${API_KEY}&q=${value}&units=metric`);
      const data = response;
      setCurrentWeather(data);
    } catch (e) {
      throw e;
    }
  }

  const renderContent = () => {
    return(
      store.data ? 
      <>
        <SearchForm  onSubmit={search} />
        <Weather {...store} />
      </>  : 'Loading...'
    )
  }

  return (
    <Container>
      <Content>
       {renderContent()}
      </Content>
    </Container>
  );
}

