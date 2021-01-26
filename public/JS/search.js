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
    .then((data) => { console.log(data)
      $("#barCard").empty()
      for(let i = 0; i < data.length; i++) {
        //create barCards here
            
            let row = $("<div>").addClass("row")
            let col = $("<div>").addClass("col s12 m4 l4");
            let card = $("<div>").addClass("card");
            let body = $("<div>").addClass("card-content");
            let btn = $("<a>").addClass("btn-floating halfway-fab waves-effect waves-light red")
            let name = $("<p>").addClass("#bar-name").text(data[i].name);
            let city = $("<p>").addClass("#city-name").text("City Name: " + data[i].city);
            let state = $("<p>").addClass("#state").text("State: " + data[i].state);
            // merge together and put on page
            row.append(col.append(card.append(body.append (btn, name, city, state))));
            $("#barCard").append(row)
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

$(document).ready(function () {
  $(".modal").modal();
});


