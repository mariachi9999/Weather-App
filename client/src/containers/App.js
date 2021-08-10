import React, { useState, useEffect } from 'react';

import './App.css';
import Nav from '../components/Nav.jsx';
import Cards from '../components/Cards.jsx';
import MainCity from '../components/MainCity';
import Footer from '../components/Footer';
import googleNewsScraper from 'google-news-scraper'


const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
const ipApiKey = process.env.REACT_APP_IP_API_KEY


function App() {


  async function news (city){
    const articles = await googleNewsScraper({
      searchTerm: city,
      prettyURLs: false,
      timeframe: "5d",
      puppeteerArgs: []
    })
    console.log(articles)
  }
  
  //https://ipstack.com/documentation
  //to track the user's IP I used ipstack.

  //https://openweathermap.org/api
  //to ask for the weather, I used openweathermap.

  const [cities, setCities] = useState({
    clientCity: undefined,
    searchedCity: "",
    favCities: []
  });
  
  function onClose(id) {
    setCities(oldCities => oldCities.favCities.filter(c => c.id !== id));
  }

  async function getIpClient() {
    try {
      fetch('https://api.ipify.org?format=json')
      .then(r => r.json())
      .then(rta=> fetch(`http://api.ipstack.com/${rta.ip}?access_key=83eaf8267153cd013b61a3963450306a&format=1`))
      .then(r=>r.json())
      .then(r=> {
        onLoad(r.city)
        news(r.city)
      })
      .then(r=>console.log(r))
      // .then(onFav())
      // await onFav()
    } catch (error) {
      console.error(error);
    }
  }

  async function onSearch(ciudad) {
    //Llamado a la API del clima
    const search = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=299dc9f40d589d6bcc32f61eb4e30885`
    fetch(search)
      .then(r => r.json())
      .then((recurso) => {
        if(recurso.main !== undefined){
          const ciudad = {
            min: Math.round(recurso.main.temp_min),
            max: Math.round(recurso.main.temp_max),
            img: recurso.weather[0].icon,
            id: recurso.id,
            wind_speed: recurso.wind.speed,
            wind_direction: recurso.wind.deg,
            sunrise: recurso.sys.sunrise,
            sunset: recurso.sys.sunset,
            temp: recurso.main.temp,
            name: recurso.name,
            weather: recurso.weather[0].main,
            clouds: recurso.clouds.all,
            latitud: recurso.coord.lat,
            longitud: recurso.coord.lon
          };
          setCities(oldCities => ({...oldCities, searchedCity: ciudad}));
        } else {
          alert("Ciudad no encontrada");
        }
      });
  }

  function onLoad(ciudad) {
    //Llamado a la API del clima
    const search = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=299dc9f40d589d6bcc32f61eb4e30885`
    fetch(search)
      .then(r => r.json())
      .then((recurso) => {
        if(recurso.main !== undefined){
          const ciudad = {
            min: Math.round(recurso.main.temp_min),
            max: Math.round(recurso.main.temp_max),
            img: recurso.weather[0].icon,
            id: recurso.id,
            wind_speed: recurso.wind.speed,
            wind_direction: recurso.wind.deg,
            sunrise: recurso.sys.sunrise,
            sunset: recurso.sys.sunset,
            temp: recurso.main.temp,
            name: recurso.name,
            weather: recurso.weather[0].main,
            clouds: recurso.clouds.all,
            latitud: recurso.coord.lat,
            longitud: recurso.coord.lon
          };
          setCities(oldCities => ({...oldCities, clientCity: ciudad}));
        } else {
          alert("Ciudad no encontrada");
        }
      });
  }

  // function onFav() {
  //   const initFavCities = ['Buenos Aires', 'Bogota', 'Lima', 'Quito']
  //   let favorites = []
  //   for(let i=0;i<initFavCities.length;i++){
  //   const search = `http://api.openweathermap.org/data/2.5/weather?q=${initFavCities[i]}&units=metric&appid=299dc9f40d589d6bcc32f61eb4e30885`
  //   fetch(search)
  //     .then(r => r.json())
  //     .then((recurso) => {
  //       if(recurso.main !== undefined){
  //         const ciudad = {
  //           min: Math.round(recurso.main.temp_min),
  //           max: Math.round(recurso.main.temp_max),
  //           img: recurso.weather[0].icon,
  //           id: recurso.id,
  //           wind_speed: recurso.wind.speed,
  //           wind_direction: recurso.wind.deg,
  //           sunrise: recurso.sys.sunrise,
  //           sunset: recurso.sys.sunrise,
  //           temp: recurso.main.temp,
  //           name: recurso.name,
  //           weather: recurso.weather[0].main,
  //           clouds: recurso.clouds.all,
  //           latitud: recurso.coord.lat,
  //           longitud: recurso.coord.lon
  //         };
  //         favorites.unshift(ciudad)
  //       }})
  //     .then(()=>setCities(oldCities => ({...oldCities,favCities:favorites})))
  //     } 
  //     };


  // function onFilter(ciudadId) {
  //   let ciudad = cities.filter(c => c.id === parseInt(ciudadId));
  //   if(ciudad.length > 0) {
  //       return ciudad[0];
  //   } else {
  //       return null;
  //   }
  // }

  useEffect(()=>getIpClient(),[])

  return (
    <div className="App">
      <div className="AppHeader">
        <Nav onSearch={onSearch}/>
      </div>
      <div className="AppCity">
        {cities.clientCity===undefined?
          <div></div>
          :
          <MainCity
          clientCity={cities.clientCity}
          searchedCity={cities.searchedCity}
          // onClose={onClose}
          />
        }

      </div>
      <div className="AppFavs">
        <Cards
          cities={cities.favCities}
          // onClose={onClose}
        />
      </div>
      <div className="AppFooter">
        <Footer/>
      </div>
    </div>
  );
}

export default App;
