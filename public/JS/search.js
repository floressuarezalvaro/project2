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
    .then((data) => console.log(data));
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

module.exports = searchFunction;
