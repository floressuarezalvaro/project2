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
    .then((data) => console.log(data));
}

// fetchSearchLocation("ellis");

$("form").on("submit", function (e) {
  // read values from user input
  e.preventDefault();
  let input = JSON.stringify(document.getElementById("#search"));

  console.log(input);

  fetchSearchLocation(input);
});

// Card Modal Trigger for "More Details" on Explore Page

$(document).ready(function () {
  $(".modal").modal();
});
