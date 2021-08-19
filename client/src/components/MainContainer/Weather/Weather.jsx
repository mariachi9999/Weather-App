import React from "react";
import { useSelector } from "react-redux";
import { getCardinalDirection } from "../../../utils/getCardinalDirection";
import { getSpeedKm } from "../../../utils/getSpeedKm";
import "./Weather.css";

export default function Weather() {
  const { temp, wind_speed, wind_direction, sunrise, sunset, max, min, img } =
    useSelector((store) => store.actualWeather);

  const name = useSelector((store) => store.city);

  let amanecer = new Date(sunrise * 1000);
  let atardecer = new Date(sunset * 1000);

  const dir = getCardinalDirection(wind_direction);
  const speed = getSpeedKm(wind_speed);

  return (
    <div className="mainCard-body">
      <div className="mainCard-head">
        <h2 className="mainCard-title">{name}</h2>
      </div>
      <div className="mainCard-row2">
        <div className="mainCard-actual">
          <div>
            <h3>Actual</h3>
            <h4>{Math.round(temp)}°</h4>
          </div>
          <div>
            <h3>Wind</h3>
            <h4>
              {speed}km {dir}
            </h4>
          </div>
            <h5>Min</h5>
            <h5>{min}°</h5>
            <h5>Max</h5>
            <h5>{max}°</h5>
        </div>
        <div className="iconoClima">
          <img
            src={"http://openweathermap.org/img/wn/" + img + "@2x.png"}
            // width="80"
            // height="80"
            alt=""
          />
        </div>
      </div>
      <div className="mainCard-row3">
        <p>pronostico</p>        
      </div>
    </div>
  );
}
