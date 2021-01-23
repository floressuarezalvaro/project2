let searchLocation = "";
let lat = 0;
let lng = 0;
let toggle = 0;

$("#main").toggle();


let toggleOnce = function () {
  if (toggle === 0) {
    $("#instructions").toggle();
    $("#main").toggle();
    toggle++;
  }
};

$("form").on("submit", function (e) {
  e.preventDefault();

  let input = $("#search-bar").val();
  searchLocation = input;
  toggleOnce();
  bannerFetch();
});


let bannerFetch = function () {
    .then((response) => {
      if (response.status === 404) {
        let err404 = $("<h1>");
        let link = $("<a>");
        link.text("Click here to go back");
        err404.text("404: Bar not in database.");
        err404.attr("style", "color: white;");
        $("#main").empty();
        $("#main").append(err404);
        $("#main").append(link);
      }
      return response.json();
    })
    .then((data) => {
      $("#city-name").empty();
      iconGen();
      $("#bar-name").text("Name: " + data[0].name);
      $("#address").text("Address: " + data[0].address);
      $("#city-name").prepend(data[0].city);
      $("#state").text("State: " + data[0].state);
      $("#review-link").text("Review Link: " + data[0].reviewlink);
      $("#phone").text("Phone Number: " + data[0].phone);
      $("#website").attr("src", data[0].url);


    //   lat = data[0].latlng[0];
    //   lng = data[0].latlng[1];

      barFetch();
//       $("#map").empty();
//       mapGen();
    });
};


let barCards = function (barData) {
  $("#bar-cards").empty();
  for (let i = 0; i < barData.list.length; i += 8) {
    cardBuilder(barData.list[i]);
  }
};


let cardBuilder = function (data) {
  let cardCol = $("<div>");
  let card = $("<div>");
  let content = $("<div>");
  let cardTitle = $("<span>");


  cardCol.attr("class", "col s3");
  cardCol.attr("style", "width: 12rem;");
  card.attr("class", "card blue-grey darken-1");
  content.attr("class", "card-content white-text");
  cardTitle.attr("class", "card-title");


  content.append(cardTitle);
  card.append(content);
  cardCol.append(card);
  $("#bar-cards").append(cardCol);
}
