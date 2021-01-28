document.addEventListener("DOMContentLoaded", (e) => {
  console.log("DOM has been loaded");

  const barIdInput = document.getElementById("barId-input");
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
    if (
      !barIdInput.value ||
      !barNameInput.value ||
      !barRatingInput.value ||
      !barAddressInput.value ||
      !barCityInput.value ||
      !barStateInput.value ||
      !barAddressInput.value
    ) {
      alert("Your post is missing some content");
    }

    const updateBar = {
      id: barIdInput.value.trim(),
      barName: barNameInput.value.trim(),
      barRating: barRatingInput.value.trim(),
      barAddress: barAddressInput.value.trim(),
      barCity: barCityInput.value.trim(),
      barState: barStateInput.value.trim(),
      barReviewLink: barReviewLinkInput.value.trim(),
      barPhone: barPhoneInput.value.trim(),
      barWebsite: barWebsiteInput.value.trim(),
    };
    console.log("handleFormSubmit -> updateBar", updateBar);
    submitBar(updateBar);
  };

  barForm.addEventListener("submit", handleFormSubmit);

  const submitBar = (update) => {
    fetch("/api/bars/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(update),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success in updating bar:", data);
        window.location.href = "/index";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
});
