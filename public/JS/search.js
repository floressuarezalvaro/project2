let searchForm = document.querySelector("#search-form");

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
      console.log(data);
      $("#barCard").empty();
      for (let i = 0; i < data.length; i++) {
        //create barCards here
        // let row = $("<div>").addClass("row");
        let col = $("<div>").addClass("col s12 m4 l4");
        let card = $("<div>").addClass("card");
        let body = $("<div>").addClass("card-content");
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
          .addClass("waves-effect waves-light btn modal-trigger")
          .attr("href", "#modal1")
          .text("More Details");
        let modal1 = $("<div>").addClass(".modal").attr("id", "modal1");
        $(document).ready(function () {
          $(".modal").modal();
        });

        let modalContent = $("<div>").addClass(".modal-content")
        let h4 = $("<h4>").text("Popular Brewery Info");
        let p1 = $("<p>").addClass("#bar-name").text("Name: " + data[i].name);
        let p2 = $("<p>").addClass("#address").text("Address: " + data[i].street);
        let p3 = $("<p>").addClass("#city-name").text("City: " + data[i].city);
        let p4 = $("<p>").addClass("#state").text("State: " + data[i].state);
        let p5 = $("<p>").addClass("#review-link").text("Reviews: " + data[i].reviewlink);
        let p6 = $("<p>").addClass("#phone").text("Phone Number: " + data[i].phone);
        let p7 = $("<p>").addClass("#website").text("Website: " + data[i].url);

        // merge together and put on page
        
          col.append(
            card.append(body.append(btn, name, city, state, action, modal, modal1.append(modalContent, h4, p1, p2, p3, p4, p5, p6, p7))
          )
        );
        $("#barCard").append(col);

        
      }
    });
}

function handleSearchFormSubmit(e) {
  e.preventDefault();
  let input = document.querySelector("#search").value;

  console.log(input);

  fetchSearchLocation(input);
}

searchForm.addEventListener("submit", handleSearchFormSubmit);

// Card Modal Trigger for "More Details" on Explore Page

// $(document).ready(function () {
//   $(".modal").modal();
// });


