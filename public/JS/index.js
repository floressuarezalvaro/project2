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
        let btn = $("<a>")
          .addClass(
            "btn-floating halfway-fab waves-effect waves-light red delete-btn"
          )
          .attr("button-id", i);
        let name = $("<p>").addClass("#bar-name").text(data[i].barName);
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
          card.append(body.append(btn, name, city, state, action, modal))
        );
        $("#barList").append(col);
      }
    });
}
// let modal1 = $("div.modal")

function modalInfo(index) {
  $("#barId").text(`Id: ${searchResult[index].id}`);
  $("#bar-name").text(`Bar Name: ${searchResult[index].barName}`);
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

// $(document).on("click", ".delete-btn", function (e) {
//   let index = e.currentTarget.getAttribute("id");
//   let barId = $(e.id);
//   console.log(barId);
//   // deletePost(barId);
// });

// function handleSearchFormSubmit(e) {
//   e.preventDefault();
//   let input = document.querySelector("#allBars");
//   fetchAllBars(input);
// }

searchForm.addEventListener("click", fetchAllBars());

// const deletePost = (e) => {
// const { id } =
//   fetch(`/api/bars/${id}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//   }).then((response) => response.json("deleted"));
// };
