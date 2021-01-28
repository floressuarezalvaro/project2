let searchForm = document.querySelector("#search-form");

let searchResult = [];

function fetchSearchLocation(queryString) {
  if (!queryString || queryString.trim() === "") {
    return;
  }

  fetch(`/api/searchLoc?query=${queryString}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      searchResult = data;
      console.log(searchResult);
      $("#barList").empty();
      for (let i = 0; i < data.length; i++) {
        //create barCards here

        let col = $("<div>").addClass("col s12 m4 l4");
        let card = $("<div>").addClass("card grey lighten-5");
        let body = $("<div>").addClass("card-content grey-text");
        let btn = $("<a>").addClass(
          "btn-floating halfway-fab waves-effect waves-light red"
        );
        let name = $("<p>").addClass("#bar-name").text(data[i].name);
        let city = $("<p>")
          .addClass("#city-name")
          .text("City: " + data[i].city);
        let state = $("<p>")
          .addClass("#state")
          .text("State: " + data[i].state);
        let action = $("<div>").addClass("card-action");
        let modal = $("<a>")
          .addClass(
            "waves-effect waves-light btn modal-trigger amber-text grey darken-3"
          )
          .attr("data-id", i)
          .attr("href", "#modal1")
          .text("More Details");

        // merge together and put on page

        col.append(
          card.append(body.append(btn, name, city, state, action, modal))
        );
        $("#barList").append(col);
      }
    });
}
// let modal1 = $("div.modal")

function modalInfo(index) {
  $("#bar-name").text(`Bar Name: ${searchResult[index].name}`);
  $("#address").text(`Address: ${searchResult[index].street}`);
  $("#city-name").text(`City: ${searchResult[index].city}`);
  $("#state").text(`State: ${searchResult[index].state}`);
  $("#review-link").text(`Review Link: ${searchResult[index].reviewlink}`);
  $("#phone").text(`Phone Number: ${searchResult[index].phone}`);
  $("#website").text(`Website: ${searchResult[index].url}`);
}

$(document).ready(function () {
  $("#modal1").modal();

  $(document).on("click", ".modal-trigger", function (e) {
    // $("#modal1").modal();
    let index = e.currentTarget.getAttribute("data-id");
    modalInfo(index);
  });
});

//  let modalContent = $("<div>").addClass(".modal-content");
//  let h4 = $("<h4>").text("Popular Brewery Info");
//  let p1 = $("<p>")
//    .addClass("#bar-name")
//    .text("Name: ");// + data[i].name);
//  let p2 = $("<p>")
//    .addClass("#address")
//    .text("Address: "); // + data[i].street);
//  let p3 = $("<p>")
//    .addClass("#city-name")
//    .text("City: ");// + data[i].city);
//  let p4 = $("<p>")
//    .addClass("#state")
//    .text("State: "); // + data[i].state);
//  let p5 = $("<p>")
//    .addClass("#review-link")
//    .text("Reviews: "); // + data[i].reviewlink);
//  let p6 = $("<p>")
//    .addClass("#phone")
//    .text("Phone Number: "); // + data[i].phone);
//  let p7 = $("<p>")
//    .addClass("#website")
//    .text("Website: "); // + data[i].url);

//    modal1.append(modalContent, h4, p1, p2, p3, p4, p5, p6, p7);

function handleSearchFormSubmit(e) {
  e.preventDefault();
  let input = document.querySelector("#search").value;

  console.log(input);

  fetchSearchLocation(input);
}

searchForm.addEventListener("submit", handleSearchFormSubmit);

$(".dropdown-trigger").dropdown();

// Card Modal Trigger for "More Details" on Explore Page

// $(document).ready(function () {
//   $(".modal").modal();
// });
