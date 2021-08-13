import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios'
import './App.css';
import Nav from '../components/Nav.jsx';
import Cards from '../components/Cards.jsx';
import MainCity from '../components/MainCity';
import Footer from '../components/Footer';
import { getIpClient, onLoad } from "../store/actions/index";



const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
const ipApiKey = process.env.REACT_APP_IP_API_KEY


function App() {

  //https://ipstack.com/documentation
  //to track the user's IP I used ipstack.

  //https://openweathermap.org/api
  //to ask for the weather, I used openweathermap.
  const dispatch = useDispatch();
  const city = useSelector(store=>store.city);
  const clientCity = useSelector(store=>store.clientCity);
  const searchedCity = useSelector(store=>store.searchedCity);
  const weather = useSelector(store=>store.weather);
  const news = useSelector(store=>store.news);

  let cityToRender = null;
  if (searchedCity) {
    cityToRender = searchedCity;
  } else {
    cityToRender = clientCity;
  }

  useEffect(()=>dispatch(getIpClient()),[])
  useEffect(()=>dispatch(onLoad(city)),[city])


  return (
    <div className="App">
      <div className="AppHeader">
        <Nav/>
      </div>
      <div className="AppCity">
        {!cityToRender?
          <div></div>
          :
          <MainCity/>
        }

      </div>
      <div className="AppFavs">
        <Cards/>
      </div>
      <div className="AppFooter">
        <Footer/>
      </div>
    </div>
  );
}

export default App;
