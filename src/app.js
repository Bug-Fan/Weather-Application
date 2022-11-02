const express = require("express");
const app = require("express")();
const path = require("path");
const hbs = require("hbs");
const geocode = require("./geocode");
const forecast = require("./forecast");

const staticPath = express.static(path.join(__dirname, "../public"));
const viewPath = path.join(__dirname, "../templates/views/");
const partialsPath = path.join(__dirname, "../templates/partials");
const port = process.env.PORT || 5922;

app.use(staticPath);
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Home",
    name: "Parth",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Parth",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Parth",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Parth",
    errorName: "Page not Found!",
  });
});

app.listen((port), () => {
  console.log(`Server up and running on port number: ${port}.`);
});
