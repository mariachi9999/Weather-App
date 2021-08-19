const initialState = {
  city:"",
  lat: "",
  lon: "",
  actualWeather: "",
  forecastWeather: "",
  news: ""
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CITY":
      return {
        ...state,
        city: action.payload.city,
        lat: action.payload.latitude.toFixed(2),
        lon: action.payload.longitude.toFixed(2)
      };
    case "SET_SEARCH_CITY":
      console.log(action.payload)
      return {
        ...state,
        city: action.payload.name,
        lat: action.payload.latitude.toFixed(2),
        lon: action.payload.longitude.toFixed(2)
      };
    case "SET_ACTUAL_WEATHER":
      return {
        ...state,
        actualWeather: action.payload,
      };
    case "SET_NEWS":
      return {
        ...state,
        news: action.payload,
      };
    case "SET_FORECAST":
      console.log(action.payload)
      if(!action.payload.cod){
        let actual = {
          min: Math.round(action.payload.daily[0].temp.min),
          max: Math.round(action.payload.daily[0].temp.max),
          img: action.payload.daily[0].weather[0].icon,
          id: action.payload.daily[0].weather[0].id,
          sunrise: action.payload.daily[0].sunrise,
          sunset: action.payload.daily[0].sunset,
          moonfase: action.payload.daily[0].moon_phase,
          actualTime: action.payload.current.dt,
          temp: action.payload.current.temp,
          wind_speed: action.payload.current.wind_speed,
          wind_direction: action.payload.current.wind_deg,
          pression: action.payload.current.pressure,
          humidity: action.payload.current.humidity,
          visibility: action.payload.current.visibility,
        };
        let pronostico = []
        action.payload.daily.forEach(day=>{
          let foreDay = {
            min: Math.round(day.temp.min),
            max: Math.round(day.temp.max),
            img: day.weather[0].icon,
            id: day.weather[0].id,
            sunrise: day.sunrise,
            sunset: day.sunset,
            moonfase: day.moon_phase
          }
          pronostico.push(foreDay)
        })
        return {
          ...state,
          actualWeather: actual,
          forecastWeather: pronostico,
        };
      } else {
        return {
          ...state
        }
      }
      
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
