import axios from "axios";

export async function getIpClient() {
  try {
    fetch("https://api.ipify.org?format=json")
      .then((r) => r.json())
      .then((rta) =>
        fetch(
          `http://api.ipstack.com/${rta.ip}?access_key=83eaf8267153cd013b61a3963450306a&format=1`
        )
      )
      .then((r) => r.json())
      .then((r, dispatch) => {
        dispatch({
          type: "SET_CITY",
          payload: r.city,
        });
      })
  } catch (error) {
    console.error(error);
  }
}

export async function onLoad(ciudad) {
  //Llamado a la API del clima
  const search = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=299dc9f40d589d6bcc32f61eb4e30885`;
  fetch(search)
    .then((r) => r.json())
    .then((recurso,dispatch) => {
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
          type: "SET_CLIENT_CITY",
          payload: ciudad,
        });
      } else {
        alert("Ciudad no encontrada");
      }
    });
}

export const getNews = (city) => {
  let search = "";
  if (city) {
    search = city.replace(/ /g, "+").toLowerCase();
  }
  axios
    .get(`http://localhost:3001/?city=${search}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((response, dispatch) => {
      dispatch({
        type: "GET_NEWS",
        payload: response.data,
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

export async function onSearch(ciudad) {
  //Llamado a la API del clima
  const search = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=299dc9f40d589d6bcc32f61eb4e30885`;
  fetch(search)
    .then((r) => r.json())
    .then((recurso, dispatch) => {
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
          type: "SET_CITY",
          payload: ciudad,
        });
      } else {
        alert("Ciudad no encontrada");
      }
    });
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
