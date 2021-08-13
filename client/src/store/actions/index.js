import axios from "axios";
const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
const ipApiKey = process.env.REACT_APP_IP_API_KEY

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
            payload: r.city,
          });
        })
  }
}

export function getActualWeather(ciudad) {
  return async function(dispatch){
    //Llamado a la API del clima
    const search = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=299dc9f40d589d6bcc32f61eb4e30885`;
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
  return async function (dispatch){
    dispatch({
      type: "SET_CITY",
      payload: city,
    });
  }
}

export async function getForecast(city) {
    let forecast = undefined
    let url = `api.openweathermap.org/data/2.5/forecast/daily?q=${city}&units=metric&cnt=7&appid=${ipApiKey}`
    try {
      forecast = await (await fetch(url)).json()
    } catch (error) {
      console.error(error);
    }
    console.log(url)
    return forecast
}
