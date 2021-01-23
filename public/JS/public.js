let searchLocation = "";
let lat = 0;
let lng = 0;
let toggle = 0;

$("#main").toggle();

/**
 * toggleOnce is a helper function that ensures the page loads correctly on refresh.
 */
let toggleOnce = function () {
  if (toggle === 0) {
    $("#instructions").toggle();
    $("#main").toggle();
    toggle++;
  }
};
/**
 * This is an event listener that picks up user query and calls fetch functions
 */
$("form").on("submit", function (e) {
  e.preventDefault();

  let input = $("#search-bar").val();
  searchLocation = input;
  toggleOnce();
  bannerFetch();
});

/**
 * bannerFetch is a function that requests broad country data about the user query and fills in the relevent elements in the index file.
 * Handles a 404 response with a message and a link back to the app.
 */
let bannerFetch = function () {
  let url = `http://beermapping.com/webservice/loccity/87f85a8575cbea176e660fb72ddfcc3c/${searchLocation}&s=json`;
  fetch(url)
    .then((response) => {
      if (response.status === 404) {
        let err404 = $("<h1>");
        let link = $("<a>");
        link.attr("href", "https://jtwob.github.io/Travel_Almanac/");
        link.text("Click here to go back");
        err404.text("404: Country not in database.");
        err404.attr("style", "color: white;");
        $("#main").empty();
        $("#main").append(err404);
        $("#main").append(link);
      }
      return response.json();
    })
    .then((data) => {
      let timezonesStr = "Timezone(s): ";
      $("#country-name").empty();
      iconGen();
      $("#country-name").prepend(data[0].name);
      $("#capital").text("Capital: " + data[0].capital);
      $("#callCode").text("Calling Code: " + data[0].callingCodes[0]);
      $("#currency").text("Currency: " + data[0].currencies[0].name);
      $("#lang").text("Language: " + data[0].languages[0].name);
      $("#pop").text("Population: " + data[0].population);
      $("#nat-flag").attr("src", data[0].flag);
      $("#nat-flag").attr("style", "width: 300px;");
      $("#capital-city").text(data[0].capital);

      for (let i = 0; i < data[0].timezones.length; i++) {
        timezonesStr += data[0].timezones[i];
        if (i + 1 !== data[0].timezones.length) {
          timezonesStr += ", ";
        }
      }

      $("#timeZone").text(timezonesStr);

      lat = data[0].latlng[0];
      lng = data[0].latlng[1];

      capital = data[0].capital
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      weatherFetch();
      $("#map").empty();
      mapGen();
    });
};

/**
 * weatherFetch fetches the weather for the capital city of the query country and calls weatherCards, a helper function to create the forecast cards.
 */
let weatherFetch = function () {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${capital}&units=imperial&appid=b8cf73639b0d81c1905ba1ac1cb6f289`
  )
    .then((response) => response.json())
    .then((data) => {
      weatherCards(data);
    });
};

/**
 * weatherCards is a simple for loop that iterates over the weather data and builds a card using the cardBuilder function and the data for the relevent day.
 * @param {Object} weatherData is the data returned from the openweathermap api fetch request
 */
let weatherCards = function (weatherData) {
  $("#weather-cards").empty();
  for (let i = 0; i < weatherData.list.length; i += 8) {
    cardBuilder(weatherData.list[i]);
  }
};

/**
 * cardBuilder is a helper function that does the heavy lifting for weatherCards. Using jquery to create and fill card elements, and appending them to the index.
 * @param {Object} data individual day datapoints from openweathermap api fetch request
 */
let cardBuilder = function (data) {
  let cardCol = $("<div>");
  let card = $("<div>");
  let content = $("<div>");
  let cardTitle = $("<span>");
  let icon = $("<img>");
  let temp = $("<p>");
  let humidity = $("<p>");

  cardCol.attr("class", "col s3");
  cardCol.attr("style", "width: 12rem;");
  card.attr("class", "card blue-grey darken-1");
  content.attr("class", "card-content white-text");
  cardTitle.attr("class", "card-title");
  cardTitle.text(moment(data.dt_txt).format("L"));
  icon.attr(
    "src",
    "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
  );
  temp.text("Temp: " + data.main.temp + " °F");
  humidity.text("Humidity: " + data.main.humidity + "%");

  content.append(cardTitle);
  content.append(icon);
  content.append(temp);
  content.append(humidity);
  card.append(content);
  cardCol.append(card);
  $("#weather-cards").append(cardCol);
};
