import axios from "axios";
const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
const ipApiKey = process.env.REACT_APP_IP_API_KEY
const positionStackApi =`2e0e65bf6db5ded7acc89588dcc601a0`



export function getIpClient() {
  return async function (dispatch){
      return fetch("https://api.ipify.org?format=json")
        .then((r) => r.json())
        .then((rta) =>
          fetch(
            `http://api.ipstack.com/${rta.ip}?access_key=83eaf8267153cd013b61a3963450306a&format=1`
          )
        )
        .then((r) => r.json())
        .then(r => {
          dispatch({
            type: "SET_CITY",
            payload: r,
          });
        })
  }
}

export function getActualWeather(ciudad) {
  return async function(dispatch){
    //Llamado a la API del clima
    const search = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=131a263c9a573a3769b911f2e58edc8f`;
    fetch(search)
      .then((r) => r.json())
      .then((recurso) => {
        if (recurso.main !== undefined) {
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
            longitud: recurso.coord.lon,
          };
          dispatch({
            type: "SET_ACTUAL_WEATHER",
            payload: ciudad,
          });
        } else {
        }
      });
  }
}

export const getNews = (city) => {
  return async function (dispatch){
    let search = "";
    if (city) {
      search = city.replace(/ /g, "+").toLowerCase();
    }
    axios
      .get(`http://localhost:3001/news/?city=${search}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        dispatch({
          type: "SET_NEWS",
          payload: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }
};

export function onSearch(city) {
  let search = `http://api.positionstack.com/v1/forward?access_key=${positionStackApi}&query=${city}`

  return async function (dispatch){
    fetch(search)
    .then(r=>r.json())
    .then(recurso=>{
      dispatch({
        type: "SET_SEARCH_CITY",
        payload: recurso.data[0],
      });
    })
  }
}

export function getForecast(lat,lon) {
  let search = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly&appid=131a263c9a573a3769b911f2e58edc8f`
  return async function(dispatch){
    fetch(search)
      .then((r) => r.json())
      .then((recurso) => {
          dispatch({
            type: "SET_FORECAST",
            payload: recurso,
          });
        } 
      );
}}
