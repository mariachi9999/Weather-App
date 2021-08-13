import React from "react";
import "./Card.css";
import "./MainCard.css";

export default function MainCard() {
  const {
    act,
    wind_speed,
    wind_direction,
    sunrise,
    sunset,
    max,
    min,
    name,
    img,
    onClose,
  } = "rigged";

  function getCardinalDirection(angle) {
    const directions = [
      "↑ N",
      "↗ NE",
      "→ E",
      "↘ SE",
      "↓ S",
      "↙ SW",
      "← W",
      "↖ NW",
    ];
    return directions[Math.round(angle / 45) % 8];
  }

  function getSpeedKm(wind_speed) {
    return Math.round(wind_speed * 3.6, 0);
  }

  const dir = getCardinalDirection(wind_direction);
  const speed = getSpeedKm(wind_speed);

  return (
     
      <div className="mainCard-body">
        <div className="mainCard-head">
            <h2 className="mainCard-title">{name}</h2>
            <img
              className="iconoClima"
              src={"http://openweathermap.org/img/wn/" + img + "@2x.png"}
              width="80"
              height="80"
              alt=""
            />
        </div>  
        <div className="mainCard-actual">
          <div>
            <h3>Actual</h3>
            <h4>{act}°</h4>
          </div>
          <div>
            <h3>Wind</h3>
            <h4>{speed}km {dir}</h4>
          </div>
        </div>
        <div className="mainCard-proyectado">
          <div className="col-sm-4 col-md-4 col-lg-4">
            <h5>Min</h5>
            <h5>{min}°</h5>
          </div>
          <div className="col-sm-4 col-md-4 col-lg-4">
            <h5>Max</h5>
            <h5>{max}°</h5>
          </div>
          
        </div>
      </div>
  );
}
