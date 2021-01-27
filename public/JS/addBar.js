document.addEventListener("DOMContentLoaded", (e) => {
  console.log("DOM has been loaded");

  const barNameInput = document.getElementById("barName-input");
  const barRatingInput = document.getElementById("barRating-input");
  const barAddressInput = document.getElementById("barAddress-input");
  const barCityInput = document.getElementById("barCity-input");
  const barStateInput = document.getElementById("barState-input");
  const barReviewLinkInput = document.getElementById("barReviewLink-input");
  const barPhoneInput = document.getElementById("barPhone-input");
  const barWebsiteInput = document.getElementById("barWebsite-input");
  const barForm = document.getElementById("addBarForm");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("You hit submit");
  };

  barForm.addEventListener("submit", handleFormSubmit);
});
