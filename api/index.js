const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 3001;
app.use(cors());

async function init(url) {
  
  console.log(url)

  let enlaces = []
  try {
    let enlaces = [];
    let urlResponse = await axios.get(url);
    const $ = cheerio.load(urlResponse.data);

    $("div.kCrYT").each((i, e) => {
      const link = $(e)
      .find("a")
      .attr("href")
      const title = $(e)
      .text()
      enlaces.push({link: link, title: title})
    });

    // $("div.JheGif").each((i, e) => {
    //   const title = $(e)
    //   enlaces[i].title = title
    // });

    return enlaces

  } catch (e) {
    console.log(e);
  }
}

async function scrapper(city) {
  let search = city.replace(/ /g, "+");
  let url = `https://www.google.com/search?q=noticias+${search}+hoy&source=lnms&tbm=nws`;
  return await init(url);
}

app.get("/news/", async (req, res) => {
  let city = req.query.city;
  try {
    const news = await scrapper(city);
    // .then((response) => {
    //   console.log(response);
    //   JSON.stringify(response);
    // })
    res.status(200).json(news);
  } catch (error) {
    res.send(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
