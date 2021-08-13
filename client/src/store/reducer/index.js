const initialState = {
  city:"",
  actualWeather: "",
  forecastWeather: "",
  news: ""
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CITY":
      return {
        ...state,
        city: action.payload,
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
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
