const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    address +
    "&units=metric&appid=30cce5c549c5ecc9d89993f2aee6a2a7";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.cod == 404) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: body.coord.lat,
        longitude: body.coord.lon,
        location: body.name,
      });
    }
  });
};

module.exports = geocode;
