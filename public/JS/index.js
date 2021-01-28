let searchForm = document.querySelector("#search-form");

let searchResult = [];

function fetchAllBars(event) {
  fetch(`/api/bars`, {
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
        let card = $("<div>").addClass("card");
        let body = $("<div>").addClass("card-content");
        let name = $("<h4>").addClass("#bar-name").text(data[i].barName);
        let id = $("<p>")
          .addClass("#barId")
          .text("Bar ID: " + data[i].id);
        let city = $("<p>")
          .addClass("#city-name")
          .text("City: " + data[i].barCity);
        let state = $("<p>")
          .addClass("#state")
          .text("State: " + data[i].barState);
        let action = $("<div>").addClass("card-action");
        let modal = $("<a>")
          .addClass("waves-effect waves-light btn modal-trigger")
          .attr("data-id", i)
          .attr("href", "#modal1")
          .text("More Details");

        // merge together and put on page

        col.append(
          card.append(body.append(name, id, city, state, action, modal))
        );
        $("#barList").append(col);
      }
    });
}

function modalInfo(index) {
  $("#bar-name").text(`Bar Name: ${searchResult[index].barName}`);
  $("#barId").text(`Id: ${searchResult[index].id}`);
  $("#address").text(`Address: ${searchResult[index].barAddress}`);
  $("#city-name").text(`City: ${searchResult[index].barCity}`);
  $("#state").text(`State: ${searchResult[index].barState}`);
  $("#review-link").text(`Review Link: ${searchResult[index].barReviewLink}`);
  $("#phone").text(`Phone Number: ${searchResult[index].barPhone}`);
  $("#website").text(`Website: ${searchResult[index].barWebsite}`);
}

$(document).ready(function () {
  $("#modal1").modal();

  $(document).on("click", ".modal-trigger", function (e) {
    let index = e.currentTarget.getAttribute("data-id");
    modalInfo(index);
  });
});

fetchAllBars();
