function fetchSearchLocation(queryString) {
    if(!queryString || queryString.trim() === ""){return};
    
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

.on("submit", function(e){
  // read values from user input
  let input = document.getElementById("#userInput")
  fetchSearchLocation(input);
})

