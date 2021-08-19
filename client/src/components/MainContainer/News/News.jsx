import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./News.css";

export default function News() {
  const news = useSelector((store) => store.news);

  let notice1 = [];
  let notice2 = [];
  if (news) {
    notice1 = news?.map((noticia) => noticia?.link?.split("/url?q="));
      notice2 = notice1?.map((noticia) => noticia && noticia[1]?.split("&sa")[0]);
  }

  return (
    <div className="MainContainerNews">
      <p>News</p>
      {notice2 &&
        notice2.map((noticia,i) => i%2===0?
         (
          <a href={noticia} target="_blank" rel="noreferrer">
            {noticia}
          </a>
        ):<></>)}
    </div>
  );
}
