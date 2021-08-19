import React, { useState, useEffect } from "react";
import "./City.css";
import { useSelector, useDispatch } from "react-redux";
import { getNews } from "../../store/actions/index";

import Weather from "./Weather/Weather";
import News from "./News/News";

export default function MainContainer() {

  return (
    <div className="MainContainer">
      <div className="MainContainerCard">
        <Weather />
      </div>
      <div className="MainContainerNews">
        <News />
      </div>
    </div>
  );
}
