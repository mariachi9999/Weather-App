import React, { useEffect } from 'react';
import './MainCity.css';

import MainCard from './MainCard.jsx';
import MapView from './map/react-leaflet';

export default function MainCity({clientCity, searchedCity, onClose}) {
    
    const ipApiKey = process.env.REACT_APP_IP_API_KEY

    let city=null;
    if (searchedCity){
        city = searchedCity
    } else {
        city = clientCity
    }
    let latitude = city.latitud;
    let longitude = city.longitud;

    // async function getForecast(city) {
    //     let forecast = undefined
    //     let url = `api.openweathermap.org/data/2.5/forecast/daily?q=${city}&units=metric&cnt=7&appid=${ipApiKey}`
    //     try {
    //       forecast = await (await fetch(url)).json()
    //     } catch (error) {
    //       console.error(error);
    //     }
    //     console.log(url)
    //     return forecast
    // }
    // useEffect(()=>getForecast(searchedCity),[])    

    return (
        <div className='mainCity'>
            <div className='mainCityCard'>
                {!city?
                    <div></div>
                    :
                    <MainCard
                    key={city.id}
                    act={Math.round(city.temp,0)}
                    wind_speed={city.wind_speed}
                    wind_direction={city.wind_direction}
                    sunrise= {city.sunrise}
                    sunset= {city.sunset}
                    max={Math.round(city.max,0)}
                    min={Math.round(city.min,0)}
                    name={city.name}
                    img={city.img}
                    onClose={() => onClose(city.id)}
                />
                }
            </div>
            <div className='mainCityMap'>
                <MapView latitude={latitude} longitude={longitude}/>
            </div>
        </div>
    
  );
}