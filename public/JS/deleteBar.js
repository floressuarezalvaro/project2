document.addEventListener("DOMContentLoaded", (e) => {
  console.log("DOM has been loaded");

  const barIdInput = document.getElementById("barId-input");
  const barForm = document.getElementById("addBarForm");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!barIdInput.value) {
      alert("Your post is missing some content");
    }

    const deleteBar = barIdInput.value;
    // console.log("handleFormSubmit -> deleteBar", deleteBar);
    // submitBar(deleteBar);
    // console.log(deleteBar);
    console.log("handlePostDelete -> currentPost", deleteBar);
    deletePost(deleteBar);
  };

  barForm.addEventListener("submit", handleFormSubmit);

  const deletePost = (id) => {
    console.log(`here is the ${id}`);
    fetch(`/api/bars/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success in deleting bar:", data);
        window.location.href = "/index";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
});
