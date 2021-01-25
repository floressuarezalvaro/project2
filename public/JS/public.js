let searchFunction = require("searchFunction");

let barCards = function (data) {
  fetchSearchLocation().then((data) => {
    $("#bar-name").text("Brewery Name: " + data[0].name);
    $("#city-name").text("City Name: " + data[0].city);
    $("#state").text("State: " + data[0].state);
  });
};
