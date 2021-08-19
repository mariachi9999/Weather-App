import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios'
import './App.css';
import Nav from './components/NavBar/Nav';
import MainContainer from './components/MainContainer/City';
import Footer from './components/Footer/Footer';
import { getIpClient, getActualWeather, getNews, getForecast } from "./store/actions/index";

function App() {

  const dispatch = useDispatch();
  const city = useSelector(store=>store.city);
  const lat = useSelector(store=>store.lat);
  const lon = useSelector(store=>store.lon);


  useEffect(()=> 
  dispatch(getIpClient()),
  [])

  useEffect(()=>dispatch(getForecast(lat,lon)),[city])

  useEffect(()=>dispatch(getNews(city)),[city])


  return (
    <div className="App">
      <div className="AppHeader">
        <Nav/>
      </div>
      <div className="AppCity">
          <MainContainer/>
      </div>
      <div className="AppFooter">
        <Footer/>
      </div>
    </div>
  );
}

export default App;
