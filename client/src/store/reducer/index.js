const initialState = {
  city:"",
  clientCity: "",
  searchedCity: "",
  weather: "",
  news: ""
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_NEWS":
      return {
        ...state,
        news: action.payload,
      };
    case "SET_CITY":
      return {
        ...state,
        city: action.payload,
      };
    case "SET_CLIENT_CITY":
      return {
        ...state,
        clientCity: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
