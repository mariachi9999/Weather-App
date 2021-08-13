import React, { useState, useEffect } from "react";
import "./MainCity.css";
import { useSelector, useDispatch } from "react-redux";
import { getNews } from "../store/actions/index";

import MainCard from "./MainCard.jsx";
import MapView from "./map/react-leaflet";

export default function MainCity() {
  const ipApiKey = process.env.REACT_APP_IP_API_KEY;

  const dispatch = useDispatch();
  const clientCity = useSelector(store=>store.clientCity);
  const searchedCity = useSelector(store=>store.searchedCity);
  const weather = useSelector(store=>store.weather);
  const news = useSelector(store=>store.news);

  let city = null;
  if (searchedCity) {
    city = searchedCity;
  } else {
    city = clientCity;
  }

  useEffect(() => {
    console.log("ejecuta timeOut");
    setTimeout(() => {
      console.log(city.name);
      dispatch(getNews(city.name));
    }, 3000);
  }, [city]);

  let latitude = city.latitud;
  let longitude = city.longitud;

  let notice1 = [];
  let notice2 = [];
  if (news) {
    notice1 = news.map((noticia) => noticia.split("/url?q=")[1]);
    notice2 = notice1.map((noticia) => noticia.split("&sa")[0]);
    console.log(notice2);
  }

  return (
    <div className="mainCity">
      <div className="mainCityCard">
        {!city || city===undefined ? (
          <div></div>
        ) : (
          <MainCard
            key={city.id}
            act={Math.round(city.temp, 0)}
            wind_speed={city.wind_speed}
            wind_direction={city.wind_direction}
            sunrise={city.sunrise}
            sunset={city.sunset}
            max={Math.round(city.max, 0)}
            min={Math.round(city.min, 0)}
            name={city.name}
            img={city.img}
            // onClose={() => onClose(city.id)}
          />
        )}
      </div>
      <div className="mainCityNews">
        <p>News</p>
        {notice2 &&
          notice2.map((noticia) => (
            <a href={noticia} target="_blank" rel="noreferrer">
              {noticia}
            </a>
          ))}
      </div>
      <div className="mainCityMap">
        <MapView latitude={latitude} longitude={longitude} />
      </div>
    </div>
  );
}
